"use strict"; 
window.onload = function() {
    var canvas          = document.getElementById('canvas'),
        ctx             = canvas.getContext('2d'),
        line            = new Line(ctx),
        img             = new Image;
        ctx.strokeStyle = '#fff';
        img.onload      = start;
        img.src         = 'img/hardlight-suit.png';

    // Called once during init
    function start() {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        drawRect(ctx);
        canvas.onmousemove = updateLine;
    };

   // Starting loc (top-left) when drawing the rectangle
   var rectCoords = [
        this.one = {
            x: 415,
            y: 140
        },
        this.two = {
            x: 269,
            y: 138 
        }
    ];


    rectCoords.forEach(function(i) {
        drawRect(ctx, i.x, i.y);
        console.log("x: "+ i.x);
        console.log("y: " + i.y);
    }, this);


    function drawRect(ctx, startX, startY){
        var startX = 269;
        var startY = 138;
        var width  = 40;
        var height = 40;

        ctx.beginPath();
        ctx.rect(startX, startY, width, height);
        ctx.fillStyle = "green";
        ctx.fill();
        ctx.stroke();
    };

    function Line(ctx) {   
        var me = this;
        
        this.x1 = 0;
        this.x2 = 0;
        this.y1 = 0;
        this.y2 = 0;
        
        this.draw = function() {
            ctx.beginPath();
            ctx.moveTo(me.x1, me.y1);
            ctx.lineTo(me.x2, me.y2);
            ctx.stroke();
        }
    };



    // Called each time the mouse moves
    function updateLine(e) {
        var r = canvas.getBoundingClientRect(),
            x = e.clientX - r.left,
            y = e.clientY - r.top;
        
        // LOOK HERE
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        drawRect(ctx);

        line.x1 = x;
        line.y1 = 0;
        line.x2 = x;
        line.y2 = canvas.height;
        line.draw();
    };


    // Debug functions
    /*****************/
    canvas.addEventListener('mousemove', function(evt) {
        var mousePos = getMousePos(canvas, evt);
        var message  = 'X: ' + Number(mousePos.x.toFixed(0)) + ', Y: ' +Number(mousePos.y.toFixed(0));
        writeMessage(canvas, message);
    }, false);

    function writeMessage(canvas, message) {
        // ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font      = '18pt Calibri';
        ctx.fillStyle = 'black';
        ctx.fillText(message, 10, 25);
    };

    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        }
    }

}