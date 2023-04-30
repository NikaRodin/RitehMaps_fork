import { MapNavigatorImpl } from "../src/logic/impl/MapNavigatorImpl";
import { Graph } from "../src/logic/interfaces/Graph";
import { EndNode } from "../src/types/graph/EndNode";
import { HallwayNode } from "../src/types/graph/HallwayNode";
import { MapNode } from "../src/types/graph/MapNode";
import { NeighbourConnection } from "../src/types/graph/NeighbourConnection";
import { MapNodeFilter } from "../src/types/roomsearch/MapNodeFilter";

class MapNodeFilterMock extends MapNodeFilter{
  destinationId: number;

  constructor(destinationId: number){
    super();
    this.destinationId = destinationId
  }
  satisfies(node: MapNode): boolean {
    return (node instanceof MapNode && node.id == this.destinationId);
  }
}

class EndNodesGraphMock implements Graph { 

  private graph = new Map<number, NeighbourConnection[]>([
    [0, [new NeighbourConnection(new EndNode(1, 1, 0, 0), 10),
         new NeighbourConnection(new EndNode(4, 1, 0, 0), 17),
         new NeighbourConnection(new EndNode(3, 1, 0, 0), 4)]],

    [1, [new NeighbourConnection(new EndNode(0, 1, 0, 0), 10),
         new NeighbourConnection(new EndNode(4, 1, 0, 0), 7),
         new NeighbourConnection(new EndNode(2, 1, 0, 0), 3)]],

    [2, [new NeighbourConnection(new EndNode(1, 1, 0, 0), 3)]],

    [3, [new NeighbourConnection(new EndNode(0, 1, 0, 0), 4),
         new NeighbourConnection(new EndNode(4, 1, 0, 0), 15),
         new NeighbourConnection(new EndNode(5, 1, 0, 0), 2)]],

    [4, [new NeighbourConnection(new EndNode(3, 1, 0, 0), 15),
         new NeighbourConnection(new EndNode(1, 1, 0, 0), 7)]],

    [5, [new NeighbourConnection(new EndNode(3, 1, 0, 0), 2)]],
  ]);

  getNode(nodeId: number): MapNode | undefined {
    return this.graph.has(nodeId) ? new EndNode(nodeId, 1, 0, 0) : undefined;
  }

  getNeighbours(nodeId: number): NeighbourConnection[] {
    return this.graph.has(nodeId) ? this.graph.get(nodeId) : [];
  }
}

class HallwaysGraphMock implements Graph { 

  private graph = new Map<number, NeighbourConnection[]>([
    [0, [new NeighbourConnection(new HallwayNode(1, 1, 0, 0, 0, 0), 4),
         new NeighbourConnection(new HallwayNode(7, 1, 0, 0, 0, 0), 8)]],

    [1, [new NeighbourConnection(new HallwayNode(0, 1, 0, 0, 0, 0), 4),
         new NeighbourConnection(new HallwayNode(2, 1, 0, 0, 0, 0), 8),
         new NeighbourConnection(new HallwayNode(7, 1, 0, 0, 0, 0), 11)]],

    [2, [new NeighbourConnection(new HallwayNode(1, 1, 0, 0, 0, 0), 8),
         new NeighbourConnection(new HallwayNode(3, 1, 0, 0, 0, 0), 7),
         new NeighbourConnection(new HallwayNode(5, 1, 0, 0, 0, 0), 4),
         new NeighbourConnection(new HallwayNode(8, 1, 0, 0, 0, 0), 2)]],

    [3, [new NeighbourConnection(new HallwayNode(2, 1, 0, 0, 0, 0), 7),
         new NeighbourConnection(new HallwayNode(4, 1, 0, 0, 0, 0), 9),
         new NeighbourConnection(new HallwayNode(5, 1, 0, 0, 0, 0), 14)]],

    [4, [new NeighbourConnection(new HallwayNode(3, 1, 0, 0, 0, 0), 9),
         new NeighbourConnection(new HallwayNode(5, 1, 0, 0, 0, 0), 10)]],

    [5, [new NeighbourConnection(new HallwayNode(2, 1, 0, 0, 0, 0), 4),
         new NeighbourConnection(new HallwayNode(3, 1, 0, 0, 0, 0), 14),
         new NeighbourConnection(new HallwayNode(4, 1, 0, 0, 0, 0), 10),
         new NeighbourConnection(new HallwayNode(6, 1, 0, 0, 0, 0), 2)]],

    [6, [new NeighbourConnection(new HallwayNode(5, 1, 0, 0, 0, 0), 2),
         new NeighbourConnection(new HallwayNode(7, 1, 0, 0, 0, 0), 1),
         new NeighbourConnection(new HallwayNode(8, 1, 0, 0, 0, 0), 6)]],

    [7, [new NeighbourConnection(new HallwayNode(0, 1, 0, 0, 0, 0), 8),
         new NeighbourConnection(new HallwayNode(1, 1, 0, 0, 0, 0), 11),
         new NeighbourConnection(new HallwayNode(6, 1, 0, 0, 0, 0), 1),
         new NeighbourConnection(new HallwayNode(8, 1, 0, 0, 0, 0), 7)]],

    [8, [new NeighbourConnection(new HallwayNode(2, 1, 0, 0, 0, 0), 2),
         new NeighbourConnection(new HallwayNode(6, 1, 0, 0, 0, 0), 6),
         new NeighbourConnection(new HallwayNode(7, 1, 0, 0, 0, 0), 7)]]
  ]);

