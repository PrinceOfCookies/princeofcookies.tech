// Yes I used AI for this when it was originally made.. its not actually used at all and just wanted to see how it would turn out lol

async function generatePDF() {
  const { jsPDF } = window.jspdf;
  const employeeName = document.getElementById("employeeName").value;

  if (!employeeName) {
    alert("Please enter the employee's name.");
    return;
  }

  // Create a new jsPDF instance with a larger page size
  const pdf = new jsPDF({
    orientation: "p", // Portrait orientation
    unit: "mm", // Use mm for measurement
    format: "a4", // A4 size
    hotfixes: ["px_scaling"], // Prevent scaling issues
  });

  // Title
  pdf.setFontSize(16);
  pdf.text("Leave of Absence (LOA) Agreement", 105, 20, null, null, "center");

  // Subtitle
  pdf.setFontSize(12);
  pdf.text(
    "Between " + employeeName + " and Flex Networks",
    105,
    30,
    null,
    null,
    "center"
  );
  pdf.setFontSize(10);
  pdf.text("Effective Date: [Date]", 20, 40);

  // Agreement content
  const content = `
Parties:
- Employee/Member: ${employeeName}
- Employer/Organization: Flex Networks

1. Purpose of Agreement
This Leave of Absence (LOA) Agreement is established to clarify the terms under which a member or 
employee, ${employeeName}, may take a temporary leave from their duties within Flex Networks. 
The purpose of the LOA may include, but is not limited to, personal, educational, or professional reasons.

2. Maximum Duration of Leave
- LOA requests will be granted for a period of no more than 28 consecutive days.
- In circumstances where additional time is needed beyond the 28-day period, ${employeeName} may either submit 
  a request for an extension to a Staff Manager or consider resignation.
- Approval of any extended leave beyond 28 days is at the sole discretion of Flex Networks and is not guaranteed.

3. LOA Submission and Approval Requirements
- ${employeeName} must submit a formal LOA request via the designated LOA form, detailing the reasons for the requested absence.
- The LOA form must be completed thoroughly and accurately; failure to complete the form properly will result in a denial of the request.
- Upon approval, the LOA will relieve ${employeeName} of any requirement to attend meetings or perform active duties, including sits or related responsibilities, during the duration of the leave.

4. Terms and Conditions
- This LOA does not imply a guarantee of the position upon return; Flex Networks reserves the right to reassign duties as necessary.
- All LOA requests are subject to Flex Networks' review and approval based on organizational needs.

5. Agreement to Terms
By signing below, both parties acknowledge and agree to the terms and conditions set forth in this LOA Agreement.
    `;

  // Add content to the PDF with wrapping
  pdf.setFontSize(10);
  const pageWidth = 180; // Width for text wrapping
  const lines = pdf.splitTextToSize(content, pageWidth);
  let yPosition = 50; // Starting Y position for the content
  const maxYPosition = 270; // Maximum Y position for a single page
  const topMargin = 24; // Top margin for new pages

  lines.forEach((line) => {
    // Check if we need to add a new page
    if (yPosition + 8 > maxYPosition) {
      pdf.addPage(); // Add a new page
      yPosition = topMargin; // Reset Y position for new page with additional space
      // Optionally re-add title and subtitle for the new page
      pdf.setFontSize(16);
      pdf.text(
        "Leave of Absence (LOA) Agreement",
        105,
        20,
        null,
        null,
        "center"
      );
      pdf.setFontSize(12);
      pdf.text(
        "Between " + employeeName + " and Flex Networks",
        105,
        30,
        null,
        null,
        "center"
      );
      pdf.setFontSize(10);
      pdf.text("Effective Date: [Date]", 20, 40);
    }
    pdf.text(line, 20, yPosition);
    yPosition += 8; // Move down for the next line
  });

  // Add signature fields, making sure they fit in the last page
  if (yPosition + 40 > maxYPosition) {
    pdf.addPage(); // Add a new page if needed
    yPosition = topMargin; // Reset Y position for the new page with additional space
  }

  pdf.text("Employee/Member:", 20, yPosition + 20);
  pdf.text(
    "Signature: ______________________ Date: __________",
    20,
    yPosition + 30
  );

  pdf.text(
    "For Flex Networks (Authorized Representative):",
    20,
    yPosition + 40
  );
  pdf.text(
    "Signature: ______________________ Date: __________",
    20,
    yPosition + 50
  );

  // Save the PDF with a dynamic file name
  pdf.save(`LOA_Agreement_${employeeName.replace(/\s+/g, "_")}.pdf`);
}
