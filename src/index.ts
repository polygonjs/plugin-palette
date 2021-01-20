import {PolyEngine} from 'polygonjs-engine/src/engine/Poly';
import {CATEGORY_SOP} from 'polygonjs-engine/src/engine/poly/registers/nodes/Category';

import {ExtendedGeoNodeChildrenMap} from './ExtendedGeoNodeChildrenMap';
export {ExtendedGeoNodeChildrenMap};

import {PaletteSopOperation} from './core/operations/sop/Palette';
import {PaletteSopNode} from './engine/nodes/sop/Palette';
import {PolyPlugin} from 'polygonjs-engine/src/engine/poly/registers/plugins/Plugin';
function PolygonjsPluginPalette(poly: PolyEngine) {
	poly.registerOperation(PaletteSopOperation);
	poly.registerNode(PaletteSopNode, CATEGORY_SOP.RENDER);
}
export const polyPluginPalette = new PolyPlugin('palette', PolygonjsPluginPalette, {
	libraryName: 'polygonjs-plugin-palette',
});
