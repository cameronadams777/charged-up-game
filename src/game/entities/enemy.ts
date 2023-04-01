import { Vector2 } from "../math/vector2"
import { BaseEntity } from "./base-entity";
import { Player } from "./player";

export class Enemy extends BaseEntity {
  constructor(position: Vector2) {
    super(position);
    this.velocity = new Vector2(0, 3);
  }

  update(player?: Player): void {
    if(player != null) {
      if (this.position.getY() <= player.getBottom()) {
        if (player.getPosition().getX() > this.position.getX()) {
          this.velocity.setX(2);
        } else if (player.getPosition().getX() < this.position.getX()) {
          this.velocity.setX(-2);
        } else {
          this.velocity.setX(0);
        }
      } else {
        this.velocity.setX(0);
      }
    }
    this.position.setX(this.position.getX() + this.velocity.getX());
    this.position.setY(this.position.getY() + this.velocity.getY());
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = 'red';
    super.draw(ctx);
  }
}
