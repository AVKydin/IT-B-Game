// 1. Зробити клік по першій кнопці +++
// 2. Збільшити лічильник на одиницю:
//      -збільшувати лічильник (countClick) +++
//      -відобразити на екрані в блоці span кількість кліків



let countClick = 15;

let text = 'текст';

console.dir(countClick);

countClick += 1;
console.dir(countClick);

console.dir(text);

function btnClick() {
    countClick += 1;
    console.dir(countClick);
}
