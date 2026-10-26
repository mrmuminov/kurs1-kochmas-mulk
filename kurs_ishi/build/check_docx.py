# Hisobot talablarini tekshiradi: python3 check_docx.py kurs_ishi.docx kurs_ishi.pdf
# (PDF .docx dan LibreOffice bilan olinadi; faqat ilovalar ulushini hisoblash uchun kerak.)

import re
import subprocess
import sys
import zipfile

docx_path, pdf_path = sys.argv[1], sys.argv[2]
archive = zipfile.ZipFile(docx_path)
document = archive.read("word/document.xml").decode("utf-8")
failures = []


def check(condition, message):
    print(("OK   " if condition else "XATO ") + message)
    if not condition:
        failures.append(message)


def paragraph_text(paragraph):
    return "".join(re.findall(r"<w:t[^>]*>([^<]*)</w:t>", paragraph))


paragraphs = re.findall(r"<w:p[ >].*?</w:p>", document, re.S)
body = document.split("<w:tbl>")  # jadvallar tashqarisidagi xatboshilar alohida tekshiriladi
body_paragraphs = [p for p in re.findall(r"<w:p[ >].*?</w:p>", re.sub(r"<w:tbl>.*?</w:tbl>", "", document, flags=re.S), re.S)]

# Sahifa o'lchami va hoshiyalar (DXA): A4, chap 30 mm, yuqori/past 20 mm, o'ng 15 mm
page_size = re.search(r'<w:pgSz w:w="(\d+)" w:h="(\d+)"', document)
margins = re.search(r"<w:pgMar ([^>]*)/>", document).group(1)
margin = dict(re.findall(r'w:(\w+)="(\d+)"', margins))
check(page_size.groups() == ("11906", "16838"), "A4 (210x297 mm)")
check((margin["left"], margin["top"], margin["bottom"], margin["right"]) == ("1701", "1134", "1134", "851"),
      "hoshiyalar: chap 30, yuqori 20, past 20, o'ng 15 mm")

# Shrift va o'lcham
styles = archive.read("word/styles.xml").decode("utf-8")
check('w:ascii="Times New Roman"' in styles and '<w:sz w:val="28"/>' in styles, "asosiy shrift Times New Roman 14")
fonts = set(re.findall(r'w:ascii="([^"]+)"', document))
check(fonts <= {"Times New Roman", "Courier New"}, f"hujjatda faqat Times New Roman (va ilovalarda Courier New): {sorted(fonts)}")

# Asosiy matn: interval 1,5 (360), xatboshi 1,25 sm (709), tekislash "both"
justified = [p for p in body_paragraphs if '<w:jc w:val="both"/>' in p and 'w:hanging' not in p]  # adabiyot bandlari alohida
good = [p for p in justified if 'w:line="360"' in p and 'w:firstLine="709"' in p]
check(len(justified) > 50 and len(good) == len(justified), f"asosiy matn: interval 1,5 va xatboshi 1,25 sm ({len(good)}/{len(justified)})")

# Sahifa raqami pastda o'rtada
footer = archive.read("word/footer1.xml").decode("utf-8")
check("PAGE" in footer and '<w:jc w:val="center"/>' in footer, "sahifa raqami pastda, o'rtada")

# Sarlavhalar va tuzilma
headings1 = [paragraph_text(p) for p in paragraphs if 'w:val="Heading1"' in p]
expected = ["KIRISH", "I BOB. NAZARIY QISM", "II BOB. LOYIHA QISM",
            "III BOB. TADBIQ QILISHNI TASHKIL ETISH VA LOYIHA SAMARADORLIGI", "XULOSA",
            "FOYDALANILGAN ADABIYOTLAR RO‘YXATI", "ILOVALAR"]
check(headings1 == expected, f"bo'limlar tartibi: {headings1}")
check(all('<w:pageBreakBefore/>' in p for p in paragraphs if 'w:val="Heading1"' in p), "har bir bo'lim yangi sahifadan boshlanadi")
headings2 = [paragraph_text(p) for p in paragraphs if 'w:val="Heading2"' in p]
chapter_paragraphs = [h for h in headings2 if re.match(r"\d\.\d\. ", h)]
check(len(chapter_paragraphs) == 9 and all(sum(h.startswith(f"{c}.") for h in chapter_paragraphs) == 3 for c in "123"),
      "uchta bobda 3 tadan paragraf (1.1–3.3)")

# Kirish: 8 band
intro_leads = ["Mavzuning dolzarbligi.", "Muammoning o‘rganilganlik darajasi.", "Loyihaning maqsadi:", "Loyihaning vazifalari:",
               "Loyiha obyekti:", "Loyiha predmeti:", "Loyihaning amaliy ahamiyati.", "Kurs loyihasining tuzilishi va hajmi."]
texts = [paragraph_text(p) for p in paragraphs]
check(all(any(t.startswith(lead) for t in texts) for lead in intro_leads), "kirishda 8 band mavjud")

# Adabiyotlar: 15–20 ta, kamida 5 tasi 2021 va undan keyingi
start = texts.index("FOYDALANILGAN ADABIYOTLAR RO‘YXATI")
end = texts.index("ILOVALAR")
sources = [t for t in texts[start + 1:end] if re.match(r"\d+\. ", t)]
recent = [s for s in sources if re.search(r"\b202[1-9]\b", re.sub(r"\(murojaat[^)]*\)", "", s))]  # murojaat sanasi hisobga olinmaydi
check(15 <= len(sources) <= 20, f"manbalar soni: {len(sources)}")
check(len(recent) >= 5, f"so'nggi 5 yilda nashr etilgan manbalar: {len(recent)}")

# Matn ichidagi [n] havolalari ro'yxatdagi manbalar sonidan oshmasligi va har bir manbaga havola bo'lishi
main_text = " ".join(texts[:start])
cited = {int(n) for group in re.findall(r"\[([\d, \[\]]+)\]", main_text) for n in re.findall(r"\d+", group)}
check(cited <= set(range(1, len(sources) + 1)), "havolalar ro'yxat doirasida")
check(cited == set(range(1, len(sources) + 1)), f"har bir manbaga matnda havola bor (havolasizlar: {sorted(set(range(1, len(sources) + 1)) - cited)})")

# 1-shaxs ("men", "mening") ishlatilmagan
check(not re.search(r"\b(men|mening|menga|bizning)\b", main_text, re.I), "1-shaxsdan foydalanilmagan")

# Ilovalar hajmi umumiy hajmning 1/3 qismidan oshmasligi
info = subprocess.run(["pdfinfo", pdf_path], capture_output=True, text=True).stdout
total = int(re.search(r"Pages:\s+(\d+)", info).group(1))
pages = subprocess.run(["pdftotext", "-layout", pdf_path, "-"], capture_output=True, text=True).stdout.split("\f")
appendix_start = next(i for i, p in enumerate(pages) if "ILOVALAR" in p and "ILOVA" in p and i > 5)
appendix_pages = total - appendix_start
check(appendix_pages * 3 <= total, f"ilovalar {appendix_pages} bet, jami {total} bet (1/3 dan oshmaydi)")

# Har bir ilovaga asosiy matnda havola bor
for number in range(1, 5):
    check(f"{number}-ilova" in main_text, f"{number}-ilovaga asosiy matnda havola bor")

print("\nXatolar:", len(failures))
sys.exit(1 if failures else 0)
