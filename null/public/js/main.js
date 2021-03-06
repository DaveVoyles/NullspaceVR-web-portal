/* Prepared by Joe Raio    [@JoeScars  ]  (GitHub.com/JoeScars  )
 * &           Dave Voyles [@DaveVoyles]  (GitHub.com/DaveVoyles)
 * June 2017 */

// @ts-check
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
    var bDebug          = true;
    
    /** Curent status of each node.  
     * @type {object} */
    var oSensorStatus   = {
            Unknown              : 0,
            OverCurrent_OverTemp : 1,   // Red
            OverCurrent          : 2,
            OverTemp             : 3,
            Nominal              : 4    // Green
    };

    /** Store the live node results from Azure Function 
     * @type {array}  */
    var nodeStatuses = [];


    /** Stores response from Azure function and [optionally] logs results */
    function setNodeStatuses(response) {
        nodeStatuses = response;

        //Logging for Debug mode
        if (bDebug === true){
            for(var i = 0; i < nodeStatuses.length; i++){
                console.log("NodeId: " + nodeStatuses[i].NodeId    + 
                " | NodeLabel      : " + nodeStatuses[i].NodeLabel + 
                " | Status         : " + nodeStatuses[i].Status    +
                " | LocX           : " + nodeStatuses[i].LocX      +
                " | LocY           : " + nodeStatuses[i].LocY);
            }
        }
    }

    /** Called once during init to set up drawing.
     *  Update the debug boxes when user moves the mouse */
    function start() {
        // Draw suit image
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        // Get latest node status from Azure Function
        httpGetAsync(sCompleteUrl, function(data){
            //store result in global                        
            setNodeStatuses(JSON.parse(data));  
            loopThroughCoords();
        });
        // Update nodes when the mouse moves
        canvas.onmousemove = updateLine;
    };


    /**
     * Loops through individual node statuses returned from an Azure function &
     * displays colored rectangles to indicate status. 
     */
    function loopThroughCoords () {
        var count = 0;
        if (bDebug === true){ console.log("# of nodes from Function: "+ nodeStatuses.length); };

        nodeStatuses.forEach(function(i) {
            drawRect(
                ctx, 
                nodeStatuses[count].LocX, 
                nodeStatuses[count].LocY, 
                nodeStatuses[count].Status
            );

            // Logging for Debug mode
            if (bDebug ===true){
                console.log("NodeId: " + nodeStatuses[count].NodeId    + 
                " | NodeLabel      : " + nodeStatuses[count].NodeLabel + 
                " | Status         : " + nodeStatuses[count].Status    +
                " | LocX           : " + nodeStatuses[count].LocX      +
                " | LocY           : " + nodeStatuses[count].LocY);
            }
            count++;
        }, this);
    };


    /** Make a request to the Azure Function.
     * @return {array} - JSON with node status */
    function httpGetAsync(theUrl, callback) {
        var xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = function() { 
                // Ready to receive response and 200 (success)
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                {
                    //store response
                    var response = xmlHttp.responseText;

                    if (callback) {
                        callback(response)
                    }              
                }
            } 
            xmlHttp.open("GET", theUrl, true); // true for asynchronous 
            xmlHttp.send(null);
    };


    /**Draws debug rectangles and paints based on whether sensor is working or not
     * @type {context} ctx - canvas context (2D).
     * @type {number} startX - Where should the top-left corner begin?
     * @type {number} startY - Where should the top-left corner begin?
     * @type {number} nStatus - Look at oSensorStatus for list of possible number values */
    function drawRect(ctx, startX, startY, nStatus) {
        var width  = 40;
        var height = 40;

        // if (nStatus == undefined || null || 0){nStatus = 0}
        ctx.beginPath();
        ctx.rect(startX, startY, width, height);
        if (bDebug === true) { console.log(nStatus); };

        // TODO: Define other rect colors here, based on status
        // Change rect colors based on status
        if (nStatus === 1) {
            ctx.fillStyle = "green";
        // } else if (nStatus === undefined || null || 0) {
        } else if (nStatus === 0) {
            ctx.fillStyle = "red";
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
        loopThroughCoords();

        line.x1 = x;
        line.y1 = 0;
        line.x2 = x;
        line.y2 = canvas.height;
        line.draw();
    };


    // Debug functions
    /*********************************************************/

    /** Draw mouse cursor coords. Useful when trying to determine where to start drawing rects. */
    canvas.addEventListener('mousemove', function(evt) {
        var mousePos = getMousePos(canvas, evt);
        var message  = 'X: ' + Number(mousePos.x.toFixed(0)) + ', Y: ' +Number(mousePos.y.toFixed(0));
        writeMessage(canvas, message);
    }, false);

    /** Draws mtext for mouse coords */
    function writeMessage(canvas, message) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font      = '18pt Calibri';
        ctx.fillStyle = 'black';
        ctx.fillText(message, 10, 25);
    };

    /** Returns coords for mouse X/Y display */
    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        }
    };

    /** Toggles console logging by pressing debug button */
    function toggleDebugMode () {
        var debugBtn = document.getElementById('debug-btn');
        debugBtn.onclick = function () {
            bDebug = !bDebug;
            
            console.log('debug mode: ' + bDebug);
            if (bDebug === true) {
            debugBtn.innerText = "Debug Mode is: ON";
            } else {
            debugBtn.innerText = "Debug Mode is: OFF";
            }
        };
    };
    toggleDebugMode();


    /** Pulls latest data from Azure function 
     * TODO: Consider turning this into a functon that is called every (x) seconds */
    function refresh () {
        var refreshBtn = document.getElementById('refresh-btn');
        refreshBtn.onclick = function () {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            // Get latest node status from Azure Function
            httpGetAsync(sCompleteUrl, function(data){
                //store result in global                        
                setNodeStatuses(JSON.parse(data));  
                loopThroughCoords();
            });
        }
    };
    refresh();

}