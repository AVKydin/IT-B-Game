// 1. Зробити клік по першій кнопці                             +++
// 2. Збільшити лічильник на одиницю:
//      -збільшувати лічильник (countClick)                     +++
//      -відобразити на екрані в блоці span кількість кліків    +++



let countClick = 0;
let blockCount = document.querySelector("#count");
let btn2 = document.querySelector("#btn2");

// console.dir(btn2);

btn2.onclick = function () {
    p2 = document.querySelector("#p2");
    p2.style.background = "red";
    p2.style.color = "blue";
}

// console.dir(blockCount);

function btnClick() {
    countClick += 1;
    blockCount.innerText = countClick;
}

/*
1. Вибрати аудіо тег
2. Вибрати кнопку
3. Зробити клік по кнопці
4. При кліці включити музику
*/

let audioGun = document.querySelector("#audioGun");
// console.dir(audioGun);
let btn3 = document.querySelector("#btn3");

btn3.onclick = function () {
    audioGun.play();
}
    