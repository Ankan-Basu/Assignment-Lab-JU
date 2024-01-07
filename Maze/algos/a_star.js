class Node {
    constructor(id, heuristic) {
        this.id = id;
        this.heuristic = heuristic;
        this.g = Infinity;  // Cost from start to this node
        this.f = Infinity;  // g + heuristic
        this.parent = null; // Parent node in the path
    }
}


function getMinF(arr) {
    let bestF = Infinity;
    let indx = -1;

    for (let i=0; i<arr.length; i++) {
        if (arr[i].f < bestF) {
            bestF = arr[i].f;
            indx = i;
        } else if (arr[i].f === bestF) {
            if (arr[i].h < arr[indx].h) {
                bestF = arr[i].f;
                indx = i;
            }
        }
    }
    // swap to bring the elem to end 
    let tmp = arr[indx];
    arr[indx] = arr[arr.length - 1];
    arr[arr.length - 1] = tmp;

    return arr;
}

function astar(graph, start, goal) {
    let openSet = [];
    const closedSet = new Set();

    const n = Math.floor(Math.sqrt(graph.length));

    const startNode = new Node(start, heuristic(start, goal, n));
    startNode.g = 0;
    startNode.f = startNode.heuristic;
    openSet.push(startNode);

    while (openSet.length > 0) {
        // openSet.sort((a, b) => a.f - b.f);
        openSet = getMinF(openSet);
        const current = openSet.pop();
   

        if (current.id === goal) {
            return reconstructPath(current);
        }

        closedSet.add(current.id);

        for (const neighborId of graph[current.id]) {
            if (closedSet.has(neighborId)) {
                continue;
            }

            const neighbor = new Node(neighborId, heuristic(neighborId, goal, n));
            const tentativeG = current.g + 1; // unweighted edge

            neighbor.parent = current;
            neighbor.g = tentativeG;
            neighbor.f = tentativeG + neighbor.heuristic;

            let indx;
            indx = search(openSet, neighborId);

            if (indx === -1) {
                openSet.push(neighbor);
            } else {
                // update coz that node already exists in the set 
                if (neighbor.f < openSet[indx].f) {
                    openSet[indx] = neighbor;
                }
            }
        }
    }

    return null; // No path found
}


function search(set, nodeId) {
    let indx = -1;
    for (let i = 0; i < set.length; i++) {
        if (set[i].id === nodeId) {
            indx = i;
            break;
        }
    }
    return indx;
}

function reconstructPath(node) {
    const path = [node.id];
    while (node.parent !== null) {
        node = node.parent;
        // path.unshift(node.id);
        path.push(node.id)
    }
    console.log(path.length);
    return path;
}

function heuristic2(node, goal, n) {
    // heuristic : euclidean distance
    const goalRow = Math.floor(goal / n);
    const nodeRow = Math.floor(node / n);
    const goalCol = Math.floor(goal % n);
    const nodeCol = Math.floor(node % n);

    const x = Math.abs(goalCol - nodeCol);
    const y = Math.abs(goalRow - nodeRow);

    const dist = Math.pow((Math.pow(x, 2) + Math.pow(y, 2)), 0.5);
    return dist;
}

function heuristic(node, goal, n) {
    const goalRow = Math.floor(goal / n);
    const nodeRow = Math.floor(node / n);
    const goalCol = Math.floor(goal % n);
    const nodeCol = Math.floor(node % n);

    const x = Math.abs(goalCol - nodeCol);
    const y = Math.abs(goalRow - nodeRow);

    const dist = (x+y);

    // console.log(`n=${n}, node=${node}, goal=${goal},\
    // goalRow=${goalRow}, goalCol=${goalCol},\
    // nodeRow=${nodeRow}, nodeCol=${nodeCol},\
    // x=${x}, y=${y}, dist=${dist}`);
    return dist;
}

