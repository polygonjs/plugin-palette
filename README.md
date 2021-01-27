# Polygonjs Palette Plugin

This adds a Palette SOP node to the [Polygonjs webgl engine](https://polygonjs.com).

This wraps the work done in https://github.com/kgolid/chromotome into a node that can be used with all the other nodes available on Polygonjs.

See [example scene](https://github.com/polygonjs/example-plugin-palette):

![Spheres with colors defined with the Palette node](https://github.com/polygonjs/example-plugin-palette/blob/main/doc/palette_examples.jpg?raw=true)

<p>
  <a href="https://github.com/polygonjs/example-plugin-palette"><img width="274" src="https://github.com/polygonjs/example-plugin-palette/blob/main/doc/plugin-palette.001.gif?raw=true" /></a>
</p>

# Install

Import the plugin:

`yarn add @polygonjs/plugin-palette`

And register the plugin in the function `configurePolygonjs` in the file `PolyConfig.js` so that the palette node can be accessible in both the editor and your exported scene:

```js
import {polyPluginPalette} from '@polygonjs/plugin-palette/dist/src/index';

export function configurePolygonjs(poly) {
	poly.registerPlugin(polyPluginPalette);
}
```
