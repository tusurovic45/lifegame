function Init() {

    console.log('JS IS WORKING!!!');

    var mass = new Array(10).fill(0).map(function(){return new Array(10).fill(0)}); //создаём двумерный массив и заполняем его нулями
    mass = First_generation(mass);
    Print(mass);
    console.log(mass);
    console.log('**************************');

    /*var new_mass = new Array(10).fill(0).map(function(){return new Array(10).fill(0)}); //создаём массив для формирования нового поля итерации

    setInterval(function(){

        new_mass = Scan_mass(mass, new_mass); //сканируем текущее поле и генерим новое
        new_mass.map(function(str, i){mass[i] = str.slice(0);}); //обновляем данные
        new_mass.map(function(str){str.fill(0);}); //обнуляем временную память
        Print(mass);
        console.log(mass);
        console.log('**************************');

    }, 1000);*/
}

function Klick() {
    //var elems = document.getElementById('lifegame').childNodes;
    var elems = document.getElementById('lifegame').getElementsByTagName('*');
    console.log(elems);
    console.log('**************************');
    var mass = Array.prototype.slice.call(elems); //конвертирует массив HTMLColletion в строку
    console.log(mass);
    console.log('**************************');

    /*var masss = mass.reduce(function (previousValue, currentValue, index) { //переделываем строку в двумерный массив для примеры массивы будет состоять из имён тэгов
        console.log('l=' + previousValue.length + ' index=' + index);
        console.log('pV=' + previousValue);
        console.log('cV=' + currentValue.tagName);
        return  (currentValue.tagName == 'BR'
                    ? previousValue.push([])
                    : previousValue.length == 0 ? previousValue.push([currentValue.tagName])
                                                : previousValue[previousValue.length-1].push(currentValue.tagName)
                ) && previousValue;
    }, [] );*/
/*
mass.reduce((previousValue, currentValue, index){..},[] бежим по массиву, [] нужен чтобы перебор начинался с первого
элемента. строка36 -- если текущий элемент это пробел, то в аккумулятор толкаем новый пустой элемент(строка 37).
строка 38 -- коли это не пробел, то тут такое дело: Если это первая итерация, то аккумулятор пуст, инициирован, но пуст.
Обрати внимание на 39ю стрку. Вычисляем длину аккумулятора(при первой итерации будет 0) length -1 = -1. Т.е. при первой итерации
39 строка будет пытаться запушить в несуществующий элемент и естественно это  вызывет ошибку. Именно поэтому нам необходимо
 второе тернарное выражение (38 строка)(простые If не канает, т.к. обработчик ожидает выражение). 39 строка анализирует:
 коли это не пробел, но блин это первая итерация, то в пустой аккумулятор суём перевый НЕ пробел, в нашем случе div.,
 тем самым создаём первый элемент, чтобы при следующих итерациях длина аккумулятора была не 0. строка 40 - ХБЗ.
 без этого причиндала функция push внутри конструкции reduce не работет. Если ты читаешь это  и знаешь ответ -
 ДОПИШИ,  ибо на изучение этой грёбанной конструкции ушла целая, мать его, неделя.
*/

    var masss = mass.reduce(function (previousValue, currentValue, index) { //переделываем строку в двумерный массив, выдираем имена классов
        //console.log('l=' + previousValue.length + ' index=' + index);
        //console.log('pV=' + previousValue);
        //console.log('cV=' + currentValue.tagName);
        return  (currentValue.tagName == 'BR'
                    ? previousValue.push([])
                    : previousValue.length == 0 ? previousValue.push([currentValue.className.split(' ')[1]])
                    : previousValue[previousValue.length-1].push(currentValue.className.split(' ')[1])
            ) && previousValue;
    }, [] );
    console.log(masss);
    console.log('**************************');

    var massss = masss.map(function(str){
        str.map(function(elem){
            if(elem == 'life') return 1;
            else return 0;
        });
        return str;
    });
    console.log(massss);
    console.log('**************************');
}

function Scan_mass(mass, new_mass) { //сканируем и генерим следующее поле
    mass.map(function (str, i){
        str.map(function(el, j){Scan_el(mass, new_mass,el, i, j)
        });
    });
    return new_mass;
}

function Scan_el(mass, new_mass, el, i, j) {
//    console.log('element=' + el + ' i=' + i + ' j =' + j); //переменная к счётчик живых ячеек вокруг исследуемой ячейки
    switch (true) { //определяем зону нахождения ячейки(пограничность, внутри массива или в углу) В зависимости от зоны нахождения ячейки, алгоритм анализа соседей разный
        case i > 0 && i < 9 && j > 0 && j < 9:
            var k = Inner_element(mass, el, i, j);
            new_mass = Edit_mass(mass, new_mass, k, i, j);
            return new_mass;
            break;
        case i == 0 && j > 0 && j < 9:
            var k = Top_side(mass, el, i, j);
            new_mass = Edit_mass(mass, new_mass, k, i, j);
            return new_mass;
            break;
        case i == 9 && j > 0 && j < 9:
            var k = Bottom_side(mass, el, i, j);
            new_mass = Edit_mass(mass, new_mass, k, i, j);
            return new_mass;
            break;
        case i > 0 && i < 9 && j == 0:
            var k = Left_side(mass, el, i, j);
            new_mass = Edit_mass(mass, new_mass, k, i, j);
            return new_mass;
            break;
        case i > 0 && i < 9 && j == 9:
            var k = Right_side(mass, el, i, j);
            new_mass = Edit_mass(mass, new_mass, k, i, j);
            return new_mass;
            break;
        case i == 0 && j == 0:
            var k = Top_left_angle(mass, el, i, j);
            new_mass = Edit_mass(mass, new_mass, k, i, j);
            return new_mass;
            break;
        case i == 0 && j == 9:
            var k = Top_Right_angle(mass, el, i, j);
            new_mass = Edit_mass(mass, new_mass, k, i, j);
            return new_mass;
            break;
        case i == 9 && j == 9:
            var k = Bottom_right_angle(mass, el, i, j);
            new_mass = Edit_mass(mass, new_mass, k, i, j);
            return new_mass;
            break;
        case i == 9 && j == 0:
            var k = Bottom_left_angle(mass, el, i, j);
            new_mass = Edit_mass(mass, new_mass, k, i, j);
            return new_mass;
            break;
    }
    console.log('******');
}
// переменная k будет использоваться для подсчёта колличества живых ячеек вокруг иследуемой

