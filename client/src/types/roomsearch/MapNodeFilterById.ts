import { MapNode } from "../graph/MapNode";
import { MapNodeFilter } from "./MapNodeFilter";

export class MapNodeFilterById extends MapNodeFilter{
    destinationId: string;

    constructor(destinationId: string){
        super();
        this.destinationId = destinationId
    }

    satisfiedBy(node: MapNode): boolean {
        return (node instanceof MapNode && node.id == this.destinationId);
    }
}