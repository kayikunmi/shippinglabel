// Get the form elements
const form = document.querySelector('form');
const fromnameInput = document.querySelector('#fromname');
const fromnumberInput = document.querySelector('#fromnumber');
const fromaddressInput = document.querySelector('#fromaddress');
const tonameInput = document.querySelector('#toname');
const tonumberInput = document.querySelector('#tonumber');
const toaddressInput = document.querySelector('#toaddress');
const itemsInput = document.querySelector('#items');
const noteInput = document.querySelector('#note');


// Get the label container element
const labelContainer = document.querySelector('#label-container');

// Listen for form submit events
form.addEventListener('submit', (event) => {
  event.preventDefault();

  // Get the form data
  const fromname = fromnameInput.value;
  const fromnumber = fromnumberInput.value;
  const fromaddress = fromaddressInput.value;
  const toname = tonameInput.value;
  const tonumber = tonumberInput.value;
  const toaddress = toaddressInput.value;
  const items = itemsInput.value;
  const note = noteInput.value;

  // Create the label template
  const labelTemplate = `
    <div class="label">
      <h2>Label Information </h2>
      <p>Sender Name: ${fromname}</p>
      <p>Sender Number: ${fromnumber}</p>
      <p>Sender Address: ${fromaddress}</p>
      <p>Receiver Name: ${toname}</p>
      <p>Receiver Number: ${tonumber}</p>
      <p>Receiver Address: ${toaddress}</p>
      <p>Items: ${items}</p>
      <p>Note: ${note}</p>
      <div id="qr-code"></div>
    </div>
  `;

  // Add the label template to the label container
  labelContainer.innerHTML = labelTemplate;

  // Generate the QR code
  const qrCodeContainer = document.querySelector('#qr-code');
  const qrCode = new QRious({
    element: qrCodeContainer,
    value: `${fromname},${fromnumber},${fromaddress},${toname},${tonumber},${toaddress}${items},${note}`,
    size: 80 // Adjust the size of the QR code
  });

  // Display the QR code on the HTML page
  const qrCodeImage = new Image();
  qrCodeImage.src = qrCode.toDataURL();
  qrCodeContainer.appendChild(qrCodeImage);

  // Convert the label container to a PDF and download it
  const pdf = new jsPDF();
  pdf.fromHTML(labelContainer, 10, 10, {}, () => {
    const qrCodeWidth = 80; // Set the width of the QR code
    const qrCodeHeight = 80; // Set the height of the QR code
    const x = (pdf.internal.pageSize.getWidth() / 2) - (qrCodeWidth / 2); // Calculate the center position
    const y = 100; // Set the y position of the QR code
    pdf.addImage(qrCode.toDataURL(), 'JPEG', x, y, qrCodeWidth, qrCodeHeight);
    pdf.save('shipping-label.pdf');
  });
});
