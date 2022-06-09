import { Bubble } from "../objects/Bubble";
import { BubblesBoard } from "../objects/BubblesBoard";
import { Shooter } from "../objects/Shooter";
import { TypeGenerator } from "../objects/TypeGenerator";
import { GameContainer } from "../ui/GameContainer";

export class GameScene extends Phaser.Scene {
    public bubblesBoard!: BubblesBoard;
    public gameContainer!: GameContainer;
    public shooter!: Shooter;
    public typeGenerator!: TypeGenerator;

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
        this.typeGenerator = new TypeGenerator(this);
        this.bubblesBoard = new BubblesBoard(this,28 + 16,28,6*2,6*2,1,49);
        this.createShooter();
        this.runContainer();
    }

    update(time: number, delta: number): void {
        this.shooter.update();
    }
}