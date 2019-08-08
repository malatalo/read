let readInterval = null;
let wordSpeed = 500;
let text = "";
let lastWord = 0;
let currentWord = 0;
let loops = false;

window.onload = () => {
  document.getElementById("wpmVal").innerHTML = document.getElementById("wpm").value;
  document.getElementById("wpm").oninput = () => {
    wordSpeed = (60 / document.getElementById("wpm").value) * 1000;
    document.getElementById("wpmVal").innerHTML = document.getElementById("wpm").value;
  };
};

start = () => {
  // const s = document.getElementById("textInput").selectionStart;
  // const e = document.getElementById("textInput").selectionEnd;
  // console.log(s === e);

  loops = true;
  read();

  let counter = 4;
  document.getElementById("startBtn").innerHTML = counter + 1;
  let interval = setInterval(function() {
    document.getElementById("startBtn").innerHTML = counter;
    counter--;
    if (counter == -1) {
      clearInterval(interval);
      document.getElementById("startBtn").innerHTML = "READ";
      // loops = true;
      // read();
    }
  }, 1000);
};

read = () => {
  text = document
    .getElementById("textInput")
    .value.split("\n\n")
    .join(" #:-DDDd# ")
    .split(" ");
  lastWord = text.length - 1;
  currentWord = 0;
  loops = true;
  loop();
};

loop = () => {
  if(!loops){
    return;
  }
  if(text[currentWord] == "#:-DDDd#"){
    document.getElementById("readText").innerHTML = " ";
  }else {
    document.getElementById("readText").innerHTML = text[currentWord];
  }
  if (currentWord === lastWord) {
    stop();
  }
  currentWord++;
  setTimeout(loop, wordSpeed);
};

stop = () => {
  loops = false;
  setTimeout(document.getElementById("readText").innerHTML = " ", 1000);
};
