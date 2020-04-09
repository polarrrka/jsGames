const cardArray = [
    {
      name: 'avocado',
      img: 'img/avocado.jpg'
    },
    {
      name: 'avocado',
      img: 'img/avocado.jpg'
    },
    {
      name: 'cake',
      img: 'img/cake.jpg'
    },
    {
      name: 'cake',
      img: 'img/cake.jpg'
    },
    {
      name: 'donut',
      img: 'img/donut.jpg'
    },
    {
      name: 'donut',
      img: 'img/donut.jpg'
    },
    {
      name: 'pancakes',
      img: 'img/pancakes.jpg'
    },
    {
      name: 'pancakes',
      img: 'img/pancakes.jpg'
    },
    {
      name: 'pizza',
      img: 'img/pizza.jpg'
    },
    {
      name: 'pizza',
      img: 'img/pizza.jpg'
    },
    {
      name: 'taco',
      img: 'img/taco.jpg'
    },
    {
      name: 'taco',
      img: 'img/taco.jpg'
    }, 
  ];

  cardArray.sort(() => 0.5 - Math.random());

  const grid = document.querySelector('.grid');
  const resultDisplay = document.querySelector('#result');
  
  let cardsChosen = [];
  let cardsChosenId = [];
  let cardsWon = [];

  function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
      const card = document.createElement('img');
      card.setAttribute('src', 'img/front.jpg');
      card.setAttribute('data-id', i);
      card.addEventListener('click', flipCard);
      card.style.border = '0.5px inset grey';
      grid.appendChild(card);
    }
  }

  function flipCard() {
    const cardId = this.getAttribute('data-id');
    const blank = this.getAttribute('src');
    if (blank === 'img/white.jpg') {
      return false;
    }
    cardsChosen.push(cardArray[cardId].name);
    cardsChosenId.push(cardId);
    this.setAttribute('src', cardArray[cardId].img);
    if (cardsChosen.length === 2) {
      setTimeout(checkForMatch, 500);
    }
  }

  function checkForMatch() {
    const cards = document.querySelectorAll('img');
    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];
    if (cardsChosen[0] === cardsChosen[1] && cardsChosenId[0] !== cardsChosenId[1]) {
      matchAlert('match!', 'alert alert-success');
      cards[optionOneId].setAttribute('src', 'img/white.jpg');
      cards[optionTwoId].setAttribute('src', 'img/white.jpg');
      cardsWon.push(cardsChosen);
      cardsChosen = [];
      cardsChosenId = [];
    } else {
      matchAlert('try again!', 'alert alert-danger');
      cards[optionOneId].setAttribute('src', 'img/front.jpg');
      cards[optionTwoId].setAttribute('src', 'img/front.jpg');
      cardsChosen = [];
      cardsChosenId = [];
    }

    resultDisplay.textContent = cardsWon.length;

    if (cardsWon.length === cardArray.length/2) {
      resultDisplay.textContent = `congrats!`;
      const button = document.createElement('button');
      button.textContent = 'try again!';
      button.classList = 'btn btn-dark m-2'
      resultDisplay.appendChild(button);
      button.addEventListener('click', () => window.location.reload());
    }
  }

  function matchAlert(msg, className) {
    const alertMsg = document.createElement('div');
    const div = document.querySelector('#alert');
    div.appendChild(alertMsg);
    alertMsg.textContent = msg;
    alertMsg.classList = className;
    setTimeout(() => alertMsg.remove(), 600);
  }
  
  createBoard();