  getNode(nodeId: number): MapNode | undefined {
    return this.graph.has(nodeId) ? new HallwayNode(nodeId, 1, 0, 0, 0, 0) : undefined;
  }

  getNeighbours(nodeId: number): NeighbourConnection[] {
    return this.graph.has(nodeId) ? this.graph.get(nodeId) : [];
  }
}

describe('testing findPathToNearestNode() with EndNodes', () => {

  var endNodesGraph = new EndNodesGraphMock;
  var mapNavigator = new MapNavigatorImpl(endNodesGraph);
 
  test('should return correct path from 5 to 2', () => {
    var startNodeId = 5;
    var mapNodeFilter = new MapNodeFilterMock(2);
    var expectedPath = [new EndNode(5, 1, 0, 0), 
                        new EndNode(3, 1, 0, 0),
                        new EndNode(0, 1, 0, 0), 
                        new EndNode(1, 1, 0, 0), 
                        new EndNode(2, 1, 0, 0)];

    var path = mapNavigator.findPathToNearestNode(startNodeId, mapNodeFilter)
    expect(path).toEqual(expectedPath);
  });

  test('should return only one node', () => {
    var startNodeId = 0;
    var mapNodeFilter = new MapNodeFilterMock(0);
    var expectedPath = [new EndNode(0, 1, 0, 0)];

    var path = mapNavigator.findPathToNearestNode(startNodeId, mapNodeFilter)
    expect(path).toEqual(expectedPath);
  });

  test('should throw destination error', () => {
    var startNodeId = 5;
    var mapNodeFilter = new MapNodeFilterMock(100);
    var errorMessage = "Destination cannot be reached.";

    expect(() => mapNavigator.findPathToNearestNode(startNodeId, mapNodeFilter)).toThrowError(errorMessage);
  });

  test('should throw start location error', () => {
    var startNodeId = -6;
    var mapNodeFilter = new MapNodeFilterMock(3);
    var errorMessage = "Start location not valid.";

    expect(() => mapNavigator.findPathToNearestNode(startNodeId, mapNodeFilter)).toThrowError(errorMessage);
  });
});

describe('testing findPathToNearestNode() with HallwayNodes', () => {

  var hallwaysGraph = new HallwaysGraphMock;
  var mapNavigator = new MapNavigatorImpl(hallwaysGraph);

  test('should return correct path from 0 to 8', () => {
    var startNodeId = 0;
    var mapNodeFilter = new MapNodeFilterMock(8);
    var expectedPath = [new HallwayNode(0, 1, 0, 0, 0, 0), 
                        new HallwayNode(1, 1, 0, 0, 0, 0), 
                        new HallwayNode(2, 1, 0, 0, 0, 0), 
                        new HallwayNode(8, 1, 0, 0, 0, 0)];
  
    var path = mapNavigator.findPathToNearestNode(startNodeId, mapNodeFilter)
    expect(path).toEqual(expectedPath);
  });

  test('should return correct path from 0 to 4', () => {
    var startNodeId = 0;
    var mapNodeFilter = new MapNodeFilterMock(4);
    var expectedPath = [new HallwayNode(0, 1, 0, 0, 0, 0), 
                        new HallwayNode(7, 1, 0, 0, 0, 0), 
                        new HallwayNode(6, 1, 0, 0, 0, 0), 
                        new HallwayNode(5, 1, 0, 0, 0, 0),
                        new HallwayNode(4, 1, 0, 0, 0, 0)];
  
    var path = mapNavigator.findPathToNearestNode(startNodeId, mapNodeFilter)
    expect(path).toEqual(expectedPath);
  });

  test('should return correct path from 4 to 1', () => {
    var startNodeId = 4;
    var mapNodeFilter = new MapNodeFilterMock(1);
    var expectedPath = [new HallwayNode(4, 1, 0, 0, 0, 0), 
                        new HallwayNode(5, 1, 0, 0, 0, 0), 
                        new HallwayNode(2, 1, 0, 0, 0, 0), 
                        new HallwayNode(1, 1, 0, 0, 0, 0)];
  
    var path = mapNavigator.findPathToNearestNode(startNodeId, mapNodeFilter)
    expect(path).toEqual(expectedPath);
  });

  test('should return only one node', () => {
    var startNodeId = 8;
    var mapNodeFilter = new MapNodeFilterMock(8);
    var expectedPath = [new HallwayNode(8, 1, 0, 0, 0, 0)];
  
    var path = mapNavigator.findPathToNearestNode(startNodeId, mapNodeFilter)
    expect(path).toEqual(expectedPath);
  });

  test('should throw destination error', () => {
    var startNodeId = 7;
    var mapNodeFilter = new MapNodeFilterMock(9);
    var errorMessage = "Destination cannot be reached.";

    expect(() => mapNavigator.findPathToNearestNode(startNodeId, mapNodeFilter)).toThrowError(errorMessage);
  });

  test('should throw start location error', () => {
    var startNodeId = 10;
    var mapNodeFilter = new MapNodeFilterMock(10);
    var errorMessage = "Start location not valid.";

    expect(() => mapNavigator.findPathToNearestNode(startNodeId, mapNodeFilter)).toThrowError(errorMessage);
  });
});