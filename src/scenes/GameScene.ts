import { Game } from "phaser";
import { logicGame } from "../game";
import { AnimationCreator } from "../helpers/AnimationCreator";
import { LogicGame } from "../logic/LogicGame";
import { AddingNewBubbleRowManager } from "../objects/AddingNewBubbleRowManager";
import { BubblesBoard } from "../objects/BubbleBoard/BubblesBoard";
import { GameOverHandler } from "../objects/GameOverHandler";
import { Hole } from "../objects/Hole/Hole";
import { Shooter } from "../objects/Shooter/Shooter";
import { GameOverContainer } from "../ui/GameOverContainer";

export class GameScene extends Phaser.Scene {
    public bubblesBoard!: BubblesBoard;
    public shooter!: Shooter;
    private addingNewBubbleRowManager!: AddingNewBubbleRowManager;
    private background!: Phaser.GameObjects.Image;
    private gameOverHandler!: GameOverHandler;
    public mainZone!: Phaser.GameObjects.Zone;
    private gameOverContainer!: GameOverContainer;
    public score!: number;
    public highScore!: number;
    private animationCreator!: AnimationCreator;
    private hole!: Hole;

    constructor() {
        super({
            key:'GameScene'
        });
        this.score = 0;
        this.highScore = 0;
    }

    private createShooter() {
        this.shooter = new Shooter(this);
    }

    create() {
        // Variables
        this.mainZone = this.add.zone(0,0,this.sys.canvas.width,this.sys.canvas.height).setOrigin(0,0);
        this.background = this.add.image(0,0,'background').setOrigin(0,0);
        this.registry.set('score',0);
        this.score = 0;
        // Physics
        this.physics.world.setBoundsCollision(true,true,false,false);
        // Game Objects
        this.animationCreator = new AnimationCreator(this);
        this.bubblesBoard = new BubblesBoard(this,28 + 5,0,6,6*2,1,49);
        this.addingNewBubbleRowManager = new AddingNewBubbleRowManager(this);
        this.gameOverHandler = new GameOverHandler(this);
        this.gameOverContainer = new GameOverContainer(this,0,0);
        this.hole = new Hole(this);
        this.animationCreator.createAnimations();
        this.createShooter();
        this.bubblesBoard.colliderBubble.gridGroupAndBulletGroup();
    }

    update(time: number, delta: number): void {
        this.gameOverHandler.update();
        if(!this.gameOverHandler.isGameOver) {
            logicGame.update(time,delta);
            if(this.highScore < this.score) {
                this.highScore = this.score;
            }
            this.addingNewBubbleRowManager.setAddSignalToGrid();
            this.bubblesBoard.update();
            this.shooter.update();
        } else {
            this.shooter.clearShotGuide();
            this.gameOverContainer.open();
        }
    }
}