function Inner_element(mass, el, i, j) {
//    console.log('Inner_element');
    var k = 0;
    for(var y = i-1; y <= i+1; y++) {
        for(var x = j-1; x <= j+1; x++){
            if(y != i || x != j) { //Если рассматриваемый элемент данной минизоны(3 на 3) не находится посередине, то анализируем дальше
                if(mass[y][x] == 1) k++;
            }
        }
    }
//    console.log('k=' + k);
    return k;
}

function Top_side(mass, el, i, j) {
//    console.log('Top_side');
    var k = 0;
    var y = [0 , 1, 9];
    y.forEach(function(y) {
        for (var x = j - 1; x <= j + 1; x++) {
            if (y != i || x != j) {
                if (mass[y][x] == 1) k++;
            }
        }
    });
//    console.log('k=' + k);
    return k;
}

function Bottom_side(mass, el, i, j) {
//    console.log('Bottom_side');
    var k = 0;
    var y = [8, 9 , 0];
    y.forEach(function(y) {
        for (var x = j - 1; x <= j + 1; x++) {
            if (y != i || x != j) {
                if (mass[y][x] == 1) k++;
            }
        }
    });
    return k;
//    console.log('k=' + k);
}

function Left_side(mass, el, i, j) {
//    console.log('Left_side');
    var k = 0;
    var x = [0, 1 , 9];
    for(var y = i-1; y <= i+1; y++) {
        x.forEach(function(x) {
            if (y != i || x != j) {
                if (mass[y][x] == 1) k++;
            }
        });
    }
    return k;
//    console.log('k=' + k);
}

function Right_side(mass, el, i, j) {
//    console.log('Right_side');
    var k = 0;
    var x = [0, 8 , 9];
    for(var y = i-1; y <= i+1; y++) {
        x.forEach(function(x) {
            if (y != i || x != j) {
                if (mass[y][x] == 1) k++;
            }
        });
    }
    return k;
//    console.log('k=' + k);
}

function Top_left_angle(mass, el, i, j) {
//    console.log('Top_left_angle');
    var k = 0;
    var y = [0, 1, 9];
    var x = [0, 1, 9];
    y.forEach(function(y) {
        x.forEach(function(x) {
            if (y != i || x != j) {
                if (mass[y][x] == 1) k++;
            }
        });
    });
    return k;
//    console.log('k=' + k);
}

function Top_Right_angle(mass, el, i, j) {
//    console.log('Top_Right_angle');
    var k = 0;
    var y = [0, 1, 9];
    var x = [0, 8, 9];
    y.forEach(function(y) {
        x.forEach(function(x) {
            if (y != i || x != j) {
                if (mass[y][x] == 1) k++;
            }
        });
    });
    return k;
//    console.log('k=' + k);
}

function Bottom_right_angle(mass, el, i, j) {
//    console.log('Bottom_right_angle');
    var k = 0;
    var y = [0, 8, 9];
    var x = [0, 8, 9];
    y.forEach(function(y) {
        x.forEach(function(x) {
            if (y != i || x != j) {
                if (mass[y][x] == 1) k++;
            }
        });
    });
    return k;
//    console.log('k=' + k);
}

function Bottom_left_angle(mass, el, i, j) {
//    console.log('Bottom_left_angle');
    var k = 0;
    var y = [0, 8, 9];
    var x = [0, 1, 9];
    y.forEach(function(y) {
        x.forEach(function(x) {
            if (y != i || x != j) {
                if (mass[y][x] == 1) k++;
            }
        });
    });
    return k;
//    console.log('k=' + k);
}

function First_generation(mass) { //задаём первоначально живые ячейки
//    mass[3][3] = mass[3][4] = mass[3][5] = mass[4][3] = mass[4][4] = mass[4][5] = mass[5][3] = mass[5][4] = mass[5][5] = 1;
//    mass[3][3] = mass[4][3] = mass[5][3] = mass[4][4] = mass[5][4] = mass[5][5] = mass[4][2] = 1;
    mass[3][3] = mass[3][5] = mass[4][4] = mass[4][5] = mass[5][4] = 1;
    return mass;
}

function Edit_mass(mass, new_mass, k, i, j) {
    switch (true) { //определяем зону нахождения ячейки(пограничность, внутри массива или в углу)
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
