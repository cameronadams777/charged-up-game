import { SPRITE_SIZE_DIMENSION } from "../constants";
import { Vector2 } from "../math/vector2";
import { BaseEntity } from "./base-entity";
import { Player } from "./player";

export class GameObject extends BaseEntity {
  pointValue: number;

  constructor(position: Vector2) {
    super(position);
    this.velocity = new Vector2(0, 2);
    this.pointValue = 0;
  }

  update(): void {
    this.position.setY(this.position.getY() + this.velocity.getY());
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = 'yellow';
    super.draw(ctx);
  }

  getPointValue(): number {
    return this.pointValue;
  }
}
