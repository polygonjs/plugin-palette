/**
 * Loads a palette and sets the value of each input point to one of the colors.
 *
 * @remarks
 * This is using [https://github.com/kgolid/chromotome#readme](https://github.com/kgolid/chromotome#readme)
 *
 */
import {TypedSopNode} from 'polygonjs-engine/src/engine/nodes/sop/_Base';
import {CoreGroup} from 'polygonjs-engine/src/core/geometry/Group';
import {PaletteSopOperation} from '../../../core/operations/sop/Palette';
import {NodeParamsConfig, ParamConfig} from 'polygonjs-engine/src/engine/nodes/utils/params/ParamsConfig';
import {VisibleIfParamOptions} from 'polygonjs-engine/src/engine/params/utils/OptionsController';
import {Color} from 'three/src/math/Color';

import '../../../core/operations/sop/chromotone';
import {getAll} from 'chromotome';
import {BaseNodeType} from 'polygonjs-engine/src/engine/nodes/_Base';
import {Number3} from 'polygonjs-engine/src/types/GlobalTypes';
import {ColorConversion} from 'polygonjs-engine/src/core/Color';

interface Palette {
	background: string;
	colors: string[];
	name: string;
	size: number;
}

const ALL_PALETTES: Palette[] = getAll();
const PALETTES_BY_NAME: Map<string, Palette> = new Map();
const USED_PALETTES: Palette[] = [];
let maxFoundColorsCount: number = 0;
const minColorsAllowed = 3;
const maxColorsAllowed = 5;
// let paletteWithMaxColors: Palette | undefined = undefined;
for (let palette of ALL_PALETTES) {
	const colorsCount = palette.colors.length;
	if (colorsCount >= minColorsAllowed && colorsCount <= maxColorsAllowed) {
		PALETTES_BY_NAME.set(palette.name, palette);
		USED_PALETTES.push(palette);
		if (maxFoundColorsCount < colorsCount) {
			maxFoundColorsCount = colorsCount;
			// paletteWithMaxColors = palette;
		}
	}
}
// const sortedPalettes = USED_PALETTES.sort((a, b) => a.colors.length - b.colors.length);
const SORTED_PALETTE_NAMES: string[] = USED_PALETTES.map((p) => p.name).sort();
const DEFAULT = PaletteSopOperation.DEFAULT_PARAMS;

function visibleIfColorsCountAtLeast(minVal: number): VisibleIfParamOptions[] {
	const options: VisibleIfParamOptions[] = [];
	for (let i = minVal; i <= maxFoundColorsCount; i++) {
		options.push({colorsCount: i});
	}
	return options;
}
class PaletteSopParamsConfig extends NodeParamsConfig {
	/** @param name of the palette */
	palette = ParamConfig.INTEGER(DEFAULT.palette, {
		menu: {
			entries: SORTED_PALETTE_NAMES.map((name, value) => {
				return {name: name, value};
			}),
		},
		callback: (node: BaseNodeType) => {
			PaletteSopNode.PARAM_CALLBACK_updateColors(node as PaletteSopNode);
		},
	});
	/** @param click to set the node to the next palette */
	pickNext = ParamConfig.BUTTON(null, {
		callback: (node: BaseNodeType) => {
			PaletteSopNode.PARAM_CALLBACK_pickNext(node as PaletteSopNode);
		},
	});
	/** @param click to set the node to the previous palette */
	pickPrevious = ParamConfig.BUTTON(null, {
		callback: (node: BaseNodeType) => {
			PaletteSopNode.PARAM_CALLBACK_pickPrevious(node as PaletteSopNode);
		},
	});
	/** @param click to set the node to a random palette */
	pickRandom = ParamConfig.BUTTON(null, {
		callback: (node: BaseNodeType) => {
			PaletteSopNode.PARAM_CALLBACK_pickRandom(node as PaletteSopNode);
		},
	});
	colorsCount = ParamConfig.INTEGER(DEFAULT.colorsCount, {
		hidden: true,
		range: [0, maxFoundColorsCount],
	});
	sep = ParamConfig.SEPARATOR();
	/** @param palette color 1 */
	color1 = ParamConfig.COLOR(DEFAULT.color1.toArray() as Number3, {
		visibleIf: visibleIfColorsCountAtLeast(1),
		conversion: ColorConversion.SRGB_TO_LINEAR,
	});
	/** @param palette color 2 */
	color2 = ParamConfig.COLOR(DEFAULT.color2.toArray() as Number3, {
		visibleIf: visibleIfColorsCountAtLeast(2),
		conversion: ColorConversion.SRGB_TO_LINEAR,
	});
	/** @param palette color 3 */
	color3 = ParamConfig.COLOR(DEFAULT.color3.toArray() as Number3, {
		visibleIf: visibleIfColorsCountAtLeast(3),
		conversion: ColorConversion.SRGB_TO_LINEAR,
	});
	/** @param palette color 4 */
	color4 = ParamConfig.COLOR(DEFAULT.color4.toArray() as Number3, {
		visibleIf: visibleIfColorsCountAtLeast(4),
		conversion: ColorConversion.SRGB_TO_LINEAR,
	});
	/** @param palette color 5 */
	color5 = ParamConfig.COLOR(DEFAULT.color5.toArray() as Number3, {
		visibleIf: visibleIfColorsCountAtLeast(5),
		conversion: ColorConversion.SRGB_TO_LINEAR,
	});
}
const ParamsConfig = new PaletteSopParamsConfig();

