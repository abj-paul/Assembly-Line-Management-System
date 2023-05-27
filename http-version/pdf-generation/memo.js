const fs = require("fs");
const PDFDocument = require("pdfkit-table");

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
function generate_hourly_production_report(hourlyProductionReports){
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().slice(0, 10); // Format: YYYY-MM-DD
  const filename = `Hourly-Production-Report-${formattedDate}.pdf`;
  console.log(filename);

  let doc = new PDFDocument({ margin: 30});
  doc.pipe(fs.createWriteStream("./data/pdf/"+filename));

  doc
  .fontSize(25)
  .text('Hourly Production Report', 150, 200);

  doc.image('./pdf-generation/report-logo.png', 70, 250, {width:500});

  doc
  .fontSize(13)
  .text('Versatile Garments Ltd. \nUttara, Dhaka. \nAssembly Line Management System', 350, 550);

  doc
  .addPage()


  const tableJson = { 
    title: formattedDate+" | ALMS", 
    subtitle: "The following hourly production reports were submitted in the Assembly Line Management System.",
    "headers": [
    { "label":"Time", "property":"timeSent", "width":100 },
    { "label":"Amount", "property":"productionAmount", "width":100 },
    { "label":"Product", "property":"productName", "width":100 },
    { "label":"Statement", "property":"comment", "width":100 }
    ],
    "datas": hourlyProductionReports,
    "options": {
      "width": 300
    }
  };
doc.table(tableJson, 500, 300);
doc.end();

return filename;
}

function generate_single_hourly_production_report(productName, productionAmount, comment, timeSent){

  const to = "Production Manager";
  const from = "Supervisor";

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month is zero-based, so adding 1
  const day = String(currentDate.getDate()).padStart(2, "0");
  const hour = String(currentDate.getHours()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}, in ${hour} AM`;


  const filename = `Hourly-Production-Memo.pdf`;
  console.log(filename); // Output: file_20230511145625.txt


  let memoContent = `
    Memorandum

    To: ${to}
    From: ${from}
    Date: ${timeSent}
    Subject: Hourly Productin Report for ${productName}

    This memo is to inform you of the following:

    At ${formattedDate}, we have counted a total of ${productionAmount} ${productName}. We think this is a reasonable amount. ${comment};

    Please let me know if you have any questions.

    Thank you,
    ${from}
    `;

    const outputPath = './data/pdf/'+filename;
    generatePDF(memoContent, outputPath);
    return filename;
}

function generate__quality_report(qualityReports){
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().slice(0, 10); // Format: YYYY-MM-DD
  const filename = `Quality-Report-${formattedDate}.pdf`;
  console.log(filename);

  let doc = new PDFDocument({ margin: 30});
  doc.pipe(fs.createWriteStream("./data/pdf/"+filename));

  doc
  .fontSize(25)
  .text('Quality Report', 200, 200);

  doc.image('./pdf-generation/report-logo.png', 70, 250, {width:500});

  doc
  .fontSize(13)
  .text('Versatile Garments Ltd. \nUttara, Dhaka. \nAssembly Line Management System', 350, 550);

  doc
  .addPage()


  const tableJson = { 
    title: formattedDate+" | ALMS", 
    subtitle: "The following quality reports were submitted in the Assembly Line Management System.",
    "headers": [
    { "label":"Time", "property":"timeSent", "width":100 },
    { "label":"Product", "property":"productName", "width":100 },
    { "label":"Good Product", "property":"goodProductCount", "width":100 },
    { "label":"Defected Product", "property":"defectedProductCount", "width":100 },
    { "label":"Statement", "property":"comment", "width":100 }
    ],
    "datas": qualityReports,
    "options": {
      "width": 300
    }
  };
doc.table(tableJson, 500, 300);
doc.end();

return filename;
}

function generate_assembly_line_issues_report(qualityReports){
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().slice(0, 10); // Format: YYYY-MM-DD
  const filename = `Assembly-Line-Issues-${formattedDate}.pdf`;
  console.log(filename);

  let doc = new PDFDocument({ margin: 30});
  doc.pipe(fs.createWriteStream("./data/pdf/"+filename));

  doc
  .fontSize(25)
  .text('Assembly Line Issues Report', 200, 200);

  doc.image('./pdf-generation/report-logo.png', 70, 250, {width:500});

  doc
  .fontSize(13)
  .text('Versatile Garments Ltd. \nUttara, Dhaka. \nAssembly Line Management System', 350, 550);

  doc
  .addPage()


  const tableJson = { 
    title: formattedDate+" | ALMS", 
    subtitle: "The following assembly line issues reports were submitted in the Assembly Line Management System.",
    "headers": [
    { "label":"Time", "property":"timeSent", "width":100 },
    { "label":"Product", "property":"productName", "width":100 },
    { "label":"Machine", "property":"machineModel", "width":100 },
    { "label":"Issue", "property":"comment", "width":100 },
    ],
    "datas": qualityReports,
    "options": {
      "width": 300
    }
  };
doc.table(tableJson, 500, 300);
doc.end();

return filename;
}


module.exports = {generatePDF, testContent, generate_hourly_production_report, generate__quality_report,generate_single_hourly_production_report, generate_assembly_line_issues_report , generate_single_hourly_production_report}