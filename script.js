let readInterval = null;
let currentWordSpeed = 500;
let wordSpeed = 500;
let text = "";
let lastWord = 0;
let currentWord = 0;
let loops = false;

const speedChangeStep = 20;

const fonts = {
  TNR: "Times New Roman,sans-serif",
  OpenS: "Open Sans,sans-serif",
  Quicksand: "Quicksand,sans-serif",
  Roboto: "Roboto,sans-serif",
  RobotoC: "Roboto Condensed,sans-serif",
  RobotoM: "Roboto Mono,monospace",
  SourceS: "Source Sans Pro,sans-serif"
};

window.onload = () => {
  document.getElementById("wpmVal").innerHTML = document.getElementById("wpm").value;
  document.getElementById("wpm").oninput = () => {
    changeWPM();
  };
  changeWPM();
};

addSubWPM = type => {
  let current = parseInt(document.getElementById("wpm").value);
  if (type === "+") {
    document.getElementById("wpm").value = current + 50 > 600 ? current : current + 50;
  } else if (type === "-") {
    document.getElementById("wpm").value = current - 50 < 50 ? current : current - 50;
  }
  changeWPM();
};

changeWPM = () => {
  wordSpeed = (60 / document.getElementById("wpm").value) * 1000;
  document.getElementById("wpmVal").innerHTML = document.getElementById("wpm").value;
};

start = () => {
  console.log(fonts[document.getElementById("font-select").value]);
  document.getElementById("readText").style.fontFamily =
    fonts[document.getElementById("font-select").value];

  const s = document.getElementById("textInput").selectionStart;
  const e = document.getElementById("textInput").selectionEnd;

  window.scrollTo(0, 0);
  loops = true;

  if (s === e) {
    setTimeout(read(0), 500);
  } else {
    setTimeout(read(s), 500);
  }
};

read = subs => {
  text = document
    .getElementById("textInput")
    .value.substr(subs)
    .split("\n\n")
    .join(" #:-DDDd# ")
    .split(" ");
  lastWord = text.length - 1;
  currentWord = 0;
  currentWordSpeed = 500;
  loops = true;
  loop();
};

loop = () => {
  if (!loops) {
    return;
  }
  if (text[currentWord] == "#:-DDDd#") {
    document.getElementById("readText").innerHTML = " ";
  } else {
    document.getElementById("readText").innerHTML = text[currentWord];
  }
  if (currentWord === lastWord) {
    stop();
  }
  currentWord++;
  if (currentWordSpeed < wordSpeed) {
    currentWordSpeed += speedChangeStep;
  } else if (currentWordSpeed > wordSpeed) {
    currentWordSpeed -= speedChangeStep;
  }
  setTimeout(loop, currentWordSpeed);
};

stop = () => {
  loops = false;
  setTimeout((document.getElementById("readText").innerHTML = " "), 1000);
};
