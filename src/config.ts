import { BootScene } from "./scenes/BootScene";
import { GameScene } from "./scenes/GameScene";
import { MenuScene } from "./scenes/MenuScene";

export const GameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Bubble Master',
  version: '1.0.0',
  width: 375,
  height: 667,
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
  scene: [BootScene,MenuScene,GameScene]
};