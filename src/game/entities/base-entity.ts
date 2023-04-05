import { SPRITE_SIZE_DIMENSION } from "../constants";
import { Vector2 } from "../math/vector2";

export type EntityType = "enemy" | "gameObject" | "base";

export class BaseEntity {
  type: EntityType;
  position: Vector2;
  velocity: Vector2;
  width: number;
  height: number;
  totalFrames: number;
  currentFrame: number;
  srcX: number;
  framesDrawn: number;

  constructor(position: Vector2) {
    this.type = "base";
    this.position = position;
    this.width = SPRITE_SIZE_DIMENSION;
    this.height = SPRITE_SIZE_DIMENSION;
    this.velocity = Vector2.Zero();
    this.totalFrames = 0;
    this.framesDrawn = 0;
    this.srcX = 0;
    this.currentFrame = 0;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    this.currentFrame = this.currentFrame % this.totalFrames;
    this.srcX = this.currentFrame * SPRITE_SIZE_DIMENSION;
    this.framesDrawn += 1;
    if (this.framesDrawn % 10 === 0) this.currentFrame += 1;
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

  getType(): EntityType {
    return this.type;
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
