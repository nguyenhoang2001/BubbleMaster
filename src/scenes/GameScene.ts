import { Bubble } from "../objects/Bubble";
import { BubblesBoard } from "../objects/BubblesBoard";
import { Shooter } from "../objects/Shooter";
import { GameContainer } from "../ui/GameContainer";

export class GameScene extends Phaser.Scene {
    private bubblesBoard!: BubblesBoard;
    public gameContainer!: GameContainer;
    private shooter!: Shooter;

    constructor() {
        super({
            key:'GameScene'
        });
    }

    public addBubblesToContainer(bubbles: Bubble[]) {
        this.gameContainer.addBubbles(bubbles);
    }

    private createShooter() {
        this.shooter = new Shooter(this);
    }

    private runContainer() {
        this.gameContainer.open();
    }

    create() {
        this.gameContainer = new GameContainer(this,0,0);
        this.add.existing(this.gameContainer);
        this.bubblesBoard = new BubblesBoard(this,28,28,6,6,1,49,['blackBubble','blueBubble','cyanBubble','grayBubble','greenBubble',
        'pinkBubble','redBubble','violetBubble','yellowBubble']);
        this.createShooter();
        this.runContainer();
    }

    update(time: number, delta: number): void {
        this.shooter.update();
    }
}