function Init() {

    console.log('JS IS WORKING!!!');

    var mass = new Array(10).fill(0).map(function(){return new Array(10).fill(0)}); //������ ��������� ������ � ��������� ��� ������
    mass = First_generation(mass);
    Print(mass);
    console.log('�������������� ������');
    console.log(mass);
    console.log('**************************');

//    var new_mass = new Array(10).fill(0).map(function(){return new Array(10).fill(0)}); //������ ������ ��� ������������ ������ ���� ��������


}/*setInterval(function(){

 Scan_mass(mass, new_mass); //��������� ������� ���� � ������� �����
 new_mass.map(function(str, i){mass[i] = str.slice(0);}); //��������� ������
 new_mass.map(function(str){str.fill(0);}); //�������� ��������� ������
 Print(mass);
 console.log(mass);
 console.log('**************************');

 }, 1000);*/

function Klick() {
    var elems = document.getElementById('lifegame').getElementsByTagName('*'); //�������� ������������ ������������� ������������� ����
    console.log('������������� � ���� ������ � ���� HTMLCollection ');
    console.log(elems);
    console.log('**************************');
    var mass = Array.prototype.slice.call(elems); //������������ ������ HTMLColletion � ������
    console.log('�������������� � ������, ������� �������������');
    console.log(mass);
    console.log('**************************');

 /*******��� �������************************************************************************************************
    var masss = mass.reduce(function (previousValue, currentValue, index) { //������������ ������ � ��������� ������ ��� ������� ������� ����� �������� �� ��� �����
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
mass.reduce((previousValue, currentValue, index){..},[] ����� �� �������, [] � ����� ����� ����� ������� ��������� � �������
��������. //currentValue.tagName == 'BR'// -- ���� ������� ������� ��� ������, �� � ����������� ������� ����� ������
�������(//previousValue.push([])//). //previousValue.length == 0// -- ���� ��� �� ������, �� ��� ����� ����: ����
��� ������ ��������, �� ����������� ����, �����������, �� ����. ������ �������� �� //previousValue[previousValue.length-1].push(currentValue.tagName)//
������ - ����� �������� ����� - ��������� ����� ������������(��� ������ �������� ����� 0) length -1 = -1. �.�. ��� ������
�������� ��� ������ ����� �������� �������� � �������������� ������� � ����������� ���  ������� ������. ������ �������
��� ���������� ������ ��������� ��������� (//previousValue.length == 0//)(������� If �� ������, �.�. ���������� �������
���������).  //previousValue.length == 0// ������ �������� ��������� �������: ���� ��� �� ������, ��, ����, ��� ������
��������, ��  � ������ ����������� ��� ������� �� ������, � ����� ����� div(//previousValue.push([currentValue.tagName]//).,
��� ����� ������ ������ �������, ����� ��� ���������  ��������� ����� ������������ ���� �� 0.
������ //)&& previousValue// - ���. ��� ����� ���������� ������� push ������ ����������� reduce �� �������. ���� ��
������� ��� � ������ ����� - ������,  ��� �� �������� ���� �������� ����������� ���� �����, ���� ���, ������.
***************************************************************************************************************************************/

    mass = mass.reduce(function (previousValue, currentValue) { //������������ ������ � ��������� ������, �������� ����� �������
        return  (currentValue.tagName == 'BR'
                    ? previousValue.push([])
                    : previousValue.length == 0 ? previousValue.push([currentValue.className.split(' ')[1]])
                            : previousValue[previousValue.length-1].push(currentValue.className.split(' ')[1])
            ) && previousValue;
    }, [] );
    console.log('��������������� � ��������� ������ ������ �������');
    console.log(mass);
    console.log('**************************');

    mass = mass.map(function(str){ //��������������� � ������ 1   0
        return str.map(function(elem){
            if(elem == 'life') return 1;
            else return 0;
        });
    });
    console.log('������ � ������������� ����');
    console.log(mass);
    console.log('**************************');

    var new_mass = new Array(10).fill(0).map(function(){return new Array(10).fill(0)}); //������ ������ ��� ������������ ������ ���� ��������
    Scan_mass(mass, new_mass); //��������� ������� ���� � ������� �����
    new_mass.map(function(str, i){mass[i] = str.slice(0);}); //��������� ������
    new_mass.map(function(str){str.fill(0);}); //�������� ��������� ������
    Print(mass);
    console.log('����� ������');
    console.log(mass);
    console.log('**************************');
}

