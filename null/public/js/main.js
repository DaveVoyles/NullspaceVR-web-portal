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

   /**
    * Starting loc (top-left) when drawing the rectangle.
    * Crearte an object to store all of the rectangles here.
    */
   var rectCoords = [
        this.one = {
            num: "one",
            x: 400,
            y: 140
        },
        this.two = {
            num: "two",
            x: 300,
            y: 138 
        },
        this.three = {
            x: 300,
            y: 274,
        },
        this.four = {
            x: 400,
            y: 274,
        },
        this.five = {
            x: 300,
            y: 338,
        },
        this.six = {
            x: 400,
            y: 342,
        },
        this.seven = {
            x: 300,
            y: 418,
        },
        this.eight = {
            x: 400,
            y: 342,
        },
        this.eight = {
            x: 400,
            y: 418,
        },
        // Shoulders
        this.nine = {
            x: 153,
            y: 30,
        },
        this.ten = {
            x: 400,
            y: 30,
        },
        // Arms
        this.eleven = {
            x: 36,
            y: 179,
        },
        this.twelve = {
            x: 520,
            y: 179,
        },
        this.thirteen = {
            x: 13,
            y: 422,
        },
        this.thirteen = {
            x: 560,
            y: 386,
        },
    ];


    /** Loop through each set of rectangle coordinates and draw them to the screen.
     */
    // rectCoords.forEach(function(i) {
    //     drawRect(ctx, i.x, i.y);
    //     console.log('num: ' + i.num);
    //     console.log("x: " + i.x);
    //     console.log("y: " + i.y);
    // }, this);



        function drawRect(ctx, startXLoc, startYLoc){
        var startX = startXLoc;
        var startY = startYLoc;
        var width  = 40;
        var height = 40;

        ctx.beginPath();
        ctx.rect(startX, startY, width, height);
        ctx.fillStyle = "green";
        ctx.fill();
        ctx.stroke();
    };


    // OLD FUNCTION - Hardcoded values
    // function drawRect(ctx, startX, startY){
    //     var startX = 269;
    //     var startY = 138;
    //     var width  = 40;
    //     var height = 40;

    //     ctx.beginPath();
    //     ctx.rect(startX, startY, width, height);
    //     ctx.fillStyle = "green";
    //     ctx.fill();
    //     ctx.stroke();
    // };

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
        
        // LOOK HERE -- seems to be where the drawing gets funky
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        // drawRect(ctx); // OLD

        //TODO: Don't loop through this every frame. Do it only once
        rectCoords.forEach(function(i) {
            drawRect(ctx, i.x, i.y);
            console.log('num: ' + i.num);
            console.log("x: " + i.x);
            console.log("y: " + i.y);
        }, this);

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