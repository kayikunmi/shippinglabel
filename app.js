// Get the form elements
const form = document.querySelector('form');
const fromInput = document.querySelector('#from');
const toInput = document.querySelector('#to');

// Get the label container element
const labelContainer = document.querySelector('#label-container');

// Listen for form submit events
form.addEventListener('submit', (event) => {
  event.preventDefault();

  // Get the form data
  const from = fromInput.value;
  const to = toInput.value;

  // Create the label template
  const labelTemplate = `
    <div class="label">
      <h2>Label Information </h2>
      <p>From: ${from}</p>
      <p>To: ${to}</p>
      <div id="qr-code"></div>
    </div>
  `;

  // Add the label template to the label container
  labelContainer.innerHTML = labelTemplate;

  // Generate the QR code
  const qrCodeContainer = document.querySelector('#qr-code');
  const qrCode = new QRious({
    element: qrCodeContainer,
    value: `${from}, ${to}`,
    size: 150 // Adjust the size of the QR code
  });

  // Display the QR code on the HTML page
  const qrCodeImage = new Image();
  qrCodeImage.src = qrCode.toDataURL();
  qrCodeContainer.appendChild(qrCodeImage);

  // Convert the label container to a PDF and download it
  const pdf = new jsPDF();
  pdf.fromHTML(labelContainer, 15, 15, {}, () => {
    const qrCodeWidth = 80; // Set the width of the QR code
    const qrCodeHeight = 80; // Set the height of the QR code
    const x = (pdf.internal.pageSize.getWidth() / 2) - (qrCodeWidth / 2); // Calculate the center position
    const y = 75; // Set the y position of the QR code
    pdf.addImage(qrCode.toDataURL(), 'JPEG', x, y, qrCodeWidth, qrCodeHeight);
    pdf.save('shipping-label.pdf');
  });
});
