function Init() {

    console.log('JS IS WORKING!!!');

    var mass = new Array(10).fill(0).map(function(){return new Array(10).fill(0)}); //создаём двумерный массив и заполняем его нулями
    mass = First_generation(mass);
    Print(mass);
    console.log('первоначальный массив');
    console.log(mass);
    console.log('**************************');

    var new_mass = new Array(10).fill(0).map(function(){return new Array(10).fill(0)}); //создаём массив для формирования нового поля итерации

    /*setInterval(function(){

     Scan_mass(mass, new_mass); //сканируем текущее поле и генерим новое
     new_mass.map(function(str, i){mass[i] = str.slice(0);}); //обновляем данные
     new_mass.map(function(str){str.fill(0);}); //обнуляем временную память
     Print(mass);
     console.log('новый массив');
     console.log(mass);
     console.log('**************************');

     }, 1000);*/

}

function Klick() {
    var elems = document.getElementById('lifegame').getElementsByTagName('*'); //получаем ХТМЛКолекцию внутренностей рожительского дива
    console.log('сканированный с дома массив в виде HTMLCollection ');
    console.log(elems);
    console.log('**************************');
    var mass = Array.prototype.slice.call(elems); //конвертирует массив HTMLColletion в строку
    console.log('преобразованнй в массив, который сосканировали');
    console.log(mass);
    console.log('**************************');

 /*******для примера************************************************************************************************
    var masss = mass.reduce(function (previousValue, currentValue, index) { //переделываем строку в двумерный массив для примеры массивы будет состоять из имён тэгов
        console.log('l=' + previousValue.length + ' index=' + index);
        console.log('pV=' + previousValue);
        console.log('cV=' + currentValue.tagName);
        return  (currentValue.tagName == 'BR'
                    ? previousValue.push([])
                    : previousValue.length == 0 ? previousValue.push([currentValue.tagName])
                                                : previousValue[previousValue.length-1].push(currentValue.tagName)
                ) && previousValue;
    }, [] );*!/
/!*
mass.reduce((previousValue, currentValue, index){..},[] бежим по массиву, [] в конце нужен чтобы перебор начинался с первого
элемента. //currentValue.tagName == 'BR'// -- если текущий элемент это пробел, то в аккумулятор толкаем новый пустой
элемент(//previousValue.push([])//). //previousValue.length == 0// -- коли это не пробел, то тут такое дело: Если
это первая итерация, то аккумулятор пуст, инициирован, но пуст. Обрати внимание на //previousValue[previousValue.length-1].push(currentValue.tagName)//
строку - здесь творится хрень - Вычисляем длину аккумулятора(при первой итерации будет 0) length -1 = -1. Т.е. при первой
итерации эта строка будет пытаться запушить в несуществующий элемент и естественно это  вызывет ошибку. Именно поэтому
нам необходимо второе тернарное выражение (//previousValue.length == 0//)(простые If не канает, т.к. обработчик ожидает
выражение).  //previousValue.length == 0// строка работает следующим образом: коли это не пробел, но, блин, это первая
итерация, то  в пустой аккумулятор суём перевый НЕ пробел, в нашем случе div(//previousValue.push([currentValue.tagName]//).,
тем самым создаём первый элемент, чтобы при следующих  итерациях длина аккумулятора была не 0.
строка //)&& previousValue// - ХБЗ. без этого причиндала функция push внутри конструкции reduce не работет. Если ты
читаешь это и знаешь ответ - ДОПИШИ,  ибо на изучение этой грёбанной конструкции ушла целая, мать его, неделя.
***************************************************************************************************************************************/

    mass = mass.reduce(function (previousValue, currentValue) { //переделываем строку в двумерный массив, выдираем имена классов
        return  (currentValue.tagName == 'BR'
                    ? previousValue.push([])
                    : previousValue.length == 0 ? previousValue.push([currentValue.className.split(' ')[1]])
                            : previousValue[previousValue.length-1].push(currentValue.className.split(' ')[1])
            ) && previousValue;
    }, [] );
    console.log('преобразованный в двумерный массив особым образов');
    console.log(mass);
    console.log('**************************');

    mass = mass.map(function(str){ //преобразовываем в массив 1   0
        return str.map(function(elem){
            if(elem == 'life') return 1;
            else return 0;
        });
    });
    console.log('массив в окончательном виде');
    console.log(mass);
    console.log('**************************');

    var new_mass = new Array(10).fill(0).map(function(){return new Array(10).fill(0)}); //создаём массив для формирования нового поля итерации
    Scan_mass(mass, new_mass); //сканируем текущее поле и генерим новое
    new_mass.map(function(str, i){mass[i] = str.slice(0);}); //обновляем данные
    new_mass.map(function(str){str.fill(0);}); //обнуляем временную память
    Print(mass);
    console.log('новый массив');
    console.log(mass);
    console.log('**************************');
}

