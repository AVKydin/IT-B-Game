// 1. Зробити клік по першій кнопці                             +++
// 2. Збільшити лічильник на одиницю:
//      -збільшувати лічильник (countClick)                     +++
//      -відобразити на екрані в блоці span кількість кліків    +++



let countClick = 0;
let blockCount = document.querySelector("#count");


console.dir(blockCount);

function btnClick() {
    countClick += 1;
    blockCount.innerText = countClick;
}



    