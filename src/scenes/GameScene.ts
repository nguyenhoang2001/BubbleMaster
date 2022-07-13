import { Game } from "phaser";
import DEPTH from "../game/constant/Depth";
import { AnimationCreator } from "../helpers/AnimationCreator";
import { ColorManager } from "../logic/ColorManager";
import { MovingGridManager } from "../logic/MovingGridManager";
import { ScoreManager } from "../logic/ScoreManager";
import { TypeBulletManager } from "../logic/TypeBulletManager";
import { AddingNewBubbleRowManager } from "../objects/AddingNewBubbleRowManager";
import { BubblesBoard } from "../objects/BubbleBoard/BubblesBoard";
import { HolesManager } from "../objects/Hole/HolesManager";
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
    public holes: HolesManager;
    // Logic Game Managers
    public colorManager: ColorManager;
    public scoreManager: ScoreManager;
    public movingGridManager: MovingGridManager;
    private typeBulletManager: TypeBulletManager;
    public gameOver:boolean;

    constructor() {
        super({
            key:'GameScene'
        });
        this.highScore = 0;
    }

    create() {
        // Variables
        this.gameOver = false;
        this.mainZone = this.add.zone(0,0,this.sys.canvas.width,this.sys.canvas.height).setOrigin(0,0);
        this.background = this.add.image(0,0,'background').setOrigin(0,0);
        this.background.setDepth(DEPTH.BACKGROUND);
        this.registry.set('score',0);
        // Physics
        this.physics.world.setFPS(120);
        this.physics.world.setBoundsCollision(true,true,false,false);
        // Logic Game
        this.colorManager = new ColorManager();
        // Game Objects
        this.animationCreator = new AnimationCreator(this);
        this.bubblesBoard = new BubblesBoard(this,28 + 5,0,6,6*2,1,49);
        this.addingNewBubbleRowManager = new AddingNewBubbleRowManager(this);
        this.gameOverContainer = new GameOverContainer(this,0,0);
        this.gameOverContainer.setDepth(DEPTH.GAMEOVERCONTAINER);
        this.animationCreator.createAnimations();
        this.colorManager.setBubblesBoard(this.bubblesBoard);
        this.shooter = new Shooter(this);
        this.bubblesBoard.colliderBubble.gridGroupAndBulletGroup();

        let rope = this.add.image(0,298*2+250*2,'rope').setOrigin(0,0);
        rope.setDepth(DEPTH.GAMEPLAY);
        rope.setDisplaySize(rope.width + 210, rope.height);
        // Logic Game
        this.scoreManager = new ScoreManager(this.bubblesBoard,this);
        this.movingGridManager = new MovingGridManager(this,this.bubblesBoard);
        // hole score
        this.holes = new HolesManager(this);
        this.typeBulletManager = new TypeBulletManager(this,this.bubblesBoard,this.shooter);
    }

    update(time: number, delta: number): void {
        if(!this.gameOver) {
            this.colorManager.update(delta);
            this.typeBulletManager.checkConditionToChangeType();
            if(this.highScore < this.scoreManager.getScore()) {
                this.highScore = this.scoreManager.getScore();
            }
            this.movingGridManager.moveDownBubbles(time,delta);
            this.addingNewBubbleRowManager.setAddSignalToGrid();
            this.bubblesBoard.update(time,delta);
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