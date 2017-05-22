// @ts-check
"use strict"; 
window.onload = function() {
    var canvas          = document.getElementById('canvas'),
        ctx             = canvas.getContext('2d'),
        line            = new Line(ctx),
        img             = new Image;
        ctx.strokeStyle = '#fff'; // white
        img.onload      = start;  // Start app after image loads
        img.src         = 'img/hardlight-suit.png';

    /**@type {string} - Unique code to connect to Azure Function */
    var sCode           = "a/YpF2XwTktG0S1tHqVmN1MImuokH5UCiVKwQeeisMmDdOWPheqV6w==";
    var sFuncUrl        = "https://nullspacevr-func.azurewebsites.net/api/NodeStatus?code=";
    var sCompleteUrl    = sFuncUrl + sCode;

    var aSensorNodes = [      
       {"nodelabel":0,"status":0}
    ];


/**
 * Called once during init to set up drawing.
 * Update the debug boxes when user moves the mouse */
function start() {
    // Draw suit image
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    // Get latest node status from Azure Function
    httpGetAsync(sCompleteUrl, console.log("Request made"));
    // Draw rectangles for each sensor   
    rectCoords.forEach(function(i) {
        drawRect(ctx, i.x, i.y, i.bWorking);
    }, this);
    // Update nodes when the mouse moves
    // TODO: Call this every (x) seconds?
    canvas.onmousemove = updateLine;
};


/** Make a request to the Azure Function.
 * @return {array} - JSON with node status
 */
function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() { 
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                callback(xmlHttp.responseText);
                console.log(xmlHttp.responseText)
        } 
        xmlHttp.open("GET", theUrl, true); // true for asynchronous 
        xmlHttp.send(null);
};


/**
* Starting loc (top-left) when drawing the rectangle.
* Create an object to store all of the rectangles here.
* @Type {Array}
*/
var rectCoords = [
    // Torso
    this.one = {
        x: 400,
        y: 140,
        bWorking: false
    },
    this.two = {
        x: 300,
        y: 138,
        bWorking: true
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
    }
];


/**Draws debug rectangles and paints based on whether sensor is working or not
 * @type {context} ctx - canvas context (2D).
 * @type {number} startX
 * @type {number} startY
 * @type {boolean} bWorking
 */
function drawRect(ctx, startX, startY, bWorking){
    var width  = 40;
    var height = 40;
    if (bWorking == undefined){bWorking = false;}

    ctx.beginPath();
    ctx.rect(startX, startY, width, height);

    if (bWorking === true) {
        ctx.fillStyle = "green";
    } else if (bWorking === false) {
        ctx.fillStyle = "red";
    }
    ctx.fill();
    ctx.stroke();
};



/** Draws a line to the screen for debig coordinates.
 * @type {context} ctx - canvas context (2D).
 */
function Line(ctx) {   
    this.x1 = 0,
    this.x2 = 0,
    this.y1 = 0,
    this.y2 = 0;
    
    this.draw = function() {
        ctx.beginPath();
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y2);
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

    rectCoords.forEach(function(i) {
        drawRect(ctx, i.x, i.y, i.bWorking);
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