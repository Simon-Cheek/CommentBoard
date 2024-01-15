
// fix extra whitespace on text area

const editBox = document.querySelector('#comment-edit');

let currentText = editBox.value;
currentText = currentText.trim();
editBox.value = currentText;


