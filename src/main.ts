import { App } from "./core/app";
import { SceneManager } from "./core/SceneManager";
import { MainMenuScene } from "./scenes/MainMenuScene";
import { ModalManager } from "./ui/ModalManager";

async function main() {
    await App.init();
    await SceneManager.changeScene(new MainMenuScene());
    ModalManager.watchResize()
    
}

main();