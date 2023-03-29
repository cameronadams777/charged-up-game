import { SPRITE_SIZE_DIMENSION } from "../constants";
import { Vector2 } from "../math/vector2";

export class Player {
  position: Vector2;
  velocity: Vector2;
  lives: number;

  constructor(position: Vector2) {
    this.position = position;
    this.velocity = Vector2.Zero();
    this.lives = 3;
  }

  update(viewport: HTMLCanvasElement) {
    if ((this.getLeft() > 0 || this.velocity.getX() > 0) &&
        (this.getRight() < viewport.width || this.velocity.getX() < 0)) {
      this.position.setX(this.position.getX() + this.velocity.getX()); 
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'blue';
    ctx.fillRect(
      this.position.getX(), 
      this.position.getY(), 
      SPRITE_SIZE_DIMENSION, 
      SPRITE_SIZE_DIMENSION
    );
  }

  getLives(): number {
    return this.lives;
  }
  
  setLives(lives: number): void {
    this.lives = lives;
  }

  getPosition(): Vector2 {
    return this.position;
  }

  setPosition(x: number, y: number): void {
    this.position.setX(x);
    this.position.setY(y);
  }

  getVelocity(): Vector2 {
    return this.velocity;
  }

  setVelocity(x: number, y: number): void {
    this.velocity.setX(x);
    this.velocity.setY(y);
  }

  getTop(): number {
    return this.position.getY();
  }

  getBottom(): number {
    return this.position.getY() + SPRITE_SIZE_DIMENSION;
  }

  getLeft(): number {
    return this.position.getX();
  }

  getRight(): number {
    return this.position.getX() + SPRITE_SIZE_DIMENSION;
  }
}
