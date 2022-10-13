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
const score = 10;
const gameArea = document.querySelector('.game-area');


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

function createDuck(left, type) {
  let duck = document.createElement('div');
  duck.className = 'duck ' + type + '-duck-left'
  duck.style.top = '100%';
  duck.style.left = left;

  gameArea.appendChild(duck);
  moveDuck(duck, type);
}

createDuck(getRandom(0, 100) + '%', "black");
createDuck(getRandom(0, 100) + "%", "red");
createDuck(getRandom(0, 100) + "%", "red");

function moveDuck(duck, type) {
  let imageDuck = 0;
  let direction = directionStart(duck);
  let timerId = setInterval(function () {
              // console.dir(duck.offsetLeft);
          if (imageDuck < 2) {
            imageDuck += 1;
          } else if (imageDuck === 2) {
            imageDuck = 0;
    }
    
    switch (direction) {
      case "top-left":
        moveTopLeft(duck, type, imageDuck);
        break;
      case "top-right":
        moveTopRight(duck, type, imageDuck);
        break;
      case "right":
        moveRight(duck, type, imageDuck);
        break;
      case "left":
        moveLeft(duck, type, imageDuck);
        break;
      case "down-left":
        moveDownLeft(duck, type, imageDuck);
        break;
      case "down-right":
        moveDownRight(duck, type, imageDuck);
        break;
      default:
        moveTopLeft(duck, type, imageDuck);
        break;
    }

    // moveTopRight(duck, type, imageDuck);

      if (duck.offsetLeft < 0) {
          clearInterval(timerId);
      }
  }, 100);
}

function directionStart(duck) {
  let direction = "top-left";
  let body = document.querySelector('body');

  if (duck.offsetLeft <= body.clientWidth / 2) {
    direction = "top-right";
  }  


  return direction;
}

/*
1. Функція змінює картинку
2. Функція змінює напрям
*/

function moveLeft(duck, type, imageDuck) {
  duck.style.backgroundImage = "url(assets/images/duck/" + type + "/left/" + imageDuck + ".png)";
  duck.style.left = duck.offsetLeft - score + "px";
}

function moveRight(duck, type, imageDuck) {
  duck.style.backgroundImage =
    "url(assets/images/duck/" + type + "/right/"  + imageDuck + ".png)";
  duck.style.left = duck.offsetLeft + score + "px";
}

function moveTopLeft(duck, type, imageDuck) {
  duck.style.backgroundImage =
    "url(assets/images/duck/" + type + "/top-left/" + imageDuck + ".png)";
  duck.style.left = duck.offsetLeft - score + "px";
  duck.style.top = duck.offsetTop - score + "px";
}

function moveTopRight(duck, type, imageDuck) {
  duck.style.backgroundImage =
    "url(assets/images/duck/" + type + "/top-right/" + imageDuck + ".png)";
  duck.style.left = duck.offsetLeft + score + "px";
  duck.style.top = duck.offsetTop - score + "px";
}

function moveDownLeft(duck, type, imageDuck) {
  duck.style.backgroundImage =
    "url(assets/images/duck/" + type + "/top-left/" + imageDuck + ".png)";
  duck.style.left = duck.offsetLeft - score + "px";
  duck.style.top = duck.offsetTop + score + "px";
}

function moveDownRight(duck, type, imageDuck) {
  duck.style.backgroundImage =
    "url(assets/images/duck/" + type + "/top-right/" + imageDuck + ".png)";
  duck.style.left = duck.offsetLeft + score + "px";
  duck.style.top = duck.offsetTop + score + "px";
}

function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}