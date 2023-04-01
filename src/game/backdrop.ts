import { SPRITE_SIZE_DIMENSION } from "./constants";
import { ChargingStation } from "./entities/charging-station";
import { Cone } from "./entities/cone";
import { Cube } from "./entities/cube";
import { Enemy } from "./entities/enemy";
import { GameObject } from "./entities/game-object";
import { Vector2 } from "./math/vector2";
import { randomIntFromInterval } from "./utils";

export class Backdrop {
  viewport: HTMLCanvasElement;
  gameObjects: GameObject[];
  enemies: Enemy[];

  constructor(viewport: HTMLCanvasElement) {
    this.viewport = viewport;
    this.gameObjects = [];
    this.enemies = [];
    
    this.spawnGameObject();
    this.spawnEnemy();
  }

  update(): void {
    this.gameObjects.forEach((gameObject, index) => {
      if (gameObject.getPosition().getY() > this.viewport.height + 50) this.gameObjects.splice(index, 1);
      else gameObject.update();
    });

    this.enemies.forEach((enemy, index) => {
      if (enemy.getPosition().getY() > this.viewport.height + 50) this.enemies.splice(index, 1);
      else enemy.update();
    });
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, this.viewport.width, this.viewport.height);

    this.gameObjects.forEach(gameObject => gameObject.draw(ctx));
    this.enemies.forEach(enemy => enemy.draw(ctx));
  }

  getRandomGameObject(position: Vector2): GameObject {
    const objectSelector: number = randomIntFromInterval(
      0, 
      1
    );
    switch(objectSelector) {
      case 0:
        return new Cube(position);
      case 1:
        return new Cone(position);
      default:
        return new Cube(position);
    }
  }


  spawnGameObject(): void {
    setInterval(() => {
      const xVal = randomIntFromInterval(
        (this.viewport.width * 0.2) - SPRITE_SIZE_DIMENSION, 
        (this.viewport.width * 0.8) - SPRITE_SIZE_DIMENSION
      );
      this.gameObjects.push(
        this.getRandomGameObject(new Vector2(xVal, 0))
      );
    }, 1500);
  }

  spawnEnemy(): void {
    setInterval(() => {
       const xVal = randomIntFromInterval(
        (this.viewport.width * 0.2) - SPRITE_SIZE_DIMENSION, 
        (this.viewport.width * 0.8) - SPRITE_SIZE_DIMENSION
      );
      this.enemies.push(
        new Enemy(new Vector2(xVal, 0))
      );
    }, 2500);
  }

}
