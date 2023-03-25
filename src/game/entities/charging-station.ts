import { SPRITE_SIZE_DIMENSION } from "../constants";
import { Vector2 } from "../math/vector2";
import { GameObject } from "./game-object";

export class ChargingStating extends GameObject {
  constructor(position: Vector2) {
    super(position);
    this.pointValue = 30;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = 'gold';
    ctx.fillRect(
      this.position.getX(), 
      this.position.getY(), 
      SPRITE_SIZE_DIMENSION * 2, 
      SPRITE_SIZE_DIMENSION * 1.25
    );
  }

}
