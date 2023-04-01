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
    size: 200
  });

  // Convert the label container to a PDF and download it
  const pdf = new jsPDF();
  pdf.fromHTML(labelContainer, 15, 15, {}, () => {
    pdf.addImage(qrCode.toDataURL(), 'JPEG', 15, 75, 180, 180);
    pdf.save('shipping-label.pdf');
  });
});
