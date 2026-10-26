// Kurs ishi generatori: kafedra talablariga ko'ra formatlangan .docx yaratadi.
// Format: A4, Times New Roman 14, interval 1,5, xatboshi 1,25 sm, hoshiyalar chap 30 / yuqori-past 20 / o'ng 15 mm.

const fs = require("fs");
const JSZip = require("jszip");
const {
  Document, Packer, Paragraph, TextRun, ImageRun, Table, TableRow, TableCell, WidthType, AlignmentType,
  HeadingLevel, Footer, PageNumber, BorderStyle, ShadingType, LineRuleType,
} = require("docx");

const FONT = "Times New Roman";
const MONO = "Courier New";
const SIZE = 28; // 14 pt
const TABLE_SIZE = 24; // 12 pt
const CODE_SIZE = 17; // 8,5 pt
const LINE = 360; // interval 1,5
const INDENT = 709; // 1,25 sm
const PAGE = { width: 11906, height: 16838 };
const MARGIN = { top: 1134, bottom: 1134, left: 1701, right: 851 };
const TEXT_WIDTH = PAGE.width - MARGIN.left - MARGIN.right; // 9354 DXA
const FIRST_PAGE_NUMBER = 2; // titul varaq keyin qo'shiladi, shuning uchun raqamlash 2 dan boshlanadi

