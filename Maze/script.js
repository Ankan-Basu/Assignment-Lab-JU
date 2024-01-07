document.addEventListener('DOMContentLoaded', function () {
    //Ensure the DOM content is loaded before interacting with it

    const canvas = document.querySelector('#mazeCanvas');
    const genButton = document.querySelector('#gen-maze-button');
    const dimInput = document.querySelector('#maze-dim');
    const cyclicityInput = document.querySelector('#maze-multiedge');
    const solveButton = document.querySelector('#solve-button');
    
    const context = canvas.getContext('2d');

    let adjList = null;

    genButton.addEventListener('click', function () {
        let dim = Number(dimInput.value);
        let cycle_ratio = Number(cyclicityInput.value);

        if (cycle_ratio >= 0.5 || cycle_ratio < 0) {
            window.alert('Invalid Input for fraction of cycles.');
            return;
        }
        if (dim < 0) {
            window.alert('Invalid Input for dimension of maze.');
            return;
        }
        adjList = genMazeByDfs(genAdjList(dim), cycle_ratio);
        drawGraph(adjList, context);
    });

    solveButton.addEventListener('click', function() {
        // console.log(adjList);
        if (!adjList) {
            return;
        }

        let res = astar(adjList, 0, adjList.length - 1);
        drawPath(adjList, res, context);
    });


    function calcCoordinate(indx, n, xSep, ySep) {
        const rowIndx = Math.floor(indx / n);
        const colIndx = indx % n;
        const startX = rowIndx * ySep;
        const startY = colIndx * xSep;

        return [startX, startY];
    }

    // Function to draw the graph on the canvas
    function drawGraph(adjList, context) {
        const height = canvas.height;
        const width = canvas.width;
        const N = adjList.length;
        const n = Math.sqrt(N);
        const pad = height / (n + 1);
        const xSep = (height - 2 * pad) / (n - 1);
        const ySep = (width - 2 * pad) / (n - 1);

        const lineWidth = xSep / 2;

        // Clear the canvas
        context.clearRect(0, 0, canvas.width, canvas.height);

        context.fillStyle = '#000' // black background
        context.fillRect(0, 0, canvas.width, canvas.height)

        // Draw edges
        for (let currNode = 0; currNode < N; currNode++) {
            const [startX, startY] = calcCoordinate(currNode, n, xSep, ySep);

            context.lineWidth = lineWidth;

            context.fillStyle = '#FFF';
            context.fillRect(startX - lineWidth / 2 + pad, startY - lineWidth / 2 + pad, lineWidth, lineWidth); // (x, y, width, height)

            context.strokeStyle = '#FFF';

            /**
             * fing neighbour of i
             * find coordinates of the neighbour.
             */
            for (let neighbor of adjList[currNode]) {
                const [neighX, neighY] = calcCoordinate(neighbor, n, xSep, ySep);
                context.beginPath();
                context.moveTo(startX + pad, startY + pad);
                context.lineTo(neighX + pad, neighY + pad);
                context.stroke();
            }
        }

        // mark start and end
        context.fillStyle = '#FFF';
        // start
        context.fillRect(0 - lineWidth / 2 + pad, 0, lineWidth, 0 - lineWidth / 2 + pad);
        // end
        context.fillRect(canvas.width - lineWidth / 2 - pad, canvas.height + lineWidth / 2 - pad, lineWidth, pad);
    }


    function drawPath(adjList, pathList, context) {
        
        let lenPath = pathList.length;
        
        const height = canvas.height;
        const width = canvas.width;
        const N = adjList.length;
        const n = Math.sqrt(N);
        const pad = height / (n + 1);
        const xSep = (height - 2 * pad) / (n - 1);
        const ySep = (width - 2 * pad) / (n - 1);
        
        const lineWidth = xSep / 2;
        
        let colour = '#0ab68b';

        let i = 0, j = 1;
        while (j < lenPath) {
            const [startX, startY] = calcCoordinate(pathList[i], n, xSep, ySep);

            context.lineWidth = lineWidth;

            context.fillStyle = colour;
            context.fillRect(startX - lineWidth / 2 + pad, startY - lineWidth / 2 + pad, lineWidth, lineWidth); // (x, y, width, height)

            context.strokeStyle = colour;

            const [endX, endY] = calcCoordinate(pathList[j], n, xSep, ySep);
            
            context.beginPath();
            context.moveTo(startX + pad, startY + pad);
            context.lineTo(endX + pad, endY + pad);
            context.stroke();

            i++;
            j++;
        }

        // draw the goal box
        const [goalX, goalY] = calcCoordinate(pathList[pathList.length - 1], n, xSep, ySep);
        context.fillStyle = colour;
        context.fillRect(goalX - lineWidth / 2 + pad, goalY - lineWidth / 2 + pad, lineWidth, lineWidth);

        // mark start and end
        context.fillStyle = colour;
        // start
        context.fillRect(0 - lineWidth / 2 + pad, 0, lineWidth, 0 - lineWidth / 2 + pad);
        // end
        context.fillRect(canvas.width - lineWidth / 2 - pad, canvas.height + lineWidth / 2 - pad, lineWidth, pad);
    }
});







