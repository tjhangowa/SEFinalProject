import { Container, Graphics } from "pixi.js";
import { App } from "../core/app";

export class ModalManager {
    static layer: Container;

    // Called once by a scene (ex: MainMenuScene.load())
    static init(parent: Container) {
        ModalManager.layer = new Container();
        ModalManager.layer.zIndex = 999; // Always on top
        parent.addChild(ModalManager.layer);
    }
    static activeModal: Container | null = null;

    static watchResize() {
        window.addEventListener("resize", () => {
            if (!ModalManager.layer) return;

            // Resize overlay
            ModalManager.layer.children.forEach(child => {
                if (child instanceof Graphics) {
                    child.clear();
                    child.beginFill(0x000000, 0.85)
                        .drawRect(0, 0, App.pixi.renderer.width, App.pixi.renderer.height)
                        .endFill();
                }
            });

            // Re-center active modal
            if (ModalManager.activeModal) {
                ModalManager.center(ModalManager.activeModal);

                // Optional: allow modal to re-layout itself if it exposes layout()
                if ((ModalManager.activeModal as any).layout) {
                    (ModalManager.activeModal as any).layout();
                }
            }
        });
    }

    // Remove any active modal
    static clear() {
        if (ModalManager.layer) {
            ModalManager.layer.removeChildren();
        }
        ModalManager.activeModal = null;
    }

    // Utility to center modal panel
    static center(container: Container) {
        const w = App.pixi.renderer.width;
        const h = App.pixi.renderer.height;

        container.x = w / 2;
        container.y = h / 2;
    }

    // Create a dark overlay behind a modal
    static createOverlay(alpha = 0.85): Graphics {
        const overlay = new Graphics();
        overlay.beginFill(0x000000, alpha)
               .drawRect(0, 0, App.pixi.renderer.width, App.pixi.renderer.height)
               .endFill();

        overlay.eventMode = "static"; // Block clicks behind modal
        return overlay;
    }
}