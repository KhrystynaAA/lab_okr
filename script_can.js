let canvas = document.getElementById("myCanvas");
let stop;
var r = 10;
var x1 = getRandomPos(canvas.width);
var y1 = 10;
var x2 = 10;
var y2 = getRandomPos(canvas.height);
let prevX1 = x1;
let prevY1 = y1;
let prevX2 = x2;
let prevY2 = y2;
let dx1 = 2;
let dy1 = 2;
let dx2 = 2;
let dy2 = 2;
let ctx = canvas.getContext('2d');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;
let key_store = 1;
localStorage.clear();
$(function() {
    $("#work").hide(); 
    $("#play").on('click', function() {
    $("#work").show(); 
    drawCircles();
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
            reload();
            document.getElementById("inf_text").textContent = "Натискання кнопки 'reload'";
            writeInStorage("Натискання кнопки 'reload'");
        })
    });
    function writeInStorage(mess){
        localStorage.setItem(key_store, ((new Date()).toLocaleTimeString()+": "+ mess));
        key_store++;
    }
    

    function reload(){
        x1 = getRandomPos(canvas.width);
        y1 = getRandomPos(canvas.height);
        x2 = getRandomPos(canvas.width);
        y2 = getRandomPos(canvas.height);
        ctx.clearRect(prevX1 - r, prevY1 - r, r * 2, r * 2);
        ctx.fillStyle = 'red';
        drawCircle(x1, y1);
        ctx.clearRect(prevX2 - r, prevY2 - r, r * 2, r * 2);
        ctx.fillStyle = 'green';
        drawCircle(x2, y2);
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
    function getRandomPos(size) {
        let pos =  Math.floor(Math.random() * (size-10));
        return pos;
      }
    function drawCircles() {
        console.log($(document.getElementById("anim")).offset().top);
        ctx.fillStyle = 'red';
        drawCircle(x1, y1);
        ctx.fillStyle = 'green';
        drawCircle(x2, y2);
    }
    
    function drawCircle(x, y) {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        console.log(x + ":" + y)
        ctx.fill();
        ctx.closePath();
    }
    
    function move_circle1() {
    
        if (stop) { return }
        ctx.clearRect(prevX1 - r, prevY1 - r, r * 2, r * 2);
        ctx.fillStyle = 'red';
        drawCircle(x1, y1);
            if (x1 + dx1 > canvas.width-r || x1 + dx1 < r) {
                dx1 = -dx1;
                document.getElementById("inf_text").textContent = "Червона кулька торкнулася стінки";
                writeInStorage("Червона кулька торкнулася стінки");
            }
            if (y1 + dy1 > canvas.height-r || y1 + dy1 < r) {
                dy1 = -dy1;
                document.getElementById("inf_text").textContent = "Червона кулька торкнулася стінки";
                writeInStorage("Червона кулька торкнулася стінки");
                
            }
        
        prevX1 = x1;
        prevY1 = y1;
        x1 += dx1;
        y1 += dy1;
        setTimeout(function() {move_circle1();}, 10)
    }
    function move_circle2() {
    
        if (stop) { return }
        ctx.clearRect(prevX2 - r, prevY2 - r, r * 2, r * 2);
        ctx.fillStyle = 'green';
        drawCircle(x2, y2);
            if (x2 + dx2 > canvas.width-r || x2 + dx2 < r) {
                dx2 = -dx2;
                document.getElementById("inf_text").textContent = "Зелена кулька торкнулася стінки";
                writeInStorage("Зелена кулька торкнулася стінки");
            }
            if (y2 + dy2 > canvas.height-r || y2 + dy2 < r) {
                dy2 = -dy2;
                document.getElementById("inf_text").textContent = "Зелена кулька торкнулася стінки";
                writeInStorage("Зелена кулька торкнулася стінки");
            }
            let X1 = x1;
            let Y1 = y1;
            let X2 = x2;
            let Y2 = y2;
            let X = X2-X1;
            let Y = Y1-Y2;
            let distance = (X*X + Y*Y)**(1/2);
            if( distance <= 20){
                $("#stop").hide(); 
                $("#reload").show(); 
                document.getElementById("inf_text").textContent = "Кульки зіштовхнулися";
                writeInStorage("Кульки зіштовхнулися");
                stop=true;
            }
        prevX2 = x2;
        prevY2 = y2;
        x2 += dx2;
        y2 += dy2;
        setTimeout(function() {move_circle2();}, 5)
    }