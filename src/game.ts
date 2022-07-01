import 'Phaser';
import { GameConfig } from './config';
import { LogicGame } from './logic/LogicGame';

export class Game extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}

export const logicGame = new LogicGame();

window.addEventListener('load', () => {
  const game = new Game(GameConfig);
});