var clock = null;
var state = 0;
var speed = 4;
//开始按钮事件
function mouseover(obj) {
    obj.style.backgroundColor = 'orange';
}
function mouseout(obj) {
    obj.style.backgroundColor = 'gray';

}

//初始化init
function init() {
    while (con.childNodes.length) {
        con.removeChild(con.lastChild);
    }
    $('score').innerHTML = 0;
    state = 0;
    speed = 4;
    for (var i=0; i< 4; i++) {
        createrow();
    }
    if (state == 0) {
        $('main').onclick = function(ev) {
            judge(ev);
        }
        //定时器 每30毫秒调用一次move()
        clock = window.setInterval('move()', 30);
    }
}

//判断用户是否点击到了黑快
function judge(ev) {
    if (ev.target.className.indexOf('black') !== -1&&state==0) {
        ev.target.className = 'cell';
        ev.target.parentNode.pass = 1; //定义属性pass，表明此行row的黑快已经被点击
        score();
    }

}
//游戏结束
function fail() {
    clearInterval(clock);
    state = 1;
    confirm('你的最终得分为' + parseInt($('score').innerHTML));

}
//根据id来get dom元素
function $(id) {
    return document.getElementById(id);
}
//创建div,参数className是其类名
function creatediv(className) {
    var div = document.createElement('div');
    div.className = className;
    return div;
}
//创造一个<div class="row">并且有四个子节点<div clss="cell">
function createrow(){
    var con = $('con');
    var row = creatediv('row'); //创建div className=row
    var arr = createcell(); //定义div cell的类名，其中一个为cell black；
    con.appendChild(row); // 添加row为con的子节点
    for (var i = 0; i < 4; i++) {
        row.appendChild(creatediv(arr[i])); //添加row的子节点 cell
    }
    if (con.firstChild == null) {
        con.appendChild(row);
    } else {
        con.insertBefore(row, con.firstChild);
    }
}
// 删除div#con的子节点中最后那个<div class="row">
function delrow() {
    var con = $('con');
    if (con.childNodes.length == 6) {
        con.removeChild(con.lastChild);
    }

}
//创建一个类名的数组，其中一个为cell　black,其余为cell
function createcell() {
    var temp = ['cell', 'cell', 'cell', 'cell', ];
    var i = Math.floor(Math.random() * 4); //随机生成黑快的位置
    temp[i] = 'cell black';
    return temp;

}
//使黑快向下移动
function move() {
    var con = $('con');
    var top = parseInt(window.getComputedStyle(con, null)['top']);
    if (speed + top > 0) {
        top = 0;
    } else {
        top += speed;
    }
    con.style.top = top + 'px';
    if (top == 0) {
        createrow();
        con.style.top = '-100px';
        delrow();
    } else if (top == ( - 100 + speed)) {
        var rows = con.childNodes;
        if ((rows.length == 5) && (rows[rows.length - 1].pass !== 1)) {
            fail();
        }
    }
}
//加速函数
function speedup() {
    speed += 2;
    if (speed == 20) {
        alert('你超神了')
    }

}
//记分
function score() {
    var newscore = parseInt($('score').innerHTML) + 1;
    $('score').innerHTML = newscore;
    if (newscore % 10 == 0) {
        speedup();
    }

}
