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
    
    /** Curent status of each node.  
     * @type {object} */
    var oSensorStatus   = {
            Unknown              : 0,
            OverCurrent_OverTemp : 1,
            OverCurrent          : 2,
            OverTemp             : 3,
            Nominal              : 4
    };

    /** Formatting for sensor nodes returned from the Azure Function
     * @type {object}
     */
    var oSensorNode = {
        "NodeId"      : 1,
        "NodeLabel"   : "123123211",
        "Status"      : 0,
        "DateModified": "2017-05-11T11:48:49.36"
    };


     /** This will be filled with all of the sensors upon the first GET request 
      * @type {Array.<Object>}
      */
       var aSensorNodes = [
           oSensorNode
       ]

    /**
     * Starting loc (top-left) when drawing the rectangle.
     * Create an object to store all of the rectangles here.
     * @type {array}  */
    var rectCoords = [
        // Torso
        this.one = {
            x: 400,
            y: 140,
            nStatus: 0 // Unknown - Appears black?
        },
        this.two = {
            x: 300,
            y: 138,
            nStatus: 4 // Nominal - Appears green?
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
        this.fourteen = {
            x: 560,
            y: 386,
        },
        // Back
        this.fifteen = {
            x: 155,
            y: 138,
        },
        this.sixteen = {
            x: 470,
            y: 138,
        }
    ];


    /** Called once during init to set up drawing.
     *  Update the debug boxes when user moves the mouse */
    function start() {
        // Draw suit image
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        // Get latest node status from Azure Function
        httpGetAsync(sCompleteUrl, console.log("Request made to Azure Func"));
        // Draw rectangles for each sensor. Without this, rects will not appear until mouse moves   
        rectCoords.forEach(function(i) {
            drawRect(ctx, i.x, i.y, i.nStatus);
        }, this);
        // Update nodes when the mouse moves
        canvas.onmousemove = updateLine;
    };


    /** Make a request to the Azure Function.
     * @return {array} - JSON with node status */
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


    /**Draws debug rectangles and paints based on whether sensor is working or not
     * @type {context} ctx - canvas context (2D).
     * @type {number} startX
     * @type {number} startY
     * @type {number} nStatus */
    function drawRect(ctx, startX, startY, nStatus){
        var width  = 40;
        var height = 40;
        if (nStatus == undefined || null || 0){nStatus = 0}

        ctx.beginPath();
        ctx.rect(startX, startY, width, height);
        console.log(nStatus);
        // Change rect colors based on status
        if (nStatus === 4) {
            ctx.fillStyle = "green";
            console.log("green");
        } else if (nStatus === undefined || null || 0) {
            ctx.fillStyle = "red";
            console.log("red")
        }
        ctx.fill();
        ctx.stroke();
    };


    /** Draws a line to the screen for debig coordinates.
     * @type {context} ctx - canvas context (2D). */
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


    /** Called each time the mouse moves - redraws background, line, and rectangles
     * @type {event} e - HTML event */
    function updateLine(e) {
        var r = canvas.getBoundingClientRect(),
            x = e.clientX - r.left,
            y = e.clientY - r.top;
        
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Rectangles
        rectCoords.forEach(function(i) {
            drawRect(ctx, i.x, i.y, i.nStatus);
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
    };

}