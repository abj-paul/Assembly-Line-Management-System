const fs = require('fs');
const PDFDocument = require('pdfkit');

const memoContent = `
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
`;

// Create a new PDF document
const doc = new PDFDocument();

// Pipe the PDF document to a file
const writeStream = fs.createWriteStream('memo.pdf');
doc.pipe(writeStream);

// Set the content of the PDF document
doc.text(memoContent);

// Finalize the PDF document
doc.end();

// Handle the finish event when the PDF generation is complete
writeStream.on('finish', () => {
  console.log('PDF generation complete.');
});

// Handle any error during PDF generation
writeStream.on('error', (error) => {
  console.error('Error generating PDF:', error);
});
