const wrapper = document.querySelector(".wrapper");
const qrInput = document.querySelector(".form input");
const generateButton = document.querySelector(".form button");
const qrImage = document.querySelector(".qr-code img");

generateButton.addEventListener("click", () => {
  let qrValue = qrInput.value;
  if (!qrValue) return;

  generateButton.textContent = "Generating QR Code...";

  qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=170x170&data=${qrValue}`;

  qrImage.addEventListener("load", () => {
    // once qr code image loaded
    wrapper.classList.add("active");
    generateButton.textContent = "Generate QR Code";
  });
});

qrInput.addEventListener("keyup", () => {
  if (!qrInput.value) wrapper.classList.remove("active");
});
