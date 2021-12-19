const fs = require("fs");

function findPaths(map, currentNode = "start", currentPath = "", paths = []) {
  currentPath += `${currentNode}`;
  if (currentNode === "end") {
    paths.push(currentPath);
    return paths;
  } else {
    currentPath += "-";
    map[currentNode].forEach((node) => {
      const isLowerCase = node.toLowerCase() === node;
      const hasBeenBefore = currentPath.includes(node);
      const hasBeenInSmallCaveTwice = checkHasBeenSmallCaveTwice(currentPath);
      if (node !== "start") {
        if (!isLowerCase) {
          findPaths(map, node, currentPath, paths);
        } else if (!hasBeenBefore) {
          findPaths(map, node, currentPath, paths);
        } else if (!hasBeenInSmallCaveTwice) {
          findPaths(map, node, currentPath, paths);
        }
      }
    });
    return paths;
  }
}

function makeGraph(connections) {
  const graph = {};
  connections.forEach((connection) => {
    const [node1, node2] = connection.split("-");
    if (!graph[node1]) graph[node1] = [node2];
    else graph[node1].push(node2);
    if (!graph[node2]) graph[node2] = [node1];
    else graph[node2].push(node1);
  });
  return graph;
}

function checkHasBeenSmallCaveTwice(path) {
  const smallNodes = path.match(/[a-z]+/g);
  const unique = new Set(smallNodes);
  return unique.size !== smallNodes.length;
}

fs.readFile("./day12/data.txt", "utf-8", (err, data) => {
  const connections = data.split("\n");
  const graph = makeGraph(connections);
  console.log(findPaths(graph).length);
});
