import {AllRegister} from 'polygonjs-engine/src/engine/poly/registers/All';
AllRegister.run();
import {polyPluginPalette} from '../src/index';
import {Poly} from 'polygonjs-engine/src/engine/Poly';
Poly.registerPlugin(polyPluginPalette);

import './helpers/setup';
import './tests';

QUnit.start();
