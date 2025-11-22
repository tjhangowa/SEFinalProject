import { Container } from "pixi.js";
import { App } from "./app";

export class SceneManager {
    private static currentScene: Container | null = null;

    /**
     * Loads a new scene.
     * - Calls scene.load()
     * - Removes existing scene
     * - Adds the new scene to the stage
     */
    static async changeScene(newScene: Container & { load?: () => Promise<void> }) {
        const app = App.pixi;

        // Remove old scene if exists
        if (SceneManager.currentScene) {
            app.stage.removeChild(SceneManager.currentScene);
            SceneManager.currentScene.destroy({ children: true });
        }

        // Load the new scene (supports async load)
        if (newScene.load) {
            await newScene.load();
        }

        // Add to stage
        app.stage.addChild(newScene);
        SceneManager.currentScene = newScene;
    }

    /** Returns the active scene */
    static getScene() {
        return SceneManager.currentScene;
    }
}