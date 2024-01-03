class Node {
    constructor(id, heuristic) {
        this.id = id;
        this.heuristic = heuristic;
        this.g = Infinity;  // Cost from start to this node
        this.f = Infinity;  // g + heuristic
        this.parent = null; // Parent node in the path
    }
}

function astar(graph, start, goal) {
    const openSet = [];
    const closedSet = new Set();

    const startNode = new Node(start, heuristic(start, goal, graph.length));
    startNode.g = 0;
    startNode.f = startNode.heuristic;
    openSet.push(startNode);

    while (openSet.length > 0) {
        openSet.sort((a, b) => a.f - b.f);
        const current = openSet.shift();

        if (current.id === goal) {
            return reconstructPath(current);
        }

        closedSet.add(current.id);

        for (const neighborId of graph[current.id]) {
            if (closedSet.has(neighborId)) {
                continue;
            }

            const neighbor = new Node(neighborId, heuristic(neighborId, goal, graph.length));
            const tentativeG = current.g + 1;  // Assuming unweighted edges


            neighbor.parent = current;
            neighbor.g = tentativeG;
            neighbor.f = neighbor.g + neighbor.heuristic;

            let indx;
            indx = search(openSet, neighborId);

            if (indx === -1) {
                openSet.push(neighbor);
            } else {
                // update coz that node already exists in the set 
                if (neighbor.g < openSet[indx].g) {
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
        path.unshift(node.id);
    }
    return path;
}

function heuristic(node, goal, n) {
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

