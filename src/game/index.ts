import { SPAWN_COUNTER_THRESHOLD, SPRITE_SIZE_DIMENSION } from "./constants";
import { Cube } from "./entities/cube";
import { GameObject } from "./entities/game-object";
import { Player } from "./entities/player";
import { Vector2 } from "./math/vector2";

export class Game {
  spawnCounter: number;
  viewport: HTMLCanvasElement
  charge: number;
  player: Player;
  gameObjects: GameObject[] = [];

  constructor(viewport: HTMLCanvasElement) {
    // Handle game initializations
    this.viewport = viewport;
    this.charge = 0;
    this.player = new Player(
      new Vector2(
        this.viewport.width / 2 - SPRITE_SIZE_DIMENSION, 
        this.viewport.height / 2 - SPRITE_SIZE_DIMENSION
      )
    );
    this.spawnCounter = 0;
    this.spawnGameObject();
  }

  update() {
    // Handle game logic updates
    this.handleKeyEvents();
    this.player.update();

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

    ctx.fillStyle = 'blue';
    ctx.fillText(this.charge.toString(), this.viewport.width - 50, 50)

    this.player.draw(ctx);

    this.gameObjects.forEach(gameObject => gameObject.draw(ctx));
  }

  handleKeyEvents() {
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

  spawnGameObject(): void {
    // If gameObjects has less than 2 game objects
    // add new game object
    this.spawnCounter += 1;
    if (this.gameObjects.length < 2 && this.spawnCounter > SPAWN_COUNTER_THRESHOLD) {
      const xVal = Math.floor(Math.random() * this.viewport.width - SPRITE_SIZE_DIMENSION);
      this.gameObjects.push(
        new Cube(new Vector2(xVal, 0))
      );
      this.spawnCounter = 0;
    }
  }
}
