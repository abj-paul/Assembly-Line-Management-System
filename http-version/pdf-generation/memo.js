const fs = require('fs');
const PDFDocument = require('pdfkit');

function generatePDF(content, outputPath) {
  const doc = new PDFDocument();

  // Pipe the PDF document to a writable stream
  const writeStream = fs.createWriteStream(outputPath);
  doc.pipe(writeStream);

  // Write the content to the PDF document
  doc.fontSize(12).text(content);

  // Finalize the PDF document
  doc.end();

  // Handle the write stream's finish event
  writeStream.on('finish', () => {
    console.log(`PDF saved to: ${outputPath}`);
  });
}

let testContent = `
Memorandum

To: [Recipient Name]
From: [Your Name]
Date: [Date]
Subject: [Subject]

This memo is to inform you of the following:

[Body of memo]

Please let me know if you have any questions.

Thank you,
[Your Name]
`
/*
const outputPath = '../data/pdf/memo.pdf';
generatePDF(memoContent, outputPath);
*/

module.exports = {generatePDF, testContent}