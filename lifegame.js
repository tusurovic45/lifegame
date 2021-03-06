window.onload = function() { StartMode();} //��� ������ � ������� ������ �������� � ������� ����������� � Init();

function StartMode() {

    var lifegame = document.getElementById('lifegame'); //���� ���� lifegame
    lifegame.innerHTML = ''; //������� ���������� ���������� �����
    var selectList = document.createElement('select'); //������ ���� select ��� ����� ������ ������ ����
    selectList.setAttribute('onchange', "Size(this.value)"); //���������� ������� �� ������ select - �� ��������� ���������� ������� � ���������� ��������� ����� �������
    var option = document.createElement('option');//������ �����
    option.setAttribute('selected', 'selected'); //���������� �������, ��� ��� ����� �������
    option.innerHTML = '�������� �����'; //�������� ����� �����
    selectList.appendChild(option); //���������� ����� � ����� ��������� ������
    var option = document.createElement('option'); //������ ����� �����
    option.value = 0; //��������� �� ������� ���������
    option.text = '� �����'; //��������� ���� � ���� �����
    selectList.appendChild(option); //���������� ��� ����� � ����� ��������� ������
    var option = document.createElement('option');//������ ����� �����
    option.value = 1;
    option.text = '�� �����'; //��������� ���� � ���� �����
    selectList.appendChild(option); //��������� �� ������� ���������
    lifegame.appendChild(selectList);//��������� ������ � ���������� � ���� ����� ���������� � ���� lifegame
}

function Size(chooseMode) {

    var lifegame = document.getElementById('lifegame');  //���� ������� � ������� ������ � �����
    lifegame.innerHTML = '';

    var size = document.createElement('input');
    size.setAttribute('id', 'sizearea')
    size.setAttribute('type', 'number');
    size.setAttribute('placeholder', '������� ����� �� 5 �� 20 � ������� ENTER');
    size.setAttribute('onchange', 'FirstIterationMode(parseInt(this.value), parseInt(document.getElementById(\'startmode\').innerHTML))');
    lifegame.appendChild(size);

    var sm = document.createElement('div');
    sm.innerHTML = chooseMode;
    sm.setAttribute('style', 'display: none;');
    sm.setAttribute('id', 'startmode');
    lifegame.appendChild(sm);

}

function FirstIterationMode(size, ChooseMode) {

    if(size < 5 || size > 20) return Size(ChooseMode); //������ ���� ������ ���� �� ����� 5�� �� �� ����� 20��

    var lifegame = ClearLifegame();

    var selectList = document.createElement('select');
    selectList.setAttribute('onchange', 'FirstIteration(parseInt(this.value), parseInt(document.getElementById(\'startmode\').innerHTML), parseInt(document.getElementById(\'size\').innerHTML) )');

    var option = document.createElement('option');
    option.setAttribute('selected', 'selected');
    option.innerHTML = '�������� ������� ������ ��������';
    selectList.appendChild(option);

    var option = document.createElement('option');
    option.value = 0;
    option.text = '�� ���������';
    selectList.appendChild(option);

    var option = document.createElement('option');
    option.value = 1;
    option.text = '������ ����';
    selectList.appendChild(option);
    lifegame.appendChild(selectList);

    var sz = document.createElement('div');
    sz.innerHTML = size;
    sz.setAttribute('style', 'display: none;');
    sz.setAttribute('id', 'size');
    lifegame.appendChild(sz);

    var sm = document.createElement('div');
    sm.innerHTML = ChooseMode;
    sm.setAttribute('style', 'display: none;');
    sm.setAttribute('id', 'startmode');
    lifegame.appendChild(sm);
}

function FirstIteration(firstiteration, choosemode, size) {

    var mass = new Array(size).fill(0).map(function(){return new Array(size).fill(0)}); //������ ��������� ������ � ��������� ��� ������

    if(firstiteration == 0) {

        mass = First_generation(mass, size);
        Print(mass);
        console.log('�������������� ������');
        console.log(mass);
        console.log('**************************');

        return Init(mass, size, choosemode);
    }

    else if(firstiteration == 1) ManualFirstIteration(mass, size, choosemode)
}

function ManualFirstIteration(mass, size, ChooseMode) {

    var lifegame = ClearLifegame();

    mass.map(function (str, index_str) {

        str.map(function(elem, index){

            var LifegameInput = document.createElement('input');
            LifegameInput.setAttribute('type', 'checkbox');
            LifegameInput.setAttribute('id', index_str + '_' + index);
            LifegameInput.setAttribute('style', 'display: none');
            lifegame.appendChild(LifegameInput);

            var LifegameLabel = document.createElement('label');
            LifegameLabel.setAttribute('for', index_str + '_' + index);

            var element = document.createElement('div');
            element.setAttribute('class', 'elem');

            LifegameLabel.appendChild(element);
            lifegame.appendChild(LifegameLabel);
        })
        lifegame.innerHTML += '<br>';
    });

    var sz = document.createElement('div');
    sz.innerHTML = size;
    sz.setAttribute('style', 'display: none;');
    sz.setAttribute('id', 'size');
    document.body.appendChild(sz);

    var sm = document.createElement('div');
    sm.innerHTML = ChooseMode;
    sm.setAttribute('style', 'display: none;');
    sm.setAttribute('id', 'startmode');
    document.body.appendChild(sm);

    var start = document.createElement('button');
    start.setAttribute('onclick', 'ScanFirstIteration(parseInt(document.getElementById(\'size\').innerHTML), parseInt(document.getElementById(\'startmode\').innerHTML) )')
    start.setAttribute('id', 'start_lifegame');
    start.innerHTML = 'Start!';
    document.body.appendChild(start);
}

