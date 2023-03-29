import * as luxon from 'luxon';
import { PLAYER_START_POSITION, SPRITE_SIZE_DIMENSION } from "./constants";
import { Cone } from "./entities/cone";
import { Cube } from "./entities/cube";
import { Enemy } from "./entities/enemy";
import { GameObject } from "./entities/game-object";
import { Player } from "./entities/player";
import { Vector2 } from "./math/vector2";
import { randomIntFromInterval } from "./utils";
import heartImageSrc from '../assets/heart.png';
import { ChargingStation } from './entities/charging-station';

const heartImage = new Image();
heartImage.src = heartImageSrc;

export class Game {
  viewport: HTMLCanvasElement
  charge: number;
  endTime: Date;
  gameTimer: number;
  player: Player;
  gameObjectLastSpawnTime: number;
  gameObjectSpawnTimer: Date;
  gameObjects: GameObject[] = [];
  enemies: Enemy[] = [];
  enemyLastSpawnTime: number;
  enemySpawnTimer: Date;
  chargingStationSpawnCounter: number;

  constructor(viewport: HTMLCanvasElement) {
    // Handle game initializations
    this.viewport = viewport;
    this.charge = 0;
    this.player = new Player(
      PLAYER_START_POSITION(viewport)
    );
    this.gameTimer = 0;
    this.endTime = luxon.DateTime.fromJSDate(new Date()).plus({ minutes: 2 }).toJSDate();
    this.enemyLastSpawnTime = 0;
    this.enemySpawnTimer = new Date();
    this.gameObjectLastSpawnTime = 0;
    this.gameObjectSpawnTimer = new Date();
    this.chargingStationSpawnCounter = 0;
  }

  update() {
    // Handle game logic updates
    this.handleKeyEvents();

    const now = new Date();
    this.gameTimer = this.endTime.getTime() - now.getTime();

    /*if (this.gameTimer <= 500) {
      // TODO: Post score to leaderboard
      window.location.href = '/leaderboard';
      return;
    }*/
    
    this.player.update(this.viewport);

    this.spawnGameObject();
    this.spawnEnemy();

    this.gameObjects.forEach((gameObject, index) => {
      if (gameObject.isColliding(this.player)) {
        this.charge += gameObject.getPointValue();
        this.gameObjects.splice(index, 1);
      }
      else if (gameObject.getPosition().getY() > this.viewport.height + 50) this.gameObjects.splice(index, 1);
      else gameObject.update();
    });

    this.enemies.forEach((enemy, index) => {
      if (enemy.isColliding(this.player)) {
        this.enemies.splice(index, 1);
        this.player.setPosition(PLAYER_START_POSITION(this.viewport));
        this.player.setLives(this.player.getLives() - 1);
      }
      else if (enemy.getPosition().getY() > this.viewport.height + 50) this.enemies.splice(index, 1);
      else enemy.update(this.player);
    });
  }

  draw(ctx: CanvasRenderingContext2D) {
    // Give canvas a background
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, this.viewport.width, this.viewport.height);
 
    this.player.draw(ctx);

    this.gameObjects.forEach(gameObject => gameObject.draw(ctx));
    this.enemies.forEach(enemy => enemy.draw(ctx));

    for (let i = 1; i < this.player.getLives() + 1; i++) {
      ctx.drawImage(heartImage, 40 * i, 5, SPRITE_SIZE_DIMENSION, SPRITE_SIZE_DIMENSION)
    }

    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.moveTo((this.viewport.width / 2) - 250, 0);
    ctx.lineTo((this.viewport.width / 2) - 75, 0);
    ctx.lineTo((this.viewport.width / 2) - 75, 75);
    ctx.lineTo((this.viewport.width / 2) - 162.5, 75);
    ctx.fill(); 

    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.moveTo((this.viewport.width / 2) + 250, 0);
    ctx.lineTo((this.viewport.width / 2) + 75, 0);
    ctx.lineTo((this.viewport.width / 2) + 75, 75);
    ctx.lineTo((this.viewport.width / 2) + 162.5, 75);
    ctx.fill(); 

