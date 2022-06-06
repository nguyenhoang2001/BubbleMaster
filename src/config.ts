import { BootScene } from "./scenes/BootScene";

export const GameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Bubble Master',
  version: '1.0.0',
  width: 800,
  height: 832,
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
      gravity: { y: 475 },
      debug: false
    }
  },
  scene: [BootScene]
};