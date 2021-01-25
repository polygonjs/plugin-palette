import {Poly} from '@polygonjs/polygonjs/src/engine/Poly';
import {PolyScene} from '@polygonjs/polygonjs/src/engine/scene/PolyScene';
import {ExtendedGeoObjNode} from './engine/nodes/obj/ExtendedGeo';

// register all nodes
import {AllRegister} from '@polygonjs/polygonjs/src/engine/poly/registers/All';
AllRegister.run();
// register nodes for this plugin
import {polyPluginPalette} from './index';
import {AttribClass} from '@polygonjs/polygonjs/src/core/geometry/Constant';
Poly.registerPlugin(polyPluginPalette);

// create a scene
const scene = new PolyScene();

// create a sphere and plane
const geo = scene.root().createNode('geo') as ExtendedGeoObjNode;
const sphere = geo.createNode('sphere');
const plane = geo.createNode('plane');
const scatter = geo.createNode('scatter');
const palette = geo.createNode('palette');
const copy = geo.createNode('copy');
const attribPromote = geo.createNode('attribPromote');
const material = geo.createNode('material');

const materials = scene.root().createNode('materials');
const meshBasicMat = materials.createNode('meshBasic');
meshBasicMat.p.useVertexColors.set(1);

sphere.p.radius.set(0.2);
plane.p.size.set([4, 4]);
scatter.p.pointsCount.set(200);
scatter.setInput(0, plane);
palette.p.palette.set(1);
palette.setInput(0, scatter);
copy.setInput(0, sphere);
copy.setInput(1, palette);
copy.p.copyAttributes.set(1);
copy.p.attributesToCopy.set('color');
attribPromote.setInput(0, copy);
attribPromote.p.classFrom.set(AttribClass.OBJECT);
attribPromote.p.classTo.set(AttribClass.VERTEX);
attribPromote.p.name.set('color');
material.setInput(0, attribPromote);
material.p.material.set(meshBasicMat.fullPath());
material.flags.display.set(true);

// add a light
scene.root().createNode('hemisphereLight');

// create a camera
const perspectiveCamera1 = scene.root().createNode('perspectiveCamera');
perspectiveCamera1.p.t.set([5, 5, 5]);
// add orbit_controls
const events1 = perspectiveCamera1.createNode('events');
const orbitsControls = events1.createNode('cameraOrbitControls');
perspectiveCamera1.p.controls.setNode(orbitsControls);

// create viewer
perspectiveCamera1.createViewer(document.getElementById('app')!);

// make some nodes globals to access in html controls
(window as any).palette = palette;
(window as any).scatter = scatter;
