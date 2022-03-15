import { Markup, Node, ObjectExt } from "@antv/x6";

type Primer = "rect" | "circle" | "path" | "ellipse" | "polygon" | "polyline";

interface Properties extends Node.Properties {
    primer?: Primer;
}

function getMarkup(primer?: Primer): Markup.JSONMarkup[] {
    const content = Markup.getForeignObjectMarkup();

    return primer
        ? [
              {
                  tagName: primer,
                  selector: "body"
              },
              content
          ]
        : [content];
}

class SvelteShape<P extends Properties = Properties> extends Node<P> {}

SvelteShape.config<Properties>({
    view: "svelte-shape-view",
    markup: getMarkup(),
    attrs: {
        body: {
            fill: "none",
            stroke: "none",
            refWidth: "100%",
            refHeight: "100%"
        },
        fo: {
            refWidth: "100%",
            refHeight: "100%"
        }
    },
    propHooks(metadata: Properties): Properties {
        if (!metadata.markup && metadata.primer) {
            metadata.markup = getMarkup(metadata.primer);
            let attrs = {};
            switch (metadata.primer) {
                case "circle":
                    attrs = {
                        refCx: "50%",
                        refCy: "50%",
                        refR: "50%"
                    };
                    break;
                case "ellipse":
                    attrs = {
                        refCx: "50%",
                        refCy: "50%",
                        refRx: "50%",
                        refRy: "50%"
                    };
                    break;
                default:
                    break;
            }
            metadata.attrs = ObjectExt.merge({}, metadata.attrs || {}, {
                body: {
                    refWidth: null,
                    refHeight: null,
                    ...attrs
                }
            });
        }

        return metadata;
    }
});

Node.registry.register("svelte-shape", SvelteShape, true);
