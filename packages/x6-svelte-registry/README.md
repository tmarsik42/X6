# x6-svelte-shape

> x6 shape registrar for svelte components
## Usage

```ts
import { Graph } from '@antv/x6'
import 'x6-svelte-shape'
import HelloWorld from './HelloWorld.svelte'

// register
register({
  shape: "svelte-node",
  width: 100,
  height: 100,
  component: HelloWorld
});

// use
graph.addNode({
  shape: "svelte-node",
  x: 50,
  y: 50
});
```
