import jsPDF from "jspdf";
import { Document, Packer, Paragraph } from "docx";

export function exportPDF(text) {
  const pdf = new jsPDF();
  pdf.text(text, 10, 10);
  pdf.save("jagoscript.pdf");
}

export async function exportDOC(text) {
  const doc = new Document({
    sections: [{
      children: [new Paragraph(text)]
    }]
  });

  const blob = await Packer.toBlob(doc);
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "jagoscript.docx";
  a.click();
}
