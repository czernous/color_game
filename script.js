let numSquares = 6;
const colorPicker = () => {
  let random = Math.floor(Math.random() * colors.length);
  return colors[random];
};
const setColors = (color) => {
  for (let i = 0; i < squares.length; i++) {
    squares[i].style.background = color;
  }
};
const randRgb = () => {
  //generate RGB channels from 0 to 255
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
};
const generateRandCol = (num) => {
  const arr = [];
  for (let i = 0; i < num; i++) {
    arr.push(randRgb());
  }
  return arr;
};
const reset = () => {
  colors = generateRandCol(numSquares);
  pickedColor = colorPicker();
  colorDisplay.textContent = pickedColor;
  for (let i = 0; i < squares.length; i++) {
    colors[i]
      ? (squares[i].style.visibility = 'visible')
      : (squares[i].style.visibility = 'hidden');
    squares[i].style.background = colors[i];
  }
  heading.style.background = '#333';
  resetBtn.textContent = 'New Colors';
  message.textContent = '';
};

let colors = generateRandCol(numSquares);

const squares = document.querySelectorAll('.square');
const colorDisplay = document.querySelector('#colorDisplay');
const message = document.querySelector('#message');
const heading = document.querySelector('h1');
const resetBtn = document.querySelector('#reset-btn');
const modeBtn = document.querySelectorAll('.mode-btn');

let pickedColor = colorPicker();
// buttons
// new game/color
resetBtn.addEventListener('click', reset);
colorDisplay.textContent = pickedColor;
// game mode
modeBtn.forEach((e) => {
  e.addEventListener('click', () => {
    modeBtn[0].classList.remove('selected');
    modeBtn[1].classList.remove('selected');
    e.classList.add('selected');

    e.textContent === 'Easy' ? (numSquares = 3) : (numSquares = 6);

    reset();
  });
});
// colors
for (let i = 0; i < squares.length; i++) {
  squares[i].style.background = colors[i];

  squares[i].addEventListener('click', () => {
    let clickedColor = squares[i].style.background;

    if (clickedColor === pickedColor) {
      message.textContent = 'Correct';
      resetBtn.textContent = 'New Game';
      setColors(clickedColor);
      heading.style.background = clickedColor;
    } else {
      squares[i].style.background = '#333';
      message.textContent = 'Try Again';
      heading.style.background = '#333';
    }
  });
}
