<svelte:options immutable="{true}" />

<script lang="ts">
    import type { Node } from "@antv/x6";
    import type { ComponentType } from "svelte";

    export let component: ComponentType;

    export let node: Node;

    let width: number;
    let height: number;
    $: node.size(width, height);

    node.on("change:size", () => {
        width = node.size().width;
        height = node.size().height;
    });

    let posX: number;
    let posY: number;
    $: node.position(posX, posY);

    node.on("change:position", () => {
        posX = node.position().x;
        posY = node.position().y;
    });
</script>

<style>
    section {
        width: max-content;
        height: max-content;
    }
</style>

<section>
    <svelte:component
        this="{component}"
        node="{node}"
        bind:width="{width}"
        bind:height="{height}"
        bind:posX="{posX}"
        bind:posY="{posY}"
    />
</section>
