const squares = document.querySelectorAll('.grid div'), 
      timeLeft = document.querySelector('#time-left'),
      result = document.querySelector('#result'),
      startBtn = document.querySelector('#btn'),
      pauseBtn = document.querySelector('#pause-btn'),
      restartBtn = document.querySelector('#btn-restart'),
      width = 9,
      carsLeft = document.querySelectorAll('.car-left'),
      carsRight = document.querySelectorAll('.car-right'),
      logsLeft = document.querySelectorAll('.log-left'),
      logsRight = document.querySelectorAll('.log-right');

let currentIndex = 76,
    currentTime = 20,
    timerId; 

squares[currentIndex].classList.add('frog');

function moveFrog(e) {
  squares[currentIndex].classList.remove('frog');

  switch(e.keyCode) {
    case 37:
      if(currentIndex % width !== 0) currentIndex -= 1; //skok vlevo
      break;
    case 38:
      if(currentIndex - width >= 0) currentIndex -= width; //skok nahoru
      break;
    case 39:
      if(currentIndex % width < width - 1) currentIndex += 1; //skok vpravo
      break;
    case 40:
      if(currentIndex + width < width * width) currentIndex += width; //skok dolů
      break;
  }
  squares[currentIndex].classList.add('frog');
  lose();
  win();
}

function autoMoveCars() {
  carsLeft.forEach(carLeft => moveCarLeft(carLeft));
  carsRight.forEach(carRight => moveCarRight(carRight));
}

function moveCarLeft(carLeft) {
  switch(true) {
    case carLeft.classList.contains('c1'):
      carLeft.classList.remove('c1');
      carLeft.classList.add('c2');
      break;
    case carLeft.classList.contains('c2'):
      carLeft.classList.remove('c2');
      carLeft.classList.add('c3');
      break;
    case carLeft.classList.contains('c3'):
      carLeft.classList.remove('c3');
      carLeft.classList.add('c1');
      break;
  }
}

function moveCarRight(carRight) {
  switch(true) {
    case carRight.classList.contains('c1'):
      carRight.classList.remove('c1');
      carRight.classList.add('c3');
      break;
    case carRight.classList.contains('c2'):
      carRight.classList.remove('c2');
      carRight.classList.add('c1');
      break;
    case carRight.classList.contains('c3'):
      carRight.classList.remove('c3');
      carRight.classList.add('c2');
      break;
  }
}

function autoMoveLogs() {
  logsLeft.forEach(logLeft => moveLogLeft(logLeft));
  logsRight.forEach(logRight => moveLogRight(logRight));
}

function moveLogLeft(logLeft) {
  switch(true) {
    case logLeft.classList.contains('l1'):
      logLeft.classList.remove('l1');
      logLeft.classList.add('l2');
      break;
    case logLeft.classList.contains('l2'):
      logLeft.classList.remove('l2');
      logLeft.classList.add('l3');
      break;
    case logLeft.classList.contains('l3'):
      logLeft.classList.remove('l3');
      logLeft.classList.add('l4');
      break;
    case logLeft.classList.contains('l4'):
      logLeft.classList.remove('l4');
      logLeft.classList.add('l5');
      break;
    case logLeft.classList.contains('l5'):
      logLeft.classList.remove('l5');
      logLeft.classList.add('l1');
      break;
  }
}

function moveLogRight(logRight) {
  switch(true) {
    case logRight.classList.contains('l1'):
      logRight.classList.remove('l1');
      logRight.classList.add('l5');
      break;
    case logRight.classList.contains('l2'):
      logRight.classList.remove('l2');
      logRight.classList.add('l1');
      break;
    case logRight.classList.contains('l3'):
      logRight.classList.remove('l3');
      logRight.classList.add('l2');
      break;
    case logRight.classList.contains('l4'):
      logRight.classList.remove('l4');
      logRight.classList.add('l3');
      break;
    case logRight.classList.contains('l5'):
      logRight.classList.remove('l5');
      logRight.classList.add('l4');
      break;
  }
}

function win() {
  if(squares[4].classList.contains('frog')) {
    result.innerHTML = 'you won!';
    // squares[currentIndex].classList.remove('frog');
    clearInterval(timerId);
    document.removeEventListener('keyup', moveFrog);
  }
}

function lose() {
  if((currentTime === 0) || (squares[currentIndex].classList.contains('c1'))
  || (squares[currentIndex].classList.contains('l5'))
  || (squares[currentIndex].classList.contains('l4'))) {
    result.innerHTML = 'you lose!';
    squares[currentIndex].classList.remove('frog');
    clearInterval(timerId);
    document.removeEventListener('keyup', moveFrog);
  }
}

function moveWithLogLeft() {
  if(currentIndex >= 27 && currentIndex < 35) {
    squares[currentIndex].classList.remove('frog');
    currentIndex += 1;
    squares[currentIndex].classList.add('frog');
  }
}

function moveWithLogRight() {
  if(currentIndex > 18 && currentIndex <= 26) {
    squares[currentIndex].classList.remove('frog');
    currentIndex -= 1;
    squares[currentIndex].classList.add('frog');
  }
}

function movePieces() {
  currentTime--;
  timeLeft.textContent = currentTime;
  autoMoveCars();
  autoMoveLogs();
  moveWithLogLeft();
  moveWithLogRight();
  lose();
}

startBtn.addEventListener('click', () => {
  timerId = setInterval(movePieces, 1000);
  document.addEventListener('keyup', moveFrog);
  startBtn.style.display = 'none';
  pauseBtn.style.display = 'block';
});

pauseBtn.addEventListener('click', () => {
  clearInterval(timerId);
  pauseBtn.style.display = 'none';
  startBtn.style.display = 'block';
  startBtn.textContent = 'continue';
})

restartBtn.addEventListener('click', () => {
  window.location.reload();
  start();
})