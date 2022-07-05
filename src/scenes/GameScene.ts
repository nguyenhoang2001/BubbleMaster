import { Game } from "phaser";
import DEPTH from "../game/constant/Depth";
import { AnimationCreator } from "../helpers/AnimationCreator";
import { ColorManager } from "../logic/ColorManager";
import { MovingGridManager } from "../logic/MovingGridManager";
import { ScoreManager } from "../logic/ScoreManager";
import { AddingNewBubbleRowManager } from "../objects/AddingNewBubbleRowManager";
import { BubblesBoard } from "../objects/BubbleBoard/BubblesBoard";
import { Hole } from "../objects/Hole/Hole";
import { Shooter } from "../objects/Shooter/Shooter";
import { GameOverContainer } from "../ui/GameOverContainer";

export class GameScene extends Phaser.Scene {
    public bubblesBoard: BubblesBoard;
    public shooter: Shooter;
    private addingNewBubbleRowManager: AddingNewBubbleRowManager;
    private background: Phaser.GameObjects.Image;
    public mainZone: Phaser.GameObjects.Zone;
    private gameOverContainer: GameOverContainer;
    public highScore: number;
    private animationCreator: AnimationCreator;
    private hole: Hole;
    // Logic Game Managers
    public colorManager: ColorManager;
    public scoreManager: ScoreManager;
    private movingGridManager: MovingGridManager;

    constructor() {
        super({
            key:'GameScene'
        });
        this.highScore = 0;
    }

    private createShooter() {
        this.shooter = new Shooter(this);
    }

    create() {
        // Variables
        this.mainZone = this.add.zone(0,0,this.sys.canvas.width,this.sys.canvas.height).setOrigin(0,0);
        this.background = this.add.image(0,0,'background').setOrigin(0,0);
        this.background.setDepth(DEPTH.BACKGROUND);
        this.registry.set('score',0);
        // Physics
        this.physics.world.setBoundsCollision(true,true,false,false);
        // Logic Game
        this.colorManager = new ColorManager();
        // Game Objects
        this.animationCreator = new AnimationCreator(this);
        this.bubblesBoard = new BubblesBoard(this,28 + 5,0,6,6*2,1,49);
        this.addingNewBubbleRowManager = new AddingNewBubbleRowManager(this);
        this.gameOverContainer = new GameOverContainer(this,0,0);
        this.gameOverContainer.setDepth(DEPTH.GAMEOVERCONTAINER);
        this.hole = new Hole(this);
        this.animationCreator.createAnimations();
        this.colorManager.setBubblesBoard(this.bubblesBoard);
        this.createShooter();
        this.bubblesBoard.colliderBubble.gridGroupAndBulletGroup();

        let rope = this.add.image(0,298*2+250*2,'rope').setOrigin(0,0);
        rope.setDepth(DEPTH.GAMEPLAY);
        rope.setDisplaySize(rope.width + 210, rope.height);
        // Logic Game
        this.scoreManager = new ScoreManager(this.bubblesBoard);
        this.movingGridManager = new MovingGridManager(this,this.bubblesBoard);
    }

    update(time: number, delta: number): void {
        let isGameOver = this.registry.get('isGameOver');
        if(!isGameOver) {
            this.colorManager.update(delta);
            if(this.highScore < this.scoreManager.getScore()) {
                this.highScore = this.scoreManager.getScore();
            }
            this.movingGridManager.moveDownBubbles(time,delta);
            this.addingNewBubbleRowManager.setAddSignalToGrid();
            this.bubblesBoard.update();
            this.shooter.update();
        } else {
            this.shooter.clearShotGuide();
            this.shooter.removeInput();
            this.bubblesBoard.y = 0;
            this.bubblesBoard.row = 6;
            this.gameOverContainer.open();
        }
    }
}