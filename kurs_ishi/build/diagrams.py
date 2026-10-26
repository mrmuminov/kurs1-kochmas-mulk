# ER, arxitektura va blok-sxemalar: SVG yaratadi va PNG'ga aylantiradi.
import html, sys
from playwright.sync_api import sync_playwright

from pathlib import Path
OUT = str(Path(__file__).resolve().parents[1] / "rasmlar")
FONT = 'font-family="Arial, Helvetica, sans-serif"'


def esc(text):
    return html.escape(text, quote=True)


def text(x, y, content, size=14, anchor="middle", weight="normal", style="normal"):
    return f'<text x="{x}" y="{y}" font-size="{size}" text-anchor="{anchor}" font-weight="{weight}" font-style="{style}">{esc(content)}</text>'


def rect(x, y, w, h, fill="#fff", stroke_width=1.5, rx=0):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{fill}" stroke="#000" stroke-width="{stroke_width}"/>'


def line(x1, y1, x2, y2, arrow=False, dash=False):
    extra = ' marker-end="url(#arrow)"' if arrow else ""
    extra += ' stroke-dasharray="6 4"' if dash else ""
    return f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="#000" stroke-width="1.4"{extra}/>'


def poly(points, arrow=True):
    pts = " ".join(f"{x},{y}" for x, y in points)
    extra = ' marker-end="url(#arrow)"' if arrow else ""
    return f'<polyline points="{pts}" fill="none" stroke="#000" stroke-width="1.4"{extra}/>'


def svg(width, height, body):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" width="{width}" {FONT}>'
            '<defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="9" markerHeight="9" orient="auto-start-reverse">'
            '<path d="M0 0 L10 5 L0 10 z" fill="#000"/></marker></defs>'
            f'<rect width="{width}" height="{height}" fill="#fff"/>{body}</svg>')


# ---------- ER-diagramma ----------

def table_box(x, y, title, rows, width=250):
    row_height = 26
    body = rect(x, y, width, 34 + row_height * len(rows))
    body += rect(x, y, width, 34, fill="#e6e6e6")
    body += text(x + width / 2, y + 23, title, 15, weight="bold")
    for index, (key, name, kind) in enumerate(rows):
        row_y = y + 34 + row_height * index
        body += line(x, row_y, x + width, row_y)
        body += text(x + 10, row_y + 18, key, 12, "start", "bold")
        body += text(x + 50, row_y + 18, name, 13, "start")
        body += text(x + width - 10, row_y + 18, kind, 12, "end", style="italic")
    return body


def er_diagram():
    body = ""
    body += table_box(30, 40, "properties (obyektlar)", [
        ("PK", "id", "INTEGER"), ("", "address", "TEXT"), ("", "type", "TEXT"), ("", "rooms", "INTEGER"),
        ("", "area", "REAL"), ("", "price", "REAL"), ("", "sold", "INTEGER")])
    body += table_box(325, 40, "deals (bitimlar)", [
        ("PK", "id", "INTEGER"), ("FK", "property_id", "INTEGER"), ("FK", "client_id", "INTEGER"),
        ("", "price", "REAL"), ("", "commission", "REAL"), ("", "deal_date", "TEXT")])
    body += table_box(620, 40, "clients (mijozlar)", [
        ("PK", "id", "INTEGER"), ("", "name", "TEXT"), ("", "phone", "TEXT"), ("", "role", "TEXT")])
    body += table_box(325, 340, "users (foydalanuvchilar)", [
        ("PK", "id", "INTEGER"), ("UK", "login", "TEXT"), ("", "password_hash", "TEXT"), ("", "role", "TEXT")])
    # Bog'lanishlar
    body += line(280, 113, 325, 113) + text(290, 104, "1", 14, weight="bold") + text(315, 104, "N", 14, weight="bold")
    body += line(575, 139, 620, 139) + text(585, 130, "N", 14, weight="bold") + text(610, 130, "1", 14, weight="bold")
    body += text(450, 520, "users jadvali boshqa jadvallar bilan bog‘lanmaydi: u faqat tizimga kirishni boshqaradi", 13, style="italic")
    body += text(450, 290, "PK - birlamchi kalit, FK - tashqi kalit, UK - noyob qiymat", 12, style="italic")
    return svg(900, 540, body)


# ---------- Arxitektura ----------

def architecture():
    body = ""
    body += rect(20, 150, 190, 140) + text(115, 180, "Brauzer", 16, weight="bold")
    body += text(115, 210, "HTML sahifalar", 13) + text(115, 232, "style.css", 13) + text(115, 254, "Formalar (POST)", 13)
    body += rect(300, 40, 340, 360)
    body += text(470, 68, "Flask ilovasi", 16, weight="bold")
    body += rect(320, 90, 300, 60, fill="#e6e6e6") + text(470, 115, "Kirish tekshiruvi", 14, weight="bold") + text(470, 135, "before_request, sessiya", 12)
    body += rect(320, 170, 300, 60, fill="#e6e6e6") + text(470, 195, "Marshrutlar va rollar", 14, weight="bold") + text(470, 215, "obyekt, mijoz, bitim, o‘chirish", 12)
    body += rect(320, 250, 300, 60, fill="#e6e6e6") + text(470, 275, "Biznes qoidalari", 14, weight="bold") + text(470, 295, "komissiya 2%, tekshiruvlar", 12)
    body += rect(320, 330, 300, 55, fill="#e6e6e6") + text(470, 354, "Jinja2 shabloni (PAGE)", 14, weight="bold") + text(470, 373, "avtomatik ekranlash", 12)
    body += rect(730, 150, 170, 140) + text(815, 180, "SQLite", 16, weight="bold")
    body += text(815, 210, "database.sqlite", 13) + text(815, 232, "4 ta jadval", 13) + text(815, 254, "sqlite3 moduli", 13)
    body += line(210, 205, 300, 205, arrow=True) + line(300, 235, 210, 235, arrow=True)
    body += text(255, 195, "HTTP so‘rov", 11) + text(255, 258, "HTML javob", 11)
    body += line(640, 205, 730, 205, arrow=True) + line(730, 235, 640, 235, arrow=True)
    body += text(685, 195, "SQL", 11) + text(685, 258, "natija", 11)
    body += rect(20, 430, 880, 40, fill="#f5f5f5") + text(460, 456, "Docker tasviri (python:3.12-slim): ilova va baza fayli /data hajmida saqlanadi", 13)
    return svg(920, 490, body)


