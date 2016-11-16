function Init() {

    console.log('JS IS WORKING!!!');

    var mass = new Array(10).fill(0).map(function(){return new Array(10).fill(0)}); //создаЄм двумерный массив и заполн€ем его нул€ми
    mass = First_generation(mass);
    Print(mass);
    console.log(mass);
    console.log('**************************');

    /*var new_mass = new Array(10).fill(0).map(function(){return new Array(10).fill(0)}); //создаЄм массив дл€ формировани€ нового пол€ итерации

    setInterval(function(){

        new_mass = Scan_mass(mass, new_mass); //сканируем текущее поле и генерим новое
        new_mass.map(function(str, i){mass[i] = str.slice(0);}); //обновл€ем данные
        new_mass.map(function(str){str.fill(0);}); //обнул€ем временную пам€ть
        Print(mass);
        console.log(mass);
        console.log('**************************');

    }, 1000);*/
}

function Klick() {
    //var elems = document.getElementById('lifegame').childNodes;
    var elems = document.getElementById('lifegame').getElementsByTagName('*');
    var mass = Array.prototype.slice.call(elems);
    console.log(mass);

    var XXX = ["asdasd", "dfasfs"];
    var YYY = XXX.push("dfgdfgsd");
    console.log("XXX=" + XXX + " YYY=" + YYY);

    /*var sum = mass.reduce(function (previousValue, currentValue, index) {
        console.log('l=' + previousValue.length + ' index=' + index);
        console.log('pV=' + previousValue);
        console.log('cV=' + currentValue.tagName);
        return (
                (currentValue.tagName == 'BR')||(previousValue.length == 0)
                    ? (previousValue.push([]))
                    : (previousValue[previousValue.length-1].push(currentValue.tagName))) && previousValue;
    }, [] );

    console.log(sum);*/
    console.log('**************************');


    /*var masss = mass.reduce(function (rows, key, index) {
        return (index % 3 == 0 ? rows.push([key])
                : rows[rows.length-1].push(key)) && rows;
    }, []);*/
}

function Scan_mass(mass, new_mass) { //сканируем и генерим следующее поле
    mass.map(function (str, i){
        str.map(function(el, j){Scan_el(mass, new_mass,el, i, j)
        });
    });
    return new_mass;
}

function Scan_el(mass, new_mass, el, i, j) {
//    console.log('element=' + el + ' i=' + i + ' j =' + j); //переменна€ к счЄтчик живых €чеек вокруг исследуемой €чейки
    switch (true) { //определ€ем зону нахождени€ €чейки(пограничность, внутри массива или в углу) ¬ зависимости от зоны нахождени€ €чейки, алгоритм анализа соседей разный
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
// переменна€ k будет использоватьс€ дл€ подсчЄта колличества живых €чеек вокруг иследуемой

function Inner_element(mass, el, i, j) {
//    console.log('Inner_element');
    var k = 0;
    for(var y = i-1; y <= i+1; y++) {
        for(var x = j-1; x <= j+1; x++){
            if(y != i || x != j) { //≈сли рассматриваемый элемент данной минизоны(3 на 3) не находитс€ посередине, то анализируем дальше
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

function First_generation(mass) { //задаЄм первоначально живые €чейки
//    mass[3][3] = mass[3][4] = mass[3][5] = mass[4][3] = mass[4][4] = mass[4][5] = mass[5][3] = mass[5][4] = mass[5][5] = 1;
//    mass[3][3] = mass[4][3] = mass[5][3] = mass[4][4] = mass[5][4] = mass[5][5] = mass[4][2] = 1;
    mass[3][3] = mass[3][5] = mass[4][4] = mass[4][5] = mass[5][4] = 1;
    return mass;
}

function Edit_mass(mass, new_mass, k, i, j) {
    switch (true) { //определ€ем зону нахождени€ €чейки(пограничность, внутри массива или в углу)
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
window.onload = function() { Init();} //дл€ работы в консоли строку коментим и убираем коментрарий с Init();

function Print(mass) { //функци€ вывода результата на страницу

    var lifegame = document.getElementById('lifegame');  //ищем элемент в котором €чейки с полем
//    console.log(lifegame.getAttribute('id'));
    lifegame.innerHTML = '';                            //удал€ем все дочерние элементы

    mass.map(function(str) {
       str.map(function(elem){
           var child_div = document.createElement('div');
           child_div.className = 'elem';

           if(elem == 0) child_div.className += ' notlife';
           if(elem != 0) child_div.className += ' life';

           document.getElementById('lifegame').appendChild(child_div);
       });
        var br = document.createElement('br'); //создаем переход на новую строку
        document.getElementById('lifegame').appendChild(br);
    });
}
