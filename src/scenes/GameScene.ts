import { AddingNewBubbleRowManager } from "../objects/AddingNewBubbleRowManager";
import { Bubble } from "../objects/Bubble";
import { BubblesBoard } from "../objects/BubbleBoard/BubblesBoard";
import { Shooter } from "../objects/Shooter/Shooter";
import { TypeGenerator } from "../objects/TypeGenerator";
import { BubblesContainer } from "../ui/BubblesContainer";

export class GameScene extends Phaser.Scene {
    public bubblesBoard!: BubblesBoard;
    public bubblesContainer!: BubblesContainer;
    public shooter!: Shooter;
    public typeGenerator!: TypeGenerator;
    private addingNewBubbleRowManager!: AddingNewBubbleRowManager;
    private background!: Phaser.GameObjects.Image;

    constructor() {
        super({
            key:'GameScene'
        });
    }

    public addBubblesToContainer(bubbles: (Bubble | undefined)[]) {
        const objects = bubbles;
        if(objects == undefined)
            return;
        this.bubblesContainer.addBubbles(objects);
    }

    private createShooter() {
        this.shooter = new Shooter(this);
    }

    private runContainer() {
        this.bubblesContainer.open();
    }

    create() {
        // Variables
        this.background = this.add.image(0,0,'background').setOrigin(0,0);
        // Physics
        this.physics.world.setBoundsCollision(true,true,false,false);
        // Game Objects
        this.bubblesContainer = new BubblesContainer(this,0,0);
        this.add.existing(this.bubblesContainer);
        this.typeGenerator = new TypeGenerator(this);
        this.bubblesBoard = new BubblesBoard(this,28 + 5,0,6,6*2,1,49);
        this.addingNewBubbleRowManager = new AddingNewBubbleRowManager(this);
        this.typeGenerator.resetCurrentType();
        this.createShooter();
        this.runContainer();
        this.bubblesBoard.colliderBubble.gridGroupAndBulletGroup();
    }

    update(time: number, delta: number): void {
        this.addingNewBubbleRowManager.setAddSignalToGrid();
        this.bubblesBoard.update();
        this.shooter.update();
    }
}