# ---------- Blok-sxemalar ----------

def terminal(cx, cy, label, w=170, h=40):
    return rect(cx - w / 2, cy - h / 2, w, h, rx=20) + text(cx, cy + 5, label, 13)


def process(cx, cy, label, w=300, h=46, extra=None):
    out = rect(cx - w / 2, cy - h / 2, w, h) + text(cx, cy + 5 if extra is None else cy - 2, label, 13)
    if extra:
        out += text(cx, cy + 14, extra, 12)
    return out


def decision(cx, cy, label_lines, w=320, h=100):
    pts = f"{cx},{cy - h / 2} {cx + w / 2},{cy} {cx},{cy + h / 2} {cx - w / 2},{cy}"
    out = f'<polygon points="{pts}" fill="#fff" stroke="#000" stroke-width="1.5"/>'
    start = cy - 6 * (len(label_lines) - 1) + 4
    for index, content in enumerate(label_lines):
        out += text(cx, start + index * 15, content, 12)
    return out


def deal_flow():
    cx = 330
    body = terminal(cx, 30, "Boshlanish")
    body += line(cx, 50, cx, 70, arrow=True)
    body += process(cx, 93, "Forma ma’lumotlarini olish", extra=None)
    body += line(cx, 116, cx, 140, arrow=True)
    body += decision(cx, 195, ["Obyekt sotuvda, mijoz xaridor,", "narx > 0 va sana bor", "deb tekshirildimi?"], w=360, h=110)
    body += line(cx, 250, cx, 285, arrow=True) + text(cx + 18, 272, "ha", 12, "start")
    body += text(515, 187, "yo‘q", 12, "start")
    body += process(cx, 308, "Komissiyani hisoblash: K = narx × 0,02")
    body += line(cx, 331, cx, 355, arrow=True)
    body += process(cx, 378, "Bitimni deals jadvaliga yozish")
    body += line(cx, 401, cx, 425, arrow=True)
    body += process(cx, 448, "Obyektni «sotilgan» deb belgilash (sold = 1)")
    body += line(cx, 471, cx, 495, arrow=True)
    body += terminal(cx, 515, "Tugash")
    body += text(585, 330, "Xatoda bitim yozilmaydi,", 12, "start") + text(585, 346, "forma qayta ochiladi", 12, "start")
    body += poly([(510, 195), (570, 195), (570, 515), (cx + 85, 515)], arrow=True)
    return svg(800, 545, body)


def access_flow():
    cx = 300
    body = terminal(cx, 30, "So‘rov keldi")
    body += line(cx, 50, cx, 75, arrow=True)
    body += decision(cx, 120, ["Sessiyada login", "bormi?"], w=260, h=90)
    body += line(430, 120, 475, 120, arrow=True) + text(440, 112, "yo‘q", 12, "start")
    body += process(560, 120, "/login sahifasiga yo‘naltirish", w=170, h=56)
    body += line(cx, 165, cx, 205, arrow=True) + text(cx + 14, 190, "ha", 12, "start")
    body += decision(cx, 250, ["O‘chirish", "so‘rovimi?"], w=260, h=90)
    body += line(430, 250, 475, 250, arrow=True) + text(440, 242, "yo‘q", 12, "start")
    body += process(560, 250, "So‘rov bajariladi", w=170, h=56)
    body += line(cx, 295, cx, 335, arrow=True) + text(cx + 14, 320, "ha", 12, "start")
    body += decision(cx, 380, ["Rol =", "administrator?"], w=260, h=90)
    body += poly([(170, 380), (90, 380), (90, 447)]) + text(160, 372, "yo‘q", 12, "end")
    body += process(90, 470, "403: ruxsat yo‘q", w=130, h=46)
    body += line(cx, 425, cx, 460, arrow=True) + text(cx + 14, 447, "ha", 12, "start")
    body += process(cx, 483, "Bitimi borligini tekshirish", w=260)
    body += line(cx, 506, cx, 535, arrow=True)
    body += process(cx, 558, "Bitim yo‘q bo‘lsa o‘chirish", w=260)
    return svg(680, 600, body)


def main():
    pages = {"er": er_diagram(), "arch": architecture(), "flow_deal": deal_flow(), "flow_access": access_flow()}
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_context(viewport={"width": 1000, "height": 800}, device_scale_factor=2).new_page()
        for name, markup in pages.items():
            page.set_content(f"<body style='margin:0;background:#fff'>{markup}</body>")
            page.query_selector("svg").screenshot(path=f"{OUT}/{name}.png")
        browser.close()


main()
