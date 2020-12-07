let size1 = parseInt($(document.getElementById('anim')).width());
let size2 = parseInt($(document.getElementById('anim')).height());
let stop;
let dx1 = 1;
let dy1 = 1;
let dx2 = 1;
let dy2 = 1;
let key_store = 1;
localStorage.clear();
$(function() {
    $("#work").hide(); 
    $("#play").on('click', function() {
    $("#work").show(); 
    circles_start_pos();
    document.getElementById("inf_text").textContent = "Натискання кнопки 'play'.Відкриття вікна 'work'";
    writeInStorage("Натискання кнопки 'play'.Відкритття вікна 'work'");
    }); 
    $("#cls").on('click', function() {
    $("#work").hide(); 
    document.getElementById("inf_text").textContent = "Натискання кнопки 'start'";
    writeInStorage("Натискання кнопки 'close'.Закриття вікна 'work'");
    writeOnPage();
    })
    });
    $(function(){
        $("#stop").hide();
        $("#reload").hide();
        $("#start").on('click', function() {
            $("#stop").show();
            $("#start").hide();
            stop= false; 
            move_circle1();
            move_circle2();
            document.getElementById("inf_text").textContent = "Натискання кнопки 'start'";
            writeInStorage("Натискання кнопки 'start'");
        })
    });
    $(function(){
        $("#stop").on('click', function() {
            $("#start").show();
            $("#stop").hide(); 
            stop = true;
            document.getElementById("inf_text").textContent = "Натискання кнопки 'stop'";
            writeInStorage("Натискання кнопки 'stop'");
        })
    });
    $(function(){
        $("#reload").on('click', function() {
            $("#start").show();
            $("#reload").hide(); 
            stop = false;
            circles_start_pos();
            document.getElementById("inf_text").textContent = "Натискання кнопки 'reload'";
            writeInStorage("Натискання кнопки 'reload'");
        })
    });

function getRandomPos(size) {
        let pos =  Math.floor(Math.random() * (size-20));
        return pos;
      }
function writeInStorage(mess){
    localStorage.setItem(key_store, ((new Date()).toLocaleTimeString()+": "+ mess));
    key_store++;
}
function circles_start_pos(){
    let pos1 = '';
    let pos2 = '';
    pos1 += getRandomPos(size1);
    pos2 += getRandomPos(size2);
    document.getElementById("circle1").style.left = pos1 + 'px';
    document.getElementById("circle2").style.top = pos2 + 'px';
}

function move_circle1(){
    let x = parseInt(document.getElementById("circle1").style.left);
    let y = parseInt(document.getElementById("circle1").style.top);
    x = isNaN(x) ? 0 : x;
    y = isNaN(y) ? 0 : y;
    if (stop) {
        return;
    }
    if (x + dx1 < 0 || x + 20 + dx1 > size1) {
        dx1 = -dx1;
        document.getElementById("inf_text").textContent = "Червона кулька торкнулася стінки";
        writeInStorage("Червона кулька торкнулася стінки");
    }
    if (y + 20 + dy1 > size2 || y + dy1 < 0) {
        dy1 = -dy1;
        document.getElementById("inf_text").textContent = "Червона кулька торкнулася стінки";
        writeInStorage("Червона кулька торкнулася стінки");
    }
    
    document.getElementById("circle1").style.left = x + dx1 + "px";
    document.getElementById("circle1").style.top = y + dy1 + "px";
    
    setTimeout(function(){move_circle1();}, 7);
   
}
function move_circle2(){
    let x = parseInt(document.getElementById("circle2").style.left);
    let y = parseInt(document.getElementById("circle2").style.top);
    x = isNaN(x) ? 0 : x;
    y = isNaN(y) ? 0 : y;
    if (stop) {
        return;
    }
    if (x + dx2 < 0 || x + 20 + dx2 > size1) {
        dx2 = -dx2;
        document.getElementById("inf_text").textContent = "Зелена кулька торкнулася стінки";
        writeInStorage("Зелена кулька торкнулася стінки");
    }
    if (y + 20 + dy2 > size2 || y + dy2 < 0) {
        dy2 = -dy2;
        document.getElementById("inf_text").textContent = "Зелена кулька торкнулася стінки";
        writeInStorage("Зелена кулька торкнулася стінки");
    }
    let X1 = (parseInt(document.getElementById("circle1").style.left)+ (document.getElementById("circle1").style.right))/2;
    let Y1 = (parseInt(document.getElementById("circle1").style.top)+ (document.getElementById("circle1").style.bottom))/2;
    let X2 = (parseInt(document.getElementById("circle2").style.left)+ (document.getElementById("circle2").style.right))/2;
    let Y2 = (parseInt(document.getElementById("circle2").style.top)+ (document.getElementById("circle2").style.bottom))/2;
    let X = X2-X1;
    let Y = Y1-Y2;
    let distance = (X*X + Y*Y)**(1/2);
    if( distance <= 10){
        $("#stop").hide(); 
        $("#reload").show(); 
        document.getElementById("inf_text").textContent = "Кульки зіштовхнулися";
        writeInStorage("Кульки зіштовхнулися");
        stop=true;
    }
    document.getElementById("circle2").style.left = x + dx2 + "px";
    document.getElementById("circle2").style.top = y + dy2 + "px";
    
    setTimeout(function(){move_circle2();}, 2);
   
}
function writeOnPage(){
    let array = []
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        var value = localStorage[key];
        array.push(value)
    }
    array.sort();
    array.forEach(element => {
    document.getElementById("text").innerHTML += element + "<br>"
    });
}
