// 1. Зробити клік по першій кнопці                             +++
// 2. Збільшити лічильник на одиницю:
//      -збільшувати лічильник (countClick)                     +++
//      -відобразити на екрані в блоці span кількість кліків    +++



let countClick = 0;
let blockCount = document.querySelector("#count");
let btn2 = document.querySelector("#btn2");

console.dir(btn2);

btn2.onclick = function () {
    p2 = document.querySelector("#p2");
    p2.style.background = "red";
    p2.style.color = "blue";
}

console.dir(blockCount);

function btnClick() {
    countClick += 1;
    blockCount.innerText = countClick;
}



    