import { Dom, NodeView } from "@antv/x6";
import type { SvelteComponentTyped } from "svelte";
import type { SvelteShape } from "./node";
import { shapeMaps } from "./registry";
import NodeWrapper from "./NodeWrapper.svelte";
import type { FlagManager } from "@antv/x6/lib/view/flag";
import type { CellView } from "@antv/x6/lib/view/cell";

const SVELTE_ACTION = "svelte" as FlagManager.Action;

export interface SvelteShapeViewConfig extends CellView.Options {
    bootstrap: (typeof SVELTE_ACTION)[];
    actions: {
        component: typeof SVELTE_ACTION;
    };
}

export class SvelteShapeView extends NodeView<SvelteShape> {
    private component?: SvelteComponentTyped;

    public getComponentContainer() {
        return this.selectors?.foContent as HTMLDivElement | undefined;
    }

    public confirmUpdate(flag: number) {
        const ret = super.confirmUpdate(flag);

        return this.handleAction(ret, SVELTE_ACTION, () => {
            this.renderSvelteComponent();
        });
    }

    protected renderSvelteComponent() {
        this.unmountSvelteComponent();
        const container = this.getComponentContainer();
        const node = this.cell;

        if (container) {
            const content = shapeMaps[node.shape];
            this.component = new NodeWrapper({
                target: container,
                props: { component: content.component, node }
            });
        }
    }

    protected unmountSvelteComponent() {
        if (this.component) {
            this.component.$destroy();
            this.component = undefined;
        }
    }

    public onMouseDown(e: Dom.MouseDownEvent, x: number, y: number) {
        const target = e.target as Element;
        const tagName = target.tagName.toLowerCase();
        if (tagName === "input") {
            const type = target.getAttribute("type");
            if (
                !type ||
                ["text", "password", "number", "email", "search", "tel", "url"].includes(type)
            ) {
                return;
            }
        }

        super.onMouseDown(e, x, y);
    }

    public unmount() {
        this.unmountSvelteComponent();
        super.unmount();

        return this;
    }
}

SvelteShapeView.config<SvelteShapeViewConfig>({
    bootstrap: [SVELTE_ACTION],
    actions: { component: SVELTE_ACTION }
});

NodeView.registry.register("svelte-shape-view", SvelteShapeView, true);