export class PaletteSopNode extends TypedSopNode<PaletteSopParamsConfig> {
	params_config = ParamsConfig;
	static type() {
		return 'palette';
	}

	initializeNode() {
		this.io.inputs.setCount(1);
		this.io.inputs.initInputsClonedState(PaletteSopOperation.INPUT_CLONED_STATE);

		this.params.onParamsCreated('palette_init', () => {
			this.paramCallbackUpdateColors();
		});
	}

	private _operation: PaletteSopOperation | undefined;
	cook(input_contents: CoreGroup[]) {
		this._operation = this._operation || new PaletteSopOperation(this._scene, this.states);
		const core_group = this._operation.cook(input_contents, this.pv);
		this.setCoreGroup(core_group);
	}

	//
	//
	// CALLBACKS
	//
	//

	static PARAM_CALLBACK_pickNext(node: PaletteSopNode) {
		node.paramCallbackPickNext();
	}
	static PARAM_CALLBACK_pickPrevious(node: PaletteSopNode) {
		node.paramCallbackPickPrevious();
	}
	static PARAM_CALLBACK_pickRandom(node: PaletteSopNode) {
		node.paramCallbackPickRandom();
	}

	private paramCallbackPickNext() {
		const nextIndex = this.pv.palette < SORTED_PALETTE_NAMES.length - 1 ? this.pv.palette + 1 : 0;
		this._batchUpdatesWithPalette(nextIndex);
	}
	private paramCallbackPickPrevious() {
		const previousIndex = this.pv.palette == 0 ? SORTED_PALETTE_NAMES.length - 1 : this.pv.palette - 1;
		this._batchUpdatesWithPalette(previousIndex);
	}
	private paramCallbackPickRandom() {
		const randomIndex = Math.floor(Math.random() * SORTED_PALETTE_NAMES.length);
		this._batchUpdatesWithPalette(randomIndex);
	}

	private _batchUpdatesWithPalette(palette: number) {
		this.scene().batchUpdates(() => {
			this.p.palette.set(palette);
			this._update_colors();
		});
	}

	static PARAM_CALLBACK_updateColors(node: PaletteSopNode) {
		node.paramCallbackUpdateColors();
	}

	private _tmp_color = new Color();
	private _tmp_color_array: Number3 = [1, 1, 1];
	private paramCallbackUpdateColors() {
		this.scene().batchUpdates(() => {
			this._update_colors();
		});
	}
	private _update_colors() {
		const name = SORTED_PALETTE_NAMES[this.pv.palette];
		const palette = PALETTES_BY_NAME.get(name) as Palette;
		const colorParams = [this.p.color1, this.p.color2, this.p.color3, this.p.color4, this.p.color5];
		this.p.colorsCount.set(palette.colors.length);
		for (let i = 0; i < palette.colors.length; i++) {
			const color = palette.colors[i];
			const param = colorParams[i];
			if (color && param) {
				this._tmp_color.set(color);
				this._tmp_color.toArray(this._tmp_color_array);
				param.set(this._tmp_color_array);
			}
		}
		this.p.colorsCount.set(palette.colors.length);
	}
}
