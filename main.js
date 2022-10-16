'use strict'

// 1. Зробити клік по першій кнопці                             +++
// 2. Збільшити лічильник на одиницю:
//      -збільшувати лічильник (countClick)                     +++
//      -відобразити на екрані в блоці span кількість кліків    +++



// let countClick = 0;
// let blockCount = document.querySelector("#count");
// let btn2 = document.querySelector("#btn2");

// console.dir(btn2);

// btn2.onclick = function () {
//     p2 = document.querySelector("#p2");
//     p2.style.background = "red";
//     p2.style.color = "blue";
// }

// console.dir(blockCount);

// function btnClick() {
//     countClick += 1;
//     blockCount.innerText = countClick;
// }

/*
1. Вибрати аудіо тег
2. Вибрати кнопку
3. Зробити клік по кнопці
4. При кліці включити музику
*/

// let audioGun = document.querySelector("#audioGun");
// console.dir(audioGun);
// let btn3 = document.querySelector("#btn3");

// btn3.onclick = function () {
//     audioGun.play();
// }
    

/* plan day2
1. Обрати качку і помістити в змінну                +++
2. Навчитися змінювати позицію качки                +++
3. Навчитися змінювати картинку качки               +++
    - якщо картинки немає ставити лічильнику 0      +++
4. Навчитися рухати качку по таймеру                +++
5. Навчитися обмежувати координати руху качки       +++
*/

// let duck = document.querySelector('.duck')

// let imageDuck = 0;

// document.onclick = function () {
//     console.dir(duck.offsetLeft);
//     if (imageDuck < 2) {
//         imageDuck += 1;
//     } else if (imageDuck === 2 ) {
//       imageDuck = 0;
//     }
//     duck.style.backgroundImage = "url(assets/images/duck/black/left/" + imageDuck + ".png)";
//     duck.style.left = duck.offsetLeft - 10 + "px";
// }

// let timeId = setInterval(function() {
//         console.dir(duck.offsetLeft);
//         if (imageDuck < 2) {
//           imageDuck += 1;
//         } else if (imageDuck === 2) {
//           imageDuck = 0;
//         }
//         duck.style.backgroundImage =
//           "url(assets/images/duck/black/left/" + imageDuck + ".png)";
//     duck.style.left = duck.offsetLeft - 10 + "px";
    
//     if (duck.offsetLeft < 0) {
//         clearInterval(timeId);
//     }

// }, 100);


/* plan day2-2
1. Створити три качки                                                   +++
        <div class="duck black-duck-left" style="left: 40%;"></div>
2. Зробити випадковий рух качки
        зробити виліт качак з випадкового місця                         +++
        зробити випадковий напрям руху качки
            ліво
            право
            ліво-верх
            ліво-низ
            право-верх
            право-низ
3. Коли качка долітаю до будь-якої границі змінити напрям               
4.                 
5.       
*/
let scores = 0;
const speed = 10;
let bullet = 5;
const gameArea = document.querySelector('.game-area');
const scoresBlock = document.querySelector('.scores');
const audioGun = document.querySelector('#audioGun');
let level = 1;
let dead = 0;
let free = 0;


// function createDuck(top, left, type) {
//     let duck =
//       '<div class="duck ' +
//       type +
//       '-duck-left" style="left: ' +
//       left +
//       ";top: " +
//       top +
//       '"></div>';
//     gameArea.innerHTML = gameArea.innerHTML + duck;
// }

function createDuck() {
  let duck = document.createElement('div');
  let type = getRandomInt(0, 2);
  

      if (type == 0) {
        type = "black";
      } else {
        type = "red";
  }

  let timerId = moveDuck(duck, type);
  
  duck.className = 'duck ' + type + '-duck-left';
  duck.style.top = '100%';
  duck.style.left = getRandomInt(0, 100) + "%";
  duck.dataset.timer = timerId;

  gameArea.appendChild(duck);
  // moveDuck(duck, type);
  
}


function start() {
  bullet = level * 3;
  let i = 0;

  while (i < bullet) {
    createBullet();
    createDuck();
    
    i += 1;
  }
}

function createBullet() {
  let bulletBlock = document.querySelector(".bullets-container");
  let bullet = document.createElement('div');
  bullet.className = 'bullet';

  bulletBlock.appendChild(bullet);  
}

