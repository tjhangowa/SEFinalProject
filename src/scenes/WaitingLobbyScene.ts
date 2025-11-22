import { Text } from "pixi.js";
import { BaseScene } from "./BaseScene";
import { App } from "../core/app";
import { createTextButton } from "../ui/TextButton";
import { SceneManager } from "../core/SceneManager";
import { MainMenuScene } from "./MainMenuScene";

export class WaitingLobbyScene extends BaseScene {
    private label!: Text;
    private backButton!: any;

    constructor() {
        super();
    }

    async load() {
        this.createLabel();
        this.createBackButton();
        this.layout();

        window.addEventListener("resize", () => this.layout());
    }

    private createLabel() {
        this.label = new Text("Waiting for Players...", {
            fontFamily: "GameFont",
            fontSize: 72,
            fill: "#FFD700",
            align: "center"
        });

        this.addChild(this.label);
    }

    private createBackButton() {
        this.backButton = createTextButton("BACK", () => {
            SceneManager.changeScene(new MainMenuScene());
        });

        this.addChild(this.backButton);
    }

    private layout() {
        const w = App.pixi.renderer.width;
        const h = App.pixi.renderer.height;

        this.label.x = (w - this.label.width) / 2;
        this.label.y = h * 0.3;

        this.backButton.x = w / 2;
        this.backButton.y = h * 0.75;
    }
}