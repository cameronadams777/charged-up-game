import { Vector2 } from "../math/vector2";
import { BaseEntity } from "./base-entity";

export class GameObject extends BaseEntity {
  pointValue: number;

  constructor(position: Vector2) {
    super(position);
    this.type = "gameObject";
    this.velocity = new Vector2(0, 50);
    this.pointValue = 0;
  }

  update(delta: number): void {
    this.position.setY(this.position.getY() + (this.velocity.getY() * delta));
  }

  getPointValue(): number {
    return this.pointValue;
  }
}
