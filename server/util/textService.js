function titleCase(string) {
  const sentence = string.toLowerCase().split(" ");
  for (var i = 0; i < sentence.length; i++) {
    sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
  }

  return sentence.join(" ");
}

function splitText(string, split, val) {
  return string.split(split)[val];
}

function properCase(string) {
  const splitText = string.toLowerCase().split(" ");
  const text = splitText[0].charAt(0).toUpperCase() + splitText[0].substring(1);
  splitText.shift();

  const newArray = [text, ...splitText];

  // txt[0];
  // txt.join(" ");

  return newArray.join(" ");
}

module.exports = { properCase, titleCase, splitText };
