import {PolyScene} from 'polygonjs-engine/src/engine/scene/PolyScene';
import {ExtendedGeoObjNode} from '../../../../src/engine/nodes/obj/ExtendedGeo';

QUnit.test('palette simple', async (assert) => {
	const scene = new PolyScene();
	const geo1 = scene.root().createNode('geo') as ExtendedGeoObjNode;

	const box1 = geo1.createNode('box');
	const plane = geo1.createNode('plane');
	const copy = geo1.createNode('copy');
	const palette1 = geo1.createNode('palette');
	palette1.setInput(0, plane);
	copy.setInput(0, box1);
	copy.setInput(1, palette1);
	assert.equal(palette1.type(), 'palette');
});
