import Map from "../components/Map";
import { allGraphData } from "../data/AllGraphData";
import { submaps } from "../data/submaps";
import { SubmapProviderImpl } from "../logic/impl/SubmapProviderImpl";
import { createGraph } from "../logic/impl/graph/GraphFactory";
import { GraphImpl } from "../logic/impl/graph/GraphImpl";
import { Graph } from "../logic/interfaces/Graph";
import { MapNode } from "../types/graph/MapNode";
import { NavigationNode } from '../types/navigation/NavigationNode';
import { NavigationStep } from "../types/navigation/NavigationStep";

export default function GraphPage(){
    return(
        <div className="relative w-fill mx-auto my-0">
            {submaps.map(submap => {
                const navSteps = navigationStepWithAllNodesFromTheSubmap(submap.id);
                return (
                    <div key={submap.id}>
                        <Map layoutImage={submap.path} 
                            enableDrawNodes={true}
                            width={submap.width}
                            height={submap.height}
                            navStep={navSteps}/>
                        <Separator />
                    </div>
                );
            })}
        </div>
    );
}

function Separator() {
    return <hr className="h-4 my-8 bg-gray-600 border-0"></hr>
}

function navigationStepWithAllNodesFromTheSubmap(submapId: number): NavigationStep {

    let startNode = "main_entrance";

    let constructedGraph = createGraph(allGraphData);
    let graph = new GraphImpl(constructedGraph, new SubmapProviderImpl());

    let visited = new Set<string>();
    visited.add(startNode);

    let nodesPath: NavigationNode[] = [];
    makeFlatDfsTree(startNode, submapId, graph, visited, nodesPath);

    return new NavigationStep(nodesPath);
}

function makeFlatDfsTree(
    currentNodeId: string,
    submapId: number,
    graph: Graph,
    visited: Set<string>,
    resultNodes: NavigationNode[],
) {
    let currentNode: MapNode = graph.getNode(currentNodeId);
    const currentNavNode = new NavigationNode(submapId, currentNode.xCoordinate, currentNode.yCoordinate)

    if (currentNode.submapId == submapId) {
        resultNodes.push(currentNavNode);
    }

    graph.getNeighbours(currentNodeId).forEach(element => {
        const edge = `${currentNodeId}==>${element.neighbour.id}`;
        if (!visited.has(edge)) {
            visited.add(edge);

            makeFlatDfsTree(element.neighbour.id, submapId, graph, visited, resultNodes);
        
            if (currentNode.submapId == submapId) {
                resultNodes.push(currentNavNode);
            }
        }
    });
}