function pngSize(file) {
  const buffer = fs.readFileSync(file);
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

function runs(text, extra = {}) {
  return new TextRun({ text, font: FONT, size: SIZE, ...extra });
}

class Builder {
  constructor(imageFolder) {
    this.imageFolder = imageFolder;
    this.children = [];
    this.headings = []; // mundarija uchun: {level, text}
    this.figureCount = 0;
    this.tableCount = 0;
  }

  // Asosiy matn xatboshisi. lead berilsa, xatboshi shu qalin so'zlar bilan boshlanadi.
  p(text, lead) {
    const parts = [];
    if (lead) parts.push(runs(lead + " ", { bold: true }));
    parts.push(runs(text));
    this.children.push(new Paragraph({
      children: parts, alignment: AlignmentType.JUSTIFIED,
      spacing: { line: LINE, lineRule: LineRuleType.AUTO, before: 0, after: 0 },
      indent: { firstLine: INDENT },
    }));
  }

  // Yangi sahifadan boshlanadigan bo'lim: KIRISH, XULOSA, bob nomlari.
  h1(text) {
    this.headings.push({ level: 1, text });
    this.children.push(new Paragraph({
      heading: HeadingLevel.HEADING_1, children: [runs(text, { bold: true })], pageBreakBefore: true,
      alignment: AlignmentType.CENTER, keepNext: true,
      spacing: { line: LINE, lineRule: LineRuleType.AUTO, before: 0, after: 120 },
    }));
  }

  // Paragraf sarlavhasi: 1.1., 2.3. ...
  h2(text) {
    this.headings.push({ level: 2, text });
    this.children.push(new Paragraph({
      heading: HeadingLevel.HEADING_2, children: [runs(text, { bold: true })],
      alignment: AlignmentType.LEFT, keepNext: true, indent: { firstLine: INDENT },
      spacing: { line: LINE, lineRule: LineRuleType.AUTO, before: 120, after: 60 },
    }));
  }

  plainTitle(text) {
    this.children.push(new Paragraph({
      children: [runs(text, { bold: true })], alignment: AlignmentType.CENTER, keepNext: true,
      spacing: { line: LINE, lineRule: LineRuleType.AUTO, before: 0, after: 120 },
    }));
  }

  // Adabiyotlar ro'yxatidagi guruh nomi (mundarijaga kirmaydi)
  subtitle(text) {
    this.children.push(new Paragraph({
      children: [runs(text, { bold: true })], alignment: AlignmentType.LEFT, keepNext: true,
      spacing: { line: LINE, lineRule: LineRuleType.AUTO, before: 120, after: 0 },
    }));
  }

  // Ro'yxat bandi (raqamli), osma chekinish bilan
  item(number, text) {
    this.children.push(new Paragraph({
      children: [runs(`${number}. ${text}`)], alignment: AlignmentType.JUSTIFIED,
      spacing: { line: LINE, lineRule: LineRuleType.AUTO, before: 0, after: 0 },
      indent: { left: 567, hanging: 567 },
    }));
  }

  // Ilova: o'ng yuqori burchakda "N-ILOVA", pastida nomi (mundarijada ko'rinadi)
  appendix(marker, title) {
    this.children.push(new Paragraph({
      children: [runs(marker, { bold: true })], alignment: AlignmentType.RIGHT, pageBreakBefore: true, keepNext: true,
      spacing: { line: LINE, lineRule: LineRuleType.AUTO, before: 0, after: 0 },
    }));
    this.headings.push({ level: 2, text: title });
    this.children.push(new Paragraph({
      heading: HeadingLevel.HEADING_2, children: [runs(title, { bold: true })], alignment: AlignmentType.CENTER,
      keepNext: true, spacing: { line: LINE, lineRule: LineRuleType.AUTO, before: 0, after: 120 },
      indent: { firstLine: 0 },
    }));
  }

  // Rasm: markazda, ostida "N-rasm. Nomi"
  figure(file, caption, maxWidthCm = 16, maxHeightCm = 17) {
    const size = pngSize(`${this.imageFolder}/${file}`);
    // Rasm ruxsat etilgan eng katta o'lchamga (sm) moslanadi, nisbat saqlanadi; docx piksel (96 dpi) kutadi
    const fitScale = Math.min(maxWidthCm / size.width, maxHeightCm / size.height);
    const pxWidth = Math.round(size.width * fitScale / 2.54 * 96);
    const pxHeight = Math.round(size.height * fitScale / 2.54 * 96);
    this.figureCount += 1;
    this.children.push(new Paragraph({
      children: [new ImageRun({ type: "png", data: fs.readFileSync(`${this.imageFolder}/${file}`),
        transformation: { width: pxWidth, height: pxHeight },
        altText: { title: caption, description: caption, name: file } })],
      alignment: AlignmentType.CENTER, keepNext: true,
      spacing: { line: 240, lineRule: LineRuleType.AUTO, before: 120, after: 60 },
    }));
    this.children.push(new Paragraph({
      children: [runs(`${this.figureCount}-rasm. ${caption}`, { size: SIZE })], alignment: AlignmentType.CENTER,
      spacing: { line: 240, lineRule: LineRuleType.AUTO, before: 0, after: 200 },
    }));
  }

  // Jadval: tepasida "N-jadval. Nomi"
  table(caption, head, rows, widths) {
    const total = widths.reduce((a, b) => a + b, 0);
    if (total !== TEXT_WIDTH) throw new Error(`Jadval "${caption}" kengligi ${total}, kerak ${TEXT_WIDTH}`);
    this.tableCount += 1;
    this.children.push(new Paragraph({
      children: [runs(`${this.tableCount}-jadval. ${caption}`)], alignment: AlignmentType.LEFT, keepNext: true,
      spacing: { line: 240, lineRule: LineRuleType.AUTO, before: 120, after: 80 },
    }));
    const border = { style: BorderStyle.SINGLE, size: 4, color: "000000" };
    const borders = { top: border, bottom: border, left: border, right: border };
    const cell = (text, width, header, align) => new TableCell({
      width: { size: width, type: WidthType.DXA }, borders,
      shading: header ? { fill: "D9D9D9", type: ShadingType.CLEAR, color: "auto" } : undefined,
      margins: { top: 40, bottom: 40, left: 80, right: 80 },
      children: [new Paragraph({
        children: [new TextRun({ text: String(text), font: FONT, size: TABLE_SIZE, bold: header })],
        alignment: header ? AlignmentType.CENTER : (align || AlignmentType.LEFT),
        spacing: { line: 240, lineRule: LineRuleType.AUTO, before: 0, after: 0 },
      })],
    });
    const tableRows = [new TableRow({ tableHeader: true, cantSplit: true, children: head.map((t, i) => cell(t, widths[i], true)) })];
    for (const row of rows) {
      tableRows.push(new TableRow({ cantSplit: true, children: row.map((t, i) => cell(t, widths[i], false)) }));
    }
    this.children.push(new Table({ width: { size: TEXT_WIDTH, type: WidthType.DXA }, columnWidths: widths, rows: tableRows }));
    this.children.push(new Paragraph({ children: [], spacing: { line: 240, before: 0, after: 120 } }));
  }

  // Dastur matni (ilovalar uchun): bir xil kenglikdagi shrift, interval 1,0
  code(lines) {
    for (const line of lines) {
      this.children.push(new Paragraph({
        children: [new TextRun({ text: line === "" ? " " : line, font: MONO, size: CODE_SIZE })],
        alignment: AlignmentType.LEFT, spacing: { line: 240, lineRule: LineRuleType.AUTO, before: 0, after: 0 },
      }));
    }
  }

  tocPlaceholder() {
    this.children.push(new Paragraph({ children: [new TextRun({ text: "@@TOC@@", font: FONT, size: SIZE })] }));
  }

  async save(file, pageNumbers) {
    const style = (id, name, size, extra = {}) => ({ id, name, basedOn: "Normal", next: "Normal", quickFormat: true,
      run: { font: FONT, size, ...extra.run }, paragraph: extra.paragraph || {} });
    const doc = new Document({
      creator: "Kurs ishi", title: "Ko‘chmas mulk agentligi axborot tizimi",
      styles: {
        default: { document: { run: { font: { ascii: FONT, hAnsi: FONT, cs: FONT, eastAsia: FONT }, size: SIZE } } },
        paragraphStyles: [
          { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
            run: { font: FONT, size: SIZE, bold: true }, paragraph: { outlineLevel: 0 } },
          { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
            run: { font: FONT, size: SIZE, bold: true }, paragraph: { outlineLevel: 1 } },
          style("TOC1", "toc 1", SIZE, { paragraph: { spacing: { line: 276, before: 0, after: 40 } } }),
          style("TOC2", "toc 2", SIZE, { paragraph: { spacing: { line: 276, before: 0, after: 40 }, indent: { left: 340 } } }),
        ],
      },
      sections: [{
        properties: {
          page: { size: PAGE, margin: { ...MARGIN, header: 567, footer: 567 }, pageNumbers: { start: FIRST_PAGE_NUMBER } },
        },
        footers: {
          default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER,
            children: [new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: 24 })] })] }),
        },
        children: this.children,
      }],
    });
    const buffer = await Packer.toBuffer(doc);
    const zip = await JSZip.loadAsync(buffer);
    let xml = await zip.file("word/document.xml").async("string");
    xml = xml.replace(/<w:p>(?:(?!<\/w:p>).)*?@@TOC@@.*?<\/w:p>/s, tocXml(this.headings, pageNumbers));
    zip.file("word/document.xml", xml);
    fs.writeFileSync(file, await zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" }));
  }
}

