import { SPRITE_SIZE_DIMENSION } from "../constants"
import { Vector2 } from "../math/vector2"
import { Player } from "./player";

export class Enemy {
  position: Vector2;
  velocity: Vector2;

  constructor(position: Vector2) {
    this.position = position;
    this.velocity = new Vector2(0, 2);
  }

  update(player: Player): void {
    this.position.setY(this.position.getY() + this.velocity.getY());
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = 'red';
    ctx.fillRect(
      this.position.getX(), 
      this.position.getY(), 
      SPRITE_SIZE_DIMENSION, 
      SPRITE_SIZE_DIMENSION
    );
  }

  isColliding(player: Player): boolean {
    return (
      (
        player.getRight() >= this.getLeft() && 
        player.getBottom() >= this.getTop() && 
        player.getLeft() <= this.getRight() &&
        player.getTop() <= this.getBottom()
      )
    );
  }

  getPosition(): Vector2 {
    return this.position;
  }

  getVelocity(): Vector2 {
    return this.velocity;
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

