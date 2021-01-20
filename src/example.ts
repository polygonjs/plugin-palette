// import {Poly} from 'polygonjs-engine/src/engine/Poly';
// import {PolyScene} from 'polygonjs-engine/src/engine/scene/PolyScene';
// import {ExtendedGeoObjNode} from './engine/nodes/obj/ExtendedGeo';

// // register all nodes
// import {AllRegister} from 'polygonjs-engine/src/engine/poly/registers/All';
// AllRegister.run();
// // register nodes for this plugin
// import {polyPluginOcclusion} from './index';
// Poly.registerPlugin(polyPluginOcclusion);

// // create a scene
// const scene = new PolyScene();

// // create a sphere and plane
// const geo = scene.root().createNode('geo') as ExtendedGeoObjNode;
// const sphere = geo.createNode('sphere');
// const plane = geo.createNode('plane');
// const merge = geo.createNode('merge');
// merge.setInput(0, sphere);
// merge.setInput(1, plane);
// plane.p.size.set([4, 4]);
// plane.p.stepSize.set(0.02);
// plane.p.center.y.set(-1);

// // add occlusion
// const occlusion = geo.createNode('occlusion');
// occlusion.setInput(0, merge);

// // add material
// const material = geo.createNode('material');
// material.setInput(0, occlusion);
// material.flags.display.set(true);
// const MAT = scene.root().createNode('materials');
// const meshBasicBuilder = MAT.createNode('meshBasicBuilder');
// const output = meshBasicBuilder.createNode('output');
// const attribute = meshBasicBuilder.createNode('attribute');
// const complement = meshBasicBuilder.createNode('complement');
// const floatToVec3 = meshBasicBuilder.createNode('floatToVec3');
// output.setInput('color', floatToVec3);
// floatToVec3.setInput('x', complement);
// floatToVec3.setInput('y', complement);
// floatToVec3.setInput('z', complement);
// complement.setInput(0, attribute);
// attribute.p.name.set('occlusion');
// material.p.material.setNode(meshBasicBuilder);

// // add a light
// scene.root().createNode('hemisphereLight');

// // create a camera
// const perspectiveCamera1 = scene.root().createNode('perspectiveCamera');
// perspectiveCamera1.p.t.set([5, 5, 5]);
// // add orbit_controls
// const events1 = perspectiveCamera1.createNode('events');
// const orbitsControls = events1.createNode('cameraOrbitControls');
// perspectiveCamera1.p.controls.setNode(orbitsControls);

// // create viewer
// perspectiveCamera1.createViewer(document.getElementById('app')!);

// // make some noes globals to access in html controls
// (window as any).sphere = sphere;