function Scan_mass(mass, new_mass) { //��������� � ������� ��������� ����
    mass.map(function (str, i){
        str.map(function(el, j){Scan_el(mass, new_mass, el, i, j)
        });
    });
    return new_mass;
}

function Scan_el(mass, new_mass, el, i, j) {
    var k = 0;
    //console.log('******������ ��������*******');
    //console.log('i=' + i + ' j=' +j);
    [i - 1, i, i + 1].map(function(y) { //���������� ������ ������ ������ ��������
        if (y < 0) y = mass.length - 1; //���� ����������� ������� ��������� �� ������� ������, ������ �������� ������ ������ ����� ������� ������
        else if (y == mass.length) y = 0;//���� ���������� ������� ��������� �� ������ ������, ������ �������� ����� ������ ����� ������� �������
        [j-1, j, j+1].map(function(x){ //���������� �������� �������� �������� �� ���� ������������ �������� �����
            if(i != y || j != x) { //� ����� ��������� ������� � ���� �����������? �� ��� ������ �� ����� ��� �����
                if (x < 0) x = mass[y].length - 1;//���� ���������� ������� ��������� �� ����� ������, ������ �������� ����� ������� ����� ��������� �� ������ ������
                else if (x == mass[y].length) x = 0;//���� ���������� ������� ��������� �� ������ ������, ������ �������� ������ ������� ����� ��������� �� ����� ������
                if(mass[y][x] == 1) k++;
            }
        });
    });
    //console.log('**k=' + k + '**����� ��������*******');
    Edit_mass(mass, new_mass, k, i, j);
}

/*function Scan_el(mass, new_mass, el, i, j) {
//    console.log('element=' + el + ' i=' + i + ' j =' + j); //���������� � ������� ����� ����� ������ ����������� ������
    switch (true) { //���������� ���� ���������� ������(�������������, ������ ������� ��� � ����) � ����������� �� ���� ���������� ������, �������� ������� ������� ������
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
}*/
// ���������� k ����� �������������� ��� �������� ����������� ����� ����� ������ ����������

function Inner_element(mass, el, i, j) {
//    console.log('Inner_element');
    var k = 0;
    for(var y = i-1; y <= i+1; y++) {
        for(var x = j-1; x <= j+1; x++){
            if(y != i || x != j) { //���� ��������������� ������� ������ ��������(3 �� 3) �� ��������� ����������, �� ����������� ������
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

function First_generation(mass) { //����� ������������� ����� ������
//    mass[3][3] = mass[3][4] = mass[3][5] = mass[4][3] = mass[4][4] = mass[4][5] = mass[5][3] = mass[5][4] = mass[5][5] = 1;
//    mass[3][3] = mass[4][3] = mass[5][3] = mass[4][4] = mass[5][4] = mass[5][5] = mass[4][2] = 1;
//    mass[3][3] = mass[3][5] = mass[4][4] = mass[4][5] = mass[5][4] = 1;
    mass[0][9] = mass[9][9] = mass[2][1] = mass[0][0] = mass[1][9] = mass[1][0] = mass[0][1] = mass[9][0] =1;
    return mass;
}

function Edit_mass(mass, new_mass, k, i, j) {
    switch (true) { //���������� ���� ���������� ������(�������������, ������ ������� ��� � ����)
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
window.onload = function() { Init();} //��� ������ � ������� ������ �������� � ������� ����������� � Init();

function Print(mass) { //������� ������ ���������� �� ��������

    var lifegame = document.getElementById('lifegame');  //���� ������� � ������� ������ � �����
//    console.log(lifegame.getAttribute('id'));
    lifegame.innerHTML = '';                            //������� ��� �������� ��������

    mass.map(function(str, index, matrix) {
       str.map(function(elem){
           var child_div = document.createElement('div');
           child_div.className = 'elem';

           if(elem == 0) child_div.className += ' notlife';
           if(elem != 0) child_div.className += ' life';

           document.getElementById('lifegame').appendChild(child_div);
       });
        if(matrix.length -1 != index) { //����� ����� ������ ������� �� �������� ������
            var br = document.createElement('br'); //������� ������� �� ����� ������
            document.getElementById('lifegame').appendChild(br);
        }
    });
}
