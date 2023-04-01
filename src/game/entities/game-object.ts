import { Vector2 } from "../math/vector2";
import { BaseEntity } from "./base-entity";

export class GameObject extends BaseEntity {
  pointValue: number;

  constructor(position: Vector2) {
    super(position);
    this.type = "gameObject";
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