start();

// createDuck(getRandom(0, 100) + '%', "black");
// createDuck(getRandom(0, 100) + "%", "red");
// createDuck(getRandom(0, 100) + "%", "red");

gameArea.onclick = function (e) {
  if (bullet > 0) {
    audioGun.play();

    bullet -= 1;

    let oneBulletBlock = document.querySelector('.bullets-container div');
        oneBulletBlock.remove()

    if (e.target.classList.contains("duck") == true &&
      e.target.classList.contains("shot") == false
    ) {
      scores += 100;
      scoresBlock.innerText = scores;

      shotDuck(e.target);

      clearInterval(e.target.dataset.timer);
    }
  } else {
    nextStep();
  }
}



function shotDuck(duck) {
    
  let type;
  if (duck.classList.contains(".red-duck-left")) {
    type = "red";
  } else {
    type = "black";
  }
  duck.classList.add("shot");
  duck.style.backgroundImage = "url(assets/images/duck/" + type + "/shot/0.png)";

  setTimeout(function () {
    deadDuck(duck, type);
  }, 1000)
  
}

function deadDuck(duck, type) {
  dead += 1;
  let imageDuck = 0;

  let timerId = setInterval(function () {
    imageDuck += 1;

    if (imageDuck > 2) {
        imageDuck = 0;
    }

    duck.style.backgroundImage = "url(assets/images/duck/" + type + "/dead/" + imageDuck + ".png)";
    duck.style.top = duck.offsetTop + speed + "px";
    
    if (duck.offsetTop >= document.body.clientHeight) {
      clearInterval(timerId);
      duck.remove();
    }
  }, 20)
}

function moveDuck(duck, type) {
  let imageDuck = 0;
  let direction = directionStart(duck);
  let move = true;

  let timerId = setInterval(function () {
    imageDuck += 1;

    if (imageDuck > 2)  {
        imageDuck =0;
    }
    
    if (move == false) {

      direction = changeDirection(direction);
      move = true;

    }
           
    switch (direction) {
      case "top-left":
        move = moveTopLeft(duck, type, imageDuck);
        break;
      case "top-right":
        move = moveTopRight(duck, type, imageDuck);
        break;
      case "right":
        move = moveRight(duck, type, imageDuck);
        break;
      case "left":
        move = moveLeft(duck, type, imageDuck);
        break;
      case "down-left":
        move = moveDownLeft(duck, type, imageDuck);
        break;
      case "down-right":
        move = moveDownRight(duck, type, imageDuck);
        break;
      default:
        move = moveTopLeft(duck, type, imageDuck);
        break;
    }

  }, 50);

  return timerId;
}

function directionStart(duck) {
  let direction = "top-left";
  let body = document.querySelector('body');

  if (duck.offsetLeft <= body.clientWidth / 2) {
    direction = "top-right";
  }  

  return direction;
}

function changeDirection(before) {
  let random = getRandomInt(0, 6);
  let direction = null;

  switch (random) {
    case 0:
      direction = "top-right";
      break;
    case 1:
      direction = "top-left";
      break;
    case 2:
      direction = "right";
      break;
    case 3:
      direction = "left";
      break;
    case 4:
      direction = "down-left";
      break;
    case 5:
      direction = "down-right";
      break;
    default:
      direction = "top-left";
      break;
  }

  if (direction == before) {
    changeDirection(before);
  } else {
    return direction;
  }
}

/*
1. Функція змінює картинку
2. Функція змінює напрям
3. Прописати перквірки границь
*/

function moveLeft(duck, type, imageDuck) {
  duck.style.backgroundImage = "url(assets/images/duck/" + type + "/left/" + imageDuck + ".png)";
  duck.style.left = duck.offsetLeft - speed + "px";
  if (duck.offsetLeft <=  0) {
    return false;
  }
  return true;
}

function moveRight(duck, type, imageDuck) {
  duck.style.backgroundImage =
    "url(assets/images/duck/" + type + "/right/"  + imageDuck + ".png)";
  duck.style.left = duck.offsetLeft + speed + "px";
  if (duck.offsetLeft + duck.clientWidth >= document.body.clientWidth -10) {
    return false;
  }
  return true;
}

