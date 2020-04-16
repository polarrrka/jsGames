const squares = document.querySelectorAll('.grid div'),
      resultDisplay = document.querySelector('#result');

let width = 15,
    currentShooterIndex = 202,
    currentInvaderIndex = 0,
    invadersTakenDown = [],
    result = 0,
    direction = 1,
    invaderId;

const invaders = [
  0,1,2,3,4,5,6,7,8,9,
  15,16,17,18,19,20,21,22,23,24,
  30,31,32,33,34,35,36,37,38,39
];

invaders.forEach(invader => squares[currentInvaderIndex + invader].classList.add('invader'))

squares[currentShooterIndex].classList.add('shooter')

function moveShooter(e) {
  squares[currentShooterIndex].classList.remove('shooter')
  switch(e.keyCode) {
    case 37:
      if(currentShooterIndex % width !== 0)
      currentShooterIndex -= 1;
      break;
    case 39:
      if(currentShooterIndex % width < width - 1)
      currentShooterIndex += 1;
      break;
  }
  squares[currentShooterIndex].classList.add('shooter')
}

document.addEventListener('keydown', moveShooter);

function moveInvaders() {
  const leftEdge = invaders[0] % width === 0;
  const rightEdge = invaders[invaders.length - 1] % width === width - 1;

  if((leftEdge && direction === - 1) || (rightEdge && direction === 1)) {
    direction = width;
  } else if(direction === width) {
    if(leftEdge)
    direction = 1;
    else direction = - 1;
  }

  for(let i = 0; i <= invaders.length -1; i++) {
    squares[invaders[i]].classList.remove('invader');
  }
  for(let i = 0; i <= invaders.length -1; i++) {
    invaders[i] += direction;
  }
  for(let i = 0; i <= invaders.length - 1; i++) {
    if(!invadersTakenDown.includes(i)) {
      squares[invaders[i]].classList.add('invader')
    }
  }

  //game over
  if(squares[currentShooterIndex].classList.contains('invader', 'shooter')) {
    resultDisplay.textContent = 'game over';
    squares[currentShooterIndex].classList.add('boom');
    clearInterval(invaderId);
  }
  for(let i = 0; i <= invaders.length - 1; i++) {
    if(invaders[i] > (squares.length - (width - 1))) {
      resultDisplay.textContent = 'game over';
      clearInterval(invaderId);
    }
  }
  if(invadersTakenDown.length === invaders.length) {
    resultDisplay.textContent = 'you win';
    clearInterval(invaderId);
  }
}

invaderId = setInterval(moveInvaders, 500);

function shoot(e) {
  let laserId;
  let currentLaserIndex = currentShooterIndex;

  function moveLaser() {
    squares[currentLaserIndex].classList.remove('laser');
    currentLaserIndex -= width;
    squares[currentLaserIndex].classList.add('laser');
    if(squares[currentLaserIndex].classList.contains('invader')) {
      squares[currentLaserIndex].classList.remove('laser');
      squares[currentLaserIndex].classList.remove('invader');
      squares[currentLaserIndex].classList.add('boom');
      
      setTimeout(() => squares[currentLaserIndex].classList.remove('boom'), 250);
      clearInterval(laserId);

      const invTakenDown = invaders.indexOf(currentLaserIndex);
      invadersTakenDown.push(invTakenDown);
      result++;
      resultDisplay.textContent = result;
    }
    if(currentLaserIndex < width) {
      clearInterval(laserId);
      setTimeout(() => squares[currentLaserIndex].classList.remove('laser'), 1000);
    }
  }
/*   document.addEventListener('keyup', e => {
    if(e.keyCode === 32) {
      laserId = setInterval(moveLaser, 100);
    }
  }) */
  switch(e.keyCode) {
    case 32: 
      laserId = setInterval(moveLaser, 100);
    break;
  }
}

document.addEventListener('keyup', shoot);