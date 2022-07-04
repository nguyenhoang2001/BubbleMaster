import { Game } from "phaser";
import { AnimationCreator } from "../helpers/AnimationCreator";
import { ColorManager } from "../logic/ColorManager";
import { GameOverManager } from "../logic/GameOverManager";
import { MovingGridManager } from "../logic/MovingGridManager";
import { ScoreManager } from "../logic/ScoreManager";
import { AddingNewBubbleRowManager } from "../objects/AddingNewBubbleRowManager";
import { BubblesBoard } from "../objects/BubbleBoard/BubblesBoard";
import { Hole } from "../objects/Hole/Hole";
import { Shooter } from "../objects/Shooter/Shooter";
import { GameOverContainer } from "../ui/GameOverContainer";

export class GameScene extends Phaser.Scene {
    public bubblesBoard!: BubblesBoard;
    public shooter!: Shooter;
    private addingNewBubbleRowManager!: AddingNewBubbleRowManager;
    private background!: Phaser.GameObjects.Image;
    public mainZone!: Phaser.GameObjects.Zone;
    private gameOverContainer!: GameOverContainer;
    public score!: number;
    public highScore!: number;
    private animationCreator!: AnimationCreator;
    private hole!: Hole;
    // Logic Game Managers
    public colorManager!: ColorManager;
    public scoreManager!: ScoreManager;
    private gameOverManager!: GameOverManager;
    private movingGridManager!: MovingGridManager;

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
        // Logic Game
        this.colorManager = new ColorManager();
        this.scoreManager = new ScoreManager();
        // Game Objects
        this.animationCreator = new AnimationCreator(this);
        this.bubblesBoard = new BubblesBoard(this,28 + 5,0,6,6*2,1,49);
        this.addingNewBubbleRowManager = new AddingNewBubbleRowManager(this);
        this.gameOverContainer = new GameOverContainer(this,0,0);
        this.hole = new Hole(this);
        this.animationCreator.createAnimations();
        this.createShooter();
        this.bubblesBoard.colliderBubble.gridGroupAndBulletGroup();

        let rope = this.add.image(0,298*2+250*2,'rope').setOrigin(0,0);
        rope.setDisplaySize(rope.width + 210, rope.height);
        // Logic Game
        this.gameOverManager = new GameOverManager(this,this.bubblesBoard);
        this.movingGridManager = new MovingGridManager(this,this.bubblesBoard);
    }

    update(time: number, delta: number): void {
        let isGameOver = this.registry.get('isGameOver');
        if(!isGameOver) {
            this.colorManager.update(delta);
            if(this.highScore < this.score) {
                this.highScore = this.score;
            }
            this.movingGridManager.moveDownBubbles(time,delta);
            this.addingNewBubbleRowManager.setAddSignalToGrid();
            this.bubblesBoard.update();
            this.shooter.update();
            this.gameOverManager.checkGameOver();
        } else {
            this.shooter.clearShotGuide();
            this.gameOverContainer.open();
        }
    }
}