function xmlEscape(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Mundarija: Word'ning TOC maydoni, ichida joriy natija. Word'da "Update field" bosilsa qayta quriladi.
function tocXml(headings, pageNumbers) {
  const run = (inner) => `<w:r><w:rPr><w:rFonts w:ascii="${FONT}" w:hAnsi="${FONT}" w:cs="${FONT}"/><w:sz w:val="${SIZE}"/></w:rPr>${inner}</w:r>`;
  const plainRun = (inner) => `<w:r>${inner}</w:r>`;
  let out = "";
  headings.forEach((heading, index) => {
    const style = heading.level === 1 ? "TOC1" : "TOC2";
    const page = pageNumbers && pageNumbers[index] != null ? pageNumbers[index] : 0;
    let body = "";
    if (index === 0) {
      body += plainRun('<w:fldChar w:fldCharType="begin"/>') +
        plainRun('<w:instrText xml:space="preserve"> TOC \\o "1-2" \\z \\u </w:instrText>') +
        plainRun('<w:fldChar w:fldCharType="separate"/>');
    }
    body += run(`<w:t xml:space="preserve">${xmlEscape(heading.text)}</w:t>`) + run("<w:tab/>") + run(`<w:t>${page}</w:t>`);
    out += `<w:p><w:pPr><w:pStyle w:val="${style}"/><w:tabs><w:tab w:val="right" w:leader="dot" w:pos="${TEXT_WIDTH}"/></w:tabs></w:pPr>${body}</w:p>`;
  });
  out += `<w:p>${plainRun('<w:fldChar w:fldCharType="end"/>')}</w:p>`;
  return out;
}

module.exports = { Builder, TEXT_WIDTH };
