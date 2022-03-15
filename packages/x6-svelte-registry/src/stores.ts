import type { Node } from "@antv/x6";
import { writable, type Writable } from "svelte/store";

export function nodeDataStore(node: Node): Writable<unknown> {
    const data = writable<unknown>({});

    node.on("change:data", (e) => {
        data.set(e.current);
    });

    data.subscribe((value) => {
        node.updateData(value);
    });

    return data;
}
