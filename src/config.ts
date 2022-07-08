import { BootScene } from "./scenes/BootScene";
import { GameScene } from "./scenes/GameScene";
import { HudScene } from "./scenes/HudScene";
import { MenuScene } from "./scenes/MenuScene";
import { SceneManager } from "./scenes/SceneManager";

export const GameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Bubble Master',
  version: '1.0.0',
  width: 375 * 2 - 40,
  height: 667 * 2 + 40,
  zoom: 0.5,
  type: Phaser.AUTO,
  scale: {
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  parent: 'game',
  input: {
    keyboard: true,
    mouse:true
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: true
    }
  },
  scene: [BootScene,MenuScene,GameScene,HudScene,SceneManager]
};