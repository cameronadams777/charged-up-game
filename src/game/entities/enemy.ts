import { SPRITE_SIZE_DIMENSION } from "../constants"
import { Vector2 } from "../math/vector2"
import { GameObject } from "./game-object";

export class Enemy extends GameObject {
  constructor(position: Vector2) {
    super(position);
    this.pointValue = 0;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'red';
    ctx.fillRect(
      this.position.getX(), 
      this.position.getY(), 
      SPRITE_SIZE_DIMENSION, 
      SPRITE_SIZE_DIMENSION
    );
  }
}

