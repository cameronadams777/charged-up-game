import { SPRITE_SIZE_DIMENSION } from "../constants";
import { Vector2 } from "../math/vector2";

export class BaseEntity {
  position: Vector2;
  velocity: Vector2;
  width: number;
  height: number;

  constructor(position: Vector2) {
    this.position = position;
    this.width = SPRITE_SIZE_DIMENSION;
    this.height = SPRITE_SIZE_DIMENSION;
    this.velocity = Vector2.Zero();
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillRect(
      this.position.getX(), 
      this.position.getY(), 
      this.width, 
      this.height 
    );
  }

  isColliding(entity: BaseEntity): boolean {
    return (
      (
        entity.getRight() >= this.getLeft() && 
        entity.getBottom() >= this.getTop() && 
        entity.getLeft() <= this.getRight() &&
        entity.getTop() <= this.getBottom()
      )
    );
  }

  getPosition(): Vector2 {
    return this.position;
  }

  setPosition(position: Vector2): void {
    this.position = position;
  }

  getVelocity(): Vector2 {
    return this.velocity;
  }

  setVelocity(velocity: Vector2): void {
    this.velocity = velocity;
  }

  getTop(): number {
    return this.position.getY();
  }

  getBottom(): number {
    return this.position.getY() + this.height;
  }

  getLeft(): number {
    return this.position.getX();
  }

  getRight(): number {
    return this.position.getX() + this.width;
  }
}
