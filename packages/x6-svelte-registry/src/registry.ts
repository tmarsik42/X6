import { Graph, Node } from "@antv/x6";
import type { SvelteComponentTyped } from "svelte";

export type SvelteShapeConfig = Node.Properties & {
    shape: string;
    component: SvelteComponentTyped;
    inherit?: string;
};

export const shapeMaps: Record<
    string,
    {
        component: SvelteComponentTyped;
    }
> = {};

export function register(config: SvelteShapeConfig) {
    const { shape, component, inherit, ...others } = config;
    if (!shape) {
        throw new Error("should specify shape in config");
    }
    shapeMaps[shape] = {
        component
    };

    Graph.registerNode(
        shape,
        {
            inherit: inherit || "svelte-shape",
            ...others
        },
        true
    );
}
