import {GeoNodeChildrenMap} from '@polygonjs/polygonjs/dist/src/engine/poly/registers/nodes/Sop';
import {PaletteSopNode} from './engine/nodes/sop/Palette';

export interface ExtendedGeoNodeChildrenMap extends GeoNodeChildrenMap {
	palette: PaletteSopNode;
}
