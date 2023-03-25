import { SPRITE_SIZE_DIMENSION } from "../constants";
import { Vector2 } from "../math/vector2";
import { Player } from "./player";

export class GameObject {
  position: Vector2;
  velocity: Vector2;
  pointValue: number;

  constructor(position: Vector2) {
    this.position = position;
    this.velocity = new Vector2(0, 3);
  }

  update() {
    this.position.setY(this.position.getY() + this.velocity.getY());
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'yellow';
    ctx.fillRect(this.position.getX(), this.position.getY(), SPRITE_SIZE_DIMENSION, SPRITE_SIZE_DIMENSION);
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

  getPointValue() {
    return this.pointValue;
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
