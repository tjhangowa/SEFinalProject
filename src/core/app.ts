import { Application } from "pixi.js";

export class App {
    static pixi: Application;

    static async init() {
        // Create PIXI Application
        App.pixi = new Application();

        await App.pixi.init({
            width: window.innerWidth,
            height: window.innerHeight,
            antialias: true,
            backgroundAlpha: 1,
        });

        // Attach canvas to DOM
        const container = document.getElementById("pixi-container");
        (container ?? document.body).appendChild(App.pixi.canvas);

        // Enable children sorting for UI layering
        App.pixi.stage.sortableChildren = true;

        // Handle window resize
        window.addEventListener("resize", () => {
            App.pixi.renderer.resize(window.innerWidth, window.innerHeight);
        });
    }
}