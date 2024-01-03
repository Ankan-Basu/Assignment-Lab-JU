function genAdjList(n) {
    let N = n * n;
    const adjList = new Array(N).fill(undefined).map(() => new Array(0));

    for (let i = 0; i < N; i++) {
        if (i + 1 < N && Math.floor(i / n) === Math.floor((i + 1) / n)) {
            adjList[i].push(i + 1);
        }
        if (i - 1 >= 0 && Math.floor(i / n) === Math.floor((i - 1) / n)) {
            adjList[i].push(i - 1);
        }
        if (i + n < N) {
            adjList[i].push(i + n);
        }
        if (i - n >= 0) {
            adjList[i].push(i - n);
        }
    }
    return adjList;
}


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


function genMazeByDfs(adjList, cycle_ratio = 0.12) {
    // console.log("GEN", adjList);
    const stack = [];
    let N = adjList.length;
    let n = Math.floor(Math.sqrt(N));
    const visited = new Array(N).fill(false);
    const resArr = []
    const resAdjList = new Array(N).fill(undefined).map(() => new Array(0));;

    /**
     * Start from 0
     * add edges adj to 0 in the stack
     * pop from stack top
     * if not visited, mark as visited
     * add adjacent edges
     */

    let currNode = 0;
    let tmp = []
    visited[0] = true;
    for (let neighbour of adjList[0]) {
        let edge = [0, neighbour];
        tmp.push(edge);
    }
    shuffleArray(tmp);
    for (let x of tmp) {
        stack.push(x);
    }
    let iter = 0;
    do {
        tmp = []

        for (let neighbour of adjList[currNode]) {
            if (!visited[neighbour]) {
                let edge = [currNode, neighbour];
                tmp.push(edge);
            }
        }
        shuffleArray(tmp);
        for (let x of tmp) {
            stack.push(x);
        }

        let top = stack[stack.length - 1];
        currNode = top[1]

        if (!visited[currNode]) {
            resArr.push(top);
            visited[currNode] = true;
        }
        stack.pop();
        iter++;
    } while (stack.length > 0);


    for (res of resArr) {
        resAdjList[res[0]].push(res[1]);
        resAdjList[res[1]].push(res[0]);
    }

    //  add multi path
    let ratio = cycle_ratio

    let noOfPaths = Math.ceil(N * ratio);


    for (let i = 0; i < noOfPaths; i++) {
        let indx = Math.floor(Math.random() * N);

        if (resAdjList[indx].length === 4) {
            // console.log('Already 4\n');
            i--;
            continue;
        }

        // arr of remaining possible vertices
        let remVertices = [];
        if (indx + 1 < N && Math.floor(indx / n) === Math.floor((indx + 1) / n)) {
            if (!(resAdjList[indx].includes(indx + 1))) {
                remVertices.push(indx + 1);
            }
        }
        if (indx - 1 >= 0 && Math.floor(indx / n) === Math.floor((indx - 1) / n)) {
            if (!(resAdjList[indx].includes(indx - 1))) {
                remVertices.push(indx - 1);
            }
        }
        if (indx + n < N) {
            if (!(resAdjList[indx].includes(indx + n))) {
                remVertices.push(indx + n);
            }
        }
        if (indx - n >= 0) {
            if (!(resAdjList[indx].includes(indx - n))) {
                remVertices.push(indx - n);
            }
        }

        if (remVertices.length == 0) {
            i--;
            continue;
        }

        let choice = Math.floor(Math.random() * remVertices.length);

        resAdjList[indx].push(remVertices[choice]);
        resAdjList[remVertices[choice]].push(indx);
    }

    return resAdjList;
}