function ScanFirstIteration(size, ChooseMode) {

    var elems = document.getElementById('lifegame').getElementsByTagName('input'); //�������� ������������ ������������� ������������� ����
    //console.log('������������� � ���� ������ � ���� HTMLCollection ');
    //console.log(elems);
    //console.log('**************************');

    var mass = Array.prototype.slice.call(elems); //������������ ������ HTMLColletion � ������
    //console.log('��������������� � ������, ������� �������������');
    //console.log(mass);
    //console.log('**************************');

    mass.map(function(elem, index){

        elem.checked == true ? mass[index] = 1 : mass[index] = 0;
    });

    if(mass.length % size != 0) {
        console.log('��� �� �����?!');
        return;
    }

    mass = mass.reduce(function(previousValue, currentlyValue, index) {

    //    console.log(previousValue);

        return (index % size == 0
                    ? previousValue.push([currentlyValue])
                    : previousValue[previousValue.length -1].push(currentlyValue)
            ) && previousValue;
    }, [] );

    //console.log('���������������� ������ � ������������� ����');
    //console.log(mass);
    //console.log('**************************');

    var start = document.getElementById('start_lifegame');
    var sz = document.getElementById('size');
    var sm = document.getElementById('startmode');
    var par = start.parentNode;
    par.removeChild(start);
    par.removeChild(sz);
    par.removeChild(sm);

    ClearLifegame();

    Print(mass);

    Init(mass, size, ChooseMode);
}

function Init(mass, size, ChooseMode) {

    console.log('��� ����� ������ � ����� �������������');
    console.log(mass);
    console.log('**************************');

    var new_mass = new Array(size).fill(0).map(function(){return new Array(size).fill(0)}); //������ ������ ��� ������������ ������ ���� ��������

    if(ChooseMode == '0') InitInterval(mass, new_mass); //����� �� ���������

    else if(ChooseMode == '1') {

        var KlickButton = document.createElement('button');
        KlickButton.innerHTML = '��������� ��������';
        KlickButton.setAttribute('onclick', 'Klick()');
        document.body.appendChild(KlickButton);

        Klick();
    }
}

function InitInterval(mass, new_mass) {

    setInterval(function(){

     Scan_mass(mass, new_mass); //��������� ������� ���� � ������� �����

     new_mass.map(function(str, i){mass[i] = str.slice(0);}); //��������� ������
     new_mass.map(function(str){str.fill(0);}); //�������� ��������� ������

     Print(mass);

     console.log('����� ������');
     console.log(mass);
     console.log('**************************');

     }, 1000);

}

function Klick() {

    var elems = document.getElementById('lifegame').getElementsByTagName('*'); //�������� ������������ ������������� ������������� ����
    //console.log('������������� � ���� ������ � ���� HTMLCollection ');
    //console.log(elems);
    //console.log('**************************');
    var mass = Array.prototype.slice.call(elems); //������������ ������ HTMLColletion � ������
    //console.log('�������������� � ������, ������� �������������');
    //console.log(mass);
    //console.log('**************************');

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
    //console.log('��������������� � ��������� ������ ������ �������');
    //console.log(mass);
    //console.log('**************************');

    mass = mass.map(function(str){ //��������������� � ������ 1   0
        return str.map(function(elem){
            if(elem == 'life') return 1;
            else return 0;
        });
    });
  //  console.log('������ � ������������� ����');
    console.log(mass);
 //   console.log('**************************');

    var new_mass = new Array(mass.length).fill(0).map(function(){return new Array(mass.length).fill(0)}); //������ ������ ��� ������������ ������ ���� ��������

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
    [i - 1, i, i + 1].map(function(y) { //���������� ������ ������ ������������ ��������
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


// ���������� k ����� �������������� ��� �������� ����������� ����� ����� ������ ����������


function First_generation(mass, size) { //����� ������������� ����� ������
    mass[0][0] = mass[0][1] = mass[0][2] = mass[1][0] = mass[1][1] = mass[1][2] = mass[2][0] = mass[2][1] = mass[2][2] = 1;
//    mass[0][1] = mass[1][0] = mass[1][1] = mass[1][2] = mass[2][1] = mass[2][2] = mass[2][3] = 1;
//    mass[0][0] = mass[0][2] = mass[1][1] = mass[1][2] = mass[2][1] = 1;
//    mass[0][size - 1] = mass[size - 1][size - 1] = mass[2][1] = mass[0][0] = mass[1][size - 1] = mass[1][0] = mass[0][1] = mass[size - 1][0] = 1;
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

function Print(mass) { //������� ������ ���������� �� ��������

    var lifegame =  ClearLifegame();                       //������� ��� �������� ��������

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

function ClearLifegame() {

    var lifegame = document.getElementById('lifegame');
    lifegame.innerHTML = '';

    return lifegame;
}
