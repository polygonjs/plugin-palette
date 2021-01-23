import {AllNodesRegister} from '@polygonjs/engine/src/engine/poly/registers/nodes/All';
import {Poly} from '@polygonjs/engine/src/engine/Poly';
AllNodesRegister.run(Poly);
import {polyPluginPalette} from '../src/index';
Poly.registerPlugin(polyPluginPalette);

import './helpers/setup';
import './tests';

QUnit.start();
