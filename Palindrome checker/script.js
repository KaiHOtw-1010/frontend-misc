const textInput = document.querySelector(".inputs input");
const checkButton = document.querySelector(".inputs button");
const infoText = document.querySelector(".info-text");
let filterTextInput;

textInput.addEventListener("keyup", () => {
  filterTextInput = textInput.value.toLowerCase();
  if (filterTextInput.match(/[^A-Z 0-9\u4e00-\u9cff]/gi) || !filterTextInput) {
    checkButton.classList.remove("active");
    infoText.style.display = "none";
  } else {
    checkButton.classList.add("active");
  }
  // filterTextInput = textInput.value
  //   .toLowerCase()
  //   .replace(/[^A-Z0-9\u4e00-\u9cff]/gi, "");
  // if (filterTextInput) {
  //   return checkButton.classList.add("active");
  // }
  // checkButton.classList.remove("active");
  // infoText.style.display = "none";
});

checkButton.addEventListener("click", () => {
  let reverseTextInput = filterTextInput.split("").reverse().join("");
  infoText.style.display = "block";
  if (filterTextInput !== reverseTextInput) {
    // infoText.appendChild(document.createTextNode("No, "));
    // let spanText = document.createElement("span");
    // spanText.appendChild(document.createTextNode(`'${textInput.value}'`));
    // infoText.appendChild(spanText);
    // infoText.appendChild(document.createTextNode(" is not a palindrome!"));
    infoText.innerHTML = `No, <span>'${textInput.value}'</span> is not a palindrome!`;
    return;
  } else {
    // infoText.appendChild(document.createTextNode("Yes, "));
    // let spanText = document.createElement("span");
    // spanText.appendChild(document.createTextNode(`'${textInput.value}'`));
    // infoText.appendChild(spanText);
    // infoText.appendChild(document.createTextNode(" is a palindrome!"));
    infoText.innerHTML = `Yes, <span>'${textInput.value}'</span> is a palindrome!`;
  }
});
