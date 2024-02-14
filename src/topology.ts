type DAG = Record<string, string[]>;

function topologicalSort(graph: DAG) {
  const visited = new Set<string>();
  const queue: string[] = [];

  function visit(node: string) {
    if (visited.has(node)) return;

    visited.add(node);

    const neighbors = graph[node] || [];
    neighbors.forEach((neighbor) => visit(neighbor));

    queue.push(node);
  }

  Object.keys(graph).forEach(visit);

  return queue;
}

export function topologicalGroup(graph: DAG) {
  const sorted = topologicalSort(graph);
  const groups: string[][] = [[]];

  let lastGroup: string[] = groups[0];
  let lastNode: string | null = null;
  sorted.forEach((node) => {
    const neighbors = graph[node] || [];
    // If the last node is a neighbor of the current node, start a new group
    if (lastNode && neighbors.includes(lastNode)) {
      lastGroup = [];
      groups.push(lastGroup);
    }

    lastGroup.push(node);
    lastNode = node;
  });

  return groups;
}
