import * as luxon from 'luxon';
import { SPAWN_COUNTER_THRESHOLD, SPRITE_SIZE_DIMENSION } from "./constants";
import { Cone } from "./entities/cone";
import { Cube } from "./entities/cube";
import { Enemy } from "./entities/enemy";
import { GameObject } from "./entities/game-object";
import { Player } from "./entities/player";
import { Vector2 } from "./math/vector2";
import { randomIntFromInterval } from "./utils";

export class Game {
  spawnCounter: number;
  viewport: HTMLCanvasElement
  charge: number;
  endTime: Date;
  gameTimer: number;
  player: Player;
  gameObjects: GameObject[] = [];

  constructor(viewport: HTMLCanvasElement) {
    // Handle game initializations
    this.viewport = viewport;
    this.charge = 0;
    this.player = new Player(
      new Vector2(
        this.viewport.width / 2 - SPRITE_SIZE_DIMENSION / 2, 
        this.viewport.height / 2 - SPRITE_SIZE_DIMENSION / 2
      )
    );
    this.spawnCounter = 0;
    this.gameTimer = 0;
    this.endTime = luxon.DateTime.fromJSDate(new Date()).plus({ minutes: 2 }).toJSDate();
  }

  update() {
    // Handle game logic updates
    this.handleKeyEvents();

    const now = new Date();
    this.gameTimer = this.endTime.getTime() - now.getTime();

    if (this.gameTimer <= 500) {
      // TODO: Post score to leaderboard
      window.location.href = '/leaderboard';
      return;
    }
    
    this.player.update(this.viewport);

    this.spawnGameObject();

    this.gameObjects.forEach((gameObject, index) => {
      if (gameObject.isColliding(this.player)) {
        this.charge += gameObject.getPointValue();
        this.gameObjects.splice(index, 1);
      }
      else if (gameObject.getPosition().getY() > this.viewport.height + 50) this.gameObjects.splice(index, 1);
      else gameObject.update();
    });
  }

  draw(ctx: CanvasRenderingContext2D) {
    // Give canvas a background
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, this.viewport.width, this.viewport.height);

    if (this.paused) {
      ctx.fillStyle = 'red';
      ctx.fillText('PAUSED', 5, 45);
    }

    ctx.fillStyle = 'white';
    const timerText = this.getFormattedGameTime();
    ctx.fillText(
      timerText, 
      (this.viewport.width / 2) - ctx.measureText(timerText).width / 2,
      45
    );

    ctx.fillStyle = 'yellow';
    ctx.fillText(this.charge.toString(), this.viewport.width - 75, 50);

    this.player.draw(ctx);

    this.gameObjects.forEach(gameObject => gameObject.draw(ctx));
  }

  handleKeyEvents() {
    // Phone
    window.addEventListener('touchstart', (event) => {
      const touch = event.touches[0] || event.changedTouches[0];
      const touchXPos: number = touch.pageX;
      if(touchXPos < window.innerWidth / 2) {
        this.player.setVelocity(-5, this.player.getVelocity().getY());
      } else {
        this.player.setVelocity(5, this.player.getVelocity().getY());
      }
    });

    window.addEventListener('touchend', (event) => {
      this.player.setVelocity(0, 0); 
    });

    // Computer
    window.addEventListener('keydown', (event) => {
      switch(event.key) {
        case 'ArrowLeft':
          this.player.setVelocity(-5, this.player.getVelocity().getY());
          break;
        case 'ArrowRight':
          this.player.setVelocity(5, this.player.getVelocity().getY());
          break;
      }
    });

    window.addEventListener('keyup', (event) => {
      switch(event.key) {
        case 'ArrowLeft':
          this.player.setVelocity(0, this.player.getVelocity().getY());
          break;
        case 'ArrowRight':
          this.player.setVelocity(0, this.player.getVelocity().getY());
          break;
      }
    });
  }

  getRandomGameObject(position: Vector2): GameObject {
    const objectSelector: number = randomIntFromInterval(0, 2);
    switch(objectSelector) {
      case 0:
        return new Cube(position);
      case 1:
        return new Cone(position);
      case 2:
        return new Enemy(position);
      default:
        return new Cube(position);
    }
  }

  spawnGameObject(): void {
    // If gameObjects has less than 2 game objects
    // add new game object
    this.spawnCounter += 1;
    if (this.gameObjects.length < 2 && this.spawnCounter > SPAWN_COUNTER_THRESHOLD) {
      const xVal = randomIntFromInterval(
        (this.viewport.width * 0.2) - SPRITE_SIZE_DIMENSION, 
        (this.viewport.width * 0.8) - SPRITE_SIZE_DIMENSION
      );
      this.gameObjects.push(
        this.getRandomGameObject(new Vector2(xVal, 0))
      );
      this.spawnCounter = 0;
    }
  }

  getFormattedGameTime(): string {
    const minutes = Math.floor((this.gameTimer % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((this.gameTimer % (1000 * 60)) / 1000);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
}