    ctx.fillStyle = 'white';
    ctx.fillText(this.charge.toString(), (this.viewport.width / 2) - 150, 48);

    ctx.fillStyle = 'white';
    ctx.fillRect((this.viewport.width / 2) - 75, 0, 150, 75);

    ctx.fillStyle = 'black';
    const timerText = this.getFormattedGameTime();
    ctx.fillText(
      timerText, 
      (this.viewport.width / 2) - ctx.measureText(timerText).width / 2,
      50
    );
  }

  handleKeyEvents() {
    // Phone
    window.addEventListener('touchstart', (event) => {
      const touch = event.touches[0] || event.changedTouches[0];
      const touchXPos: number = touch.pageX;
      if(touchXPos < window.innerWidth / 2) {
        this.player.setVelocity(new Vector2(-5, this.player.getVelocity().getY()));
      } else {
        this.player.setVelocity(new Vector2(5, this.player.getVelocity().getY()));
      }
    });

    window.addEventListener('touchend', () => {
      this.player.setVelocity(new Vector2(0, 0)); 
    });

    // Computer
    window.addEventListener('keydown', (event) => {
      switch(event.key) {
        case 'ArrowLeft':
          this.player.setVelocity(new Vector2(-5, this.player.getVelocity().getY()));
          break;
        case 'ArrowRight':
          this.player.setVelocity(new Vector2(5, this.player.getVelocity().getY()));
          break;
      }
    });

    window.addEventListener('keyup', (event) => {
      switch(event.key) {
        case 'ArrowLeft':
          this.player.setVelocity(new Vector2(0, this.player.getVelocity().getY()));
          break;
        case 'ArrowRight':
          this.player.setVelocity(new Vector2(0, this.player.getVelocity().getY()));
          break;
      }
    });
  }

  getRandomGameObject(position: Vector2): GameObject {
    const objectSelector: number = randomIntFromInterval(
      0, 
      this.gameTimer < 30000 && this.chargingStationSpawnCounter < 2 
        ? 2 
        : 1
    );
    switch(objectSelector) {
      case 0:
        return new Cube(position);
      case 1:
        return new Cone(position);
      case 2:
        const possibleXValues = [this.viewport.width * 0.25, (this.viewport.width * 0.75) - (SPRITE_SIZE_DIMENSION * 4)]
        const randomPos = randomIntFromInterval(0, possibleXValues.length - 1);
        const xVal = possibleXValues[randomPos];
        this.chargingStationSpawnCounter += 1;
        return new ChargingStation(new Vector2(xVal, 0));
      default:
        return new Cube(position);
    }
  }

  spawnGameObject(): void {
    const now = new Date();
    this.gameObjectLastSpawnTime = this.gameObjectSpawnTimer.getTime() - now.getTime();
    if (this.gameObjectLastSpawnTime < 500) {
      const xVal = randomIntFromInterval(
        (this.viewport.width * 0.2) - SPRITE_SIZE_DIMENSION, 
        (this.viewport.width * 0.8) - SPRITE_SIZE_DIMENSION
      );
      this.gameObjects.push(
        this.getRandomGameObject(new Vector2(xVal, 0))
      );
      this.gameObjectSpawnTimer = luxon.DateTime.fromJSDate(new Date()).plus({ seconds: 2 }).toJSDate();
    }
  }

  spawnEnemy(): void {
    const now = new Date();
    this.enemyLastSpawnTime = this.enemySpawnTimer.getTime() - now.getTime();
    if (this.enemyLastSpawnTime < 500) {
       const xVal = randomIntFromInterval(
        (this.viewport.width * 0.2) - SPRITE_SIZE_DIMENSION, 
        (this.viewport.width * 0.8) - SPRITE_SIZE_DIMENSION
      );
      this.enemies.push(
        new Enemy(new Vector2(xVal, 0))
      );
      this.enemySpawnTimer = luxon.DateTime.fromJSDate(new Date()).plus({ seconds: 2 }).toJSDate();
    }
  }

  getFormattedGameTime(): string {
    const minutes = Math.floor((this.gameTimer % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((this.gameTimer % (1000 * 60)) / 1000);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
}
