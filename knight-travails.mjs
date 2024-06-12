function generatePaths(key) {
  const xPos = parseInt(key.split(",")[0]);
  const yPos = parseInt(key.split(",")[1]);
  const movesAllowed = [
    "1,2",
    "2,1",
    "1,-2",
    "2,-1",
    "-1,-2",
    "-2,-1",
    "-1,2",
    "-2,1",
  ];

  return movesAllowed.reduce((possibleMoves, move) => {
    const finalX = xPos + parseInt(move.split(",")[0]);
    const finalY = yPos + parseInt(move.split(",")[1]);
    if (finalX >= 0 && finalX <= 7 && finalY >= 0 && finalY <= 7) {
      return [...possibleMoves, `${finalX},${finalY}`];
    }
    return possibleMoves;
  }, []);
}

function generateAdjacencyLists() {
  const listsDict = {};
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const key = `${i},${j}`;
      listsDict[key] = generatePaths(key);
    }
  }

  return listsDict;
}

function searchPath(queue, adjacencyListDict, goalEdge) {
  if (queue.includes(goalEdge)) return [goalEdge];

  const newQueue = queue.reduce(
    (newQueue, edge) => [...newQueue, ...adjacencyListDict[edge]],
    []
  );
  const pathArr = [...searchPath(newQueue, adjacencyListDict, goalEdge)];

  return [
    queue.filter((edge) => adjacencyListDict[edge].includes(pathArr[0]))[0],
    ...pathArr,
  ];
}

function example() {
  const listsDict = generateAdjacencyLists();
  const initialEdge = "7,7";
  const goalEdge = "0,0";

  const movesPath = searchPath([initialEdge], listsDict, goalEdge);
  console.log(
    `You made it in ${
      movesPath.length - 1
    } moves!  Here's your path:${movesPath.reduce(
      (moves, edge) => `${moves}\n[${edge}]`,
      ""
    )}`
  );
}

example();