function Scan_mass(mass, new_mass) { //сканируем и генерим следующее поле
    mass.map(function (str, i){
        str.map(function(el, j){Scan_el(mass, new_mass, el, i, j)
        });
    });
    return new_mass;
}

function Scan_el(mass, new_mass, el, i, j) {
    var k = 0;
    //console.log('******начало итерации*******');
    //console.log('i=' + i + ' j=' +j);
    [i - 1, i, i + 1].map(function(y) { //перебираем строки вокруг исследуемого элемента
        if (y < 0) y = mass.length - 1; //если сканируемый элемент находится на верхней строке, значит соседняя сверху строка будет крайней нижней
        else if (y == mass.length) y = 0;//если сканируемы элемент находится на нижней строке, значит соседняя снизу строка будет крайней верхней
        [j-1, j, j+1].map(function(x){ //перебираем соседние элементы опираясь на одну перебираемых соседних строк
            if(i != y || j != x) { //а вдруг выбранный элемент и есть сканируемый? ну так нахрен он тогда нам нужен
                if (x < 0) x = mass[y].length - 1;//если сканируемы элемент находится на левой стенке, значит соседний слева элемент будет находится на правой стенке
                else if (x == mass[y].length) x = 0;//если сканируемы элемент находится на правой стенке, значит соседний справа элемент будет находится на левой стенке
                if(mass[y][x] == 1) k++;
            }
        });
    });
    //console.log('**k=' + k + '**конец итерации*******');
    Edit_mass(mass, new_mass, k, i, j);
}


// переменная k будет использоваться для подсчёта колличества живых ячеек вокруг иследуемой


function First_generation(mass) { //задаём первоначально живые ячейки
//    mass[3][3] = mass[3][4] = mass[3][5] = mass[4][3] = mass[4][4] = mass[4][5] = mass[5][3] = mass[5][4] = mass[5][5] = 1;
//    mass[3][3] = mass[4][3] = mass[5][3] = mass[4][4] = mass[5][4] = mass[5][5] = mass[4][2] = 1;
//    mass[3][3] = mass[3][5] = mass[4][4] = mass[4][5] = mass[5][4] = 1;
    mass[0][9] = mass[9][9] = mass[2][1] = mass[0][0] = mass[1][9] = mass[1][0] = mass[0][1] = mass[9][0] =1;
    return mass;
}

function Edit_mass(mass, new_mass, k, i, j) {
    switch (true) {
        case k > 3 || k < 2:
            new_mass[i][j] = 0;
            return new_mass;
            break;
        case k == 2:
            new_mass[i][j] = mass[i][j];
            return new_mass;
            break;
        case k == 3:
            new_mass[i][j] = 1;
            return new_mass;
            break;
    }
    return new_mass;
}

//Init();
window.onload = function() { Init();} //для работы в консоли строку коментим и убираем коментрарий с Init();

function Print(mass) { //функция вывода результата на страницу

    var lifegame = document.getElementById('lifegame');  //ищем элемент в котором ячейки с полем
//    console.log(lifegame.getAttribute('id'));
    lifegame.innerHTML = '';                            //удаляем все дочерние элементы

    mass.map(function(str, index, matrix) {
       str.map(function(elem){
           var child_div = document.createElement('div');
           child_div.className = 'elem';

           if(elem == 0) child_div.className += ' notlife';
           if(elem != 0) child_div.className += ' life';

           document.getElementById('lifegame').appendChild(child_div);
       });
        if(matrix.length -1 != index) { //нужно чтобы вконце матрицы не появился пробел
            var br = document.createElement('br'); //создаем переход на новую строку
            document.getElementById('lifegame').appendChild(br);
        }
    });
}
