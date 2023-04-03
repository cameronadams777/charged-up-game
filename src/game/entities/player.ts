import { Vector2 } from "../math/vector2";
import { BaseEntity } from "./base-entity";

export class Player extends BaseEntity {
  lives: number;

  constructor(position: Vector2) {
    super(position);
    this.lives = 3;
  }

  update(viewport: HTMLCanvasElement, delta: number): void {
    if ((this.getLeft() > 0 || this.velocity.getX() > 0) &&
        (this.getRight() < viewport.width || this.velocity.getX() < 0)) {
      this.position.setX(this.position.getX() + (this.velocity.getX() * delta)); 
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'blue';
    super.draw(ctx);
  }

  getLives(): number {
    return this.lives;
  }
  
  setLives(lives: number): void {
    this.lives = lives;
  }
}
