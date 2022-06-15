import { Bubble } from "../objects/Bubble";
import { BubblesBoard } from "../objects/BubbleBoard/BubblesBoard";
import { Shooter } from "../objects/Shooter";
import { TypeGenerator } from "../objects/TypeGenerator";
import { BubblesContainer } from "../ui/BubblesContainer";

export class GameScene extends Phaser.Scene {
    public bubblesBoard!: BubblesBoard;
    public bubblesContainer!: BubblesContainer;
    public shooter!: Shooter;
    public typeGenerator!: TypeGenerator;

    constructor() {
        super({
            key:'GameScene'
        });
    }

    public addBubblesToContainer(bubbles: Bubble[]) {
        this.bubblesContainer.addBubbles(bubbles);
    }

    private createShooter() {
        this.shooter = new Shooter(this);
    }

    private runContainer() {
        this.bubblesContainer.open();
    }

    create() {
        this.bubblesContainer = new BubblesContainer(this,0,0);
        this.add.existing(this.bubblesContainer);
        this.typeGenerator = new TypeGenerator(this);
        this.bubblesBoard = new BubblesBoard(this,28 + 16,0,6*2,6*2,1,49);
        this.typeGenerator.resetCurrentType();
        this.createShooter();
        this.runContainer();
    }

    update(time: number, delta: number): void {
        this.shooter.update();
        this.bubblesBoard.update();
    }
}