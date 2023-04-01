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
      <h2>Shipping Label</h2>
      <p>From: ${from}</p>
      <p>To: ${to}</p>
      <div class="qr-code"></div>
    </div>
  `;

  // Add the label template to the label container
  labelContainer.innerHTML = labelTemplate;

  // Generate the QR
  // Get the QR code container element
  const qrCodeContainer = document.querySelector('.qr-code');

  // Generate the QR code
  const qrCode = new QRCode(qrCodeContainer, {
    text: `${from}, ${to}`,
    width: 200,
    height: 200,
  });

  // Convert the label template to a PDF
  const pdf = new jsPDF();
  pdf.html(labelContainer, {
    callback: () => {
      // Save the PDF file
      pdf.save('shipping-label.pdf');
    },
  });
});
