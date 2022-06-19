import { AddingNewBubbleRowManager } from "../objects/AddingNewBubbleRowManager";
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
    private checkContainer!: boolean;
    private addingNewBubbleRowManager!: AddingNewBubbleRowManager;

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
        this.checkContainer = true;
        // Game Objects
        this.bubblesContainer = new BubblesContainer(this,0,0);
        this.add.existing(this.bubblesContainer);
        this.typeGenerator = new TypeGenerator(this);
        this.bubblesBoard = new BubblesBoard(this,28 + 16,0,6*2,6*2,1,49);
        this.addingNewBubbleRowManager = new AddingNewBubbleRowManager(this);
        this.typeGenerator.resetCurrentType();
        this.createShooter();
        this.runContainer();
        this.bubblesBoard.colliderBubble.gridGroupAndBulletGroup();
    }

    update(time: number, delta: number): void {
        this.checkingContainerRunningAtFirst();
        this.addingNewBubbleRowManager.setAddSignalToGrid();
        this.bubblesBoard.update();
        this.shooter.update();
    }

    private checkingContainerRunningAtFirst() {
        if(this.checkContainer) {
            if(this.bubblesContainer.isRunning) {
                this.shooter.allowShooting = false;
                this.shooter.shootedBubble.body.checkCollision.none = true;
            } else {
                this.shooter.allowShooting = true;
                this.shooter.shootedBubble.body.checkCollision.none = false;
                this.checkContainer = false;
            }
        }
    }
}