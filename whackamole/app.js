const square = document.querySelectorAll('.sqr'),
      mole = document.querySelectorAll('.mole'),
      timeLeft = document.querySelector('#time-left'),
      grid = document.querySelector('.grid'),
      start = document.querySelector('#start'),
      stop = document.querySelector('#stop'),
      buttons = document.querySelector('#buttons');

let score = document.querySelector('#score'),
    result = 0,
    currentTime = timeLeft.textContent,
    timerId = null,
    timer = null;


start.addEventListener('click', () => {
  start.remove();
  moveMole();
  tryAgain();
});
stop.addEventListener('click', () => {
  clearInterval(timerId);
  clearInterval(timer);
  stop.disabled = true;
  grid.style.pointerEvents = 'none';
  resume();
});

function resume() {
  let resume = document.createElement('button');
  resume.textContent = 'continue';
  resume.classList = 'btn btn-info';
  buttons.appendChild(resume);
  resume.addEventListener('click', () => {
    moveMole();
    resume.remove();
    stop.disabled = false;
    grid.style.pointerEvents = '';
  });
}

function randomSquare() {
  square.forEach(className => {
    className.classList.remove('mole');
  });
  let randomPosition = square[Math.floor(Math.random() * 9)];
  randomPosition.classList.add('mole');

  hitPosition = randomPosition.id;
}

square.forEach(id => {
  id.addEventListener('mousedown', () => {  
    if(id.id === hitPosition) {
      result += 1;
      score.textContent = result;
    }
  })
});

function moveMole() {
  timer = setInterval(randomSquare, 500);
  timerId = setInterval(countDown, 1000);
}

function countDown() {
  currentTime--;
  timeLeft.textContent = currentTime;
  if(currentTime === 0) {
    clearInterval(timerId);
    clearInterval(timer);
    grid.style.pointerEvents = 'none';
    endAlert();
    stop.remove();
  }
}

function tryAgain() {
  let again = document.createElement('button');
  again.textContent = 'try again';
  again.classList = 'btn btn-success';
  buttons.appendChild(again);
  again.addEventListener('click', () => window.location.reload());
}

function endAlert() {
    const alertMsg = document.createElement('div');
    const div = document.querySelector('#alert');
    div.appendChild(alertMsg);

    alertMsg.classList = 'alert alert-warning p-2 alert-dismissible fade show';
    alertMsg.innerHTML = `GAME OVER! Your score: ${result}<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>`
    
    setTimeout(() => alertMsg.remove(), 5000);
  }