function moveTopLeft(duck, type, imageDuck) {
  duck.style.backgroundImage =
    "url(assets/images/duck/" + type + "/top-left/" + imageDuck + ".png)";
  duck.style.left = duck.offsetLeft - speed + "px";
  duck.style.top = duck.offsetTop - speed + "px";

  if (duck.offsetLeft <= 10 || duck.offsetTop <= 10) {
    return false;
  }
  return true;
}

function moveTopRight(duck, type, imageDuck) {
  duck.style.backgroundImage =
    "url(assets/images/duck/" + type + "/top-right/" + imageDuck + ".png)";
  duck.style.left = duck.offsetLeft + speed + "px";
  duck.style.top = duck.offsetTop - speed + "px";
  if (
    duck.offsetLeft + duck.clientWidth>= document.body.clientWidth - 10 ||
    duck.offsetTop <= 10
  ) {
    return false;
  }
  return true;
}

function moveDownLeft(duck, type, imageDuck) {
  duck.style.backgroundImage = "url(assets/images/duck/" + type + "/top-left/" + imageDuck + ".png)";
  duck.style.left = duck.offsetLeft - speed + "px";
  duck.style.top = duck.offsetTop + speed + "px";
    if (
      duck.offsetLeft <= 10 ||
      duck.offsetTop >= gameArea.clientHeight - 10
    ) {
      return false;
    }
    return true;
}

function moveDownRight(duck, type, imageDuck) {
  duck.style.backgroundImage = "url(assets/images/duck/" + type + "/top-right/" + imageDuck + ".png)";
  duck.style.left = duck.offsetLeft + speed + "px";
  duck.style.top = duck.offsetTop + speed + "px";
  if (
    duck.offsetLeft + duck.clientWidth >= document.body.clientWidth -10  ||
    duck.offsetTop >= gameArea.clientHeight
  ) {
    return false;
  }
  return true;
}
function moveTop(duck, type, imageDuck) {
  duck.style.backgroundImage = "url(assets/images/duck/" + type + "/top-left/" + imageDuck + ".png)";
  duck.style.top = duck.offsetTop - speed + "px";

  if (duck.offsetTop + duck.clientHeight <= 0) {
    return false;
  }
  return true;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min) + min);
}

/*
1. коли нема пуль всі качки полктіли вгору
2. перерахувати не вбитих качок
3. рахувати кількість вбитих качок
4. новий рівень
*/


let next = false;
function nextStep() {
  if (next == false) {
    next = true;
    let ducks = document.querySelectorAll('.duck');
    let ducksDead = document.querySelectorAll('.duck.shot')

  if (ducks.length > 0) {
    let i = 0;
    free = ducks.length - ducksDead.length;
    if (free < 0) {
      free *= -1;
    }

    while (i < ducks.length) {
      let duck = ducks[i];
      // free += 1;
      let type = 'black';

      if (duck.classList.contains('.red-duck-left')) {
        type = 'red';
      }
      let move = true;
      clearInterval(duck.dataset.timer);
      let imageDuck = 0;
      let timeId = setInterval(function () {
        move = moveTop(duck, type, imageDuck);
        imageDuck += 1;
        if (imageDuck > 2) {
          imageDuck = 0;
        }
        
        if (move == false) {
          clearInterval(timeId);
          duck.remove();
        }
      }, 30)
      
      i += 1;
    }
    }
    diedIconDuck();
    freeIconDuck();
    setTimeout(function () {
      next = false;
      nextLevel();
    }, 4000);
  }
}

function nextLevel() {
  level += 1;
  start();
}


function diedIconDuck() {
  let i = 0;
  let diedBlock = document.querySelector('.died-ducks-cnt-container');
  diedBlock.innerText = '';

  while (i < dead) {
    let div = document.createElement('div');
    div.className = 'died-duck-icon';
    diedBlock.appendChild(div);
    i += 1;
  }
}

function freeIconDuck() {
    let i = 0;
    let freeBlock = document.querySelector(".left-ducks-cnt-container");
    freeBlock.innerText = "";
  while (i < free) {
    let div = document.createElement("div");
    div.className = "left-duck-icon";
    freeBlock.appendChild(div);
    i += 1;
  }
}