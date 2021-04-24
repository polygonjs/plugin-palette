import {PolyEngine} from '@polygonjs/polygonjs/dist/src/engine/Poly';
import {CATEGORY_SOP} from '@polygonjs/polygonjs/dist/src/engine/poly/registers/nodes/Category';

import {PaletteSopOperation} from './engine/operations/sop/Palette';
import {PaletteSopNode} from './engine/nodes/sop/Palette';
import {PolyPlugin} from '@polygonjs/polygonjs/dist/src/engine/poly/registers/plugins/Plugin';
function PolygonjsPluginPalette(poly: PolyEngine) {
	poly.registerOperation(PaletteSopOperation);
	poly.registerNode(PaletteSopNode, CATEGORY_SOP.RENDER);
}
export const polyPluginPalette = new PolyPlugin('palette', PolygonjsPluginPalette, {
	libraryName: '@polygonjs/plugin-palette',
	libraryImportPath: '@polygonjs/plugin-palette/dist',
});
