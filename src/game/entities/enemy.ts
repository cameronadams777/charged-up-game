import { Vector2 } from "../math/vector2"
import { BaseEntity } from "./base-entity";
import { Player } from "./player";
import enemyImageSrc from "../../assets/enemy.png";
import { SPRITE_SIZE_DIMENSION } from "../constants";

const enemyImage = new Image();
enemyImage.src = enemyImageSrc;

export class Enemy extends BaseEntity {
  constructor(position: Vector2) {
    super(position);
    this.velocity = new Vector2(0, 60);
  }

  update(delta: number, player?: Player): void {
    if(player != null) {
      if (this.position.getY() <= player.getBottom()) {
        if (player.getPosition().getX() > this.position.getX()) {
          this.velocity.setX(45);
        } else if (player.getPosition().getX() < this.position.getX()) {
          this.velocity.setX(-45);
        } else {
          this.velocity.setX(0);
        }
      } else {
        this.velocity.setX(0);
      }
    }
    this.position.setX(this.position.getX() + (this.velocity.getX() * delta));
    this.position.setY(this.position.getY() + (this.velocity.getY() * delta));
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(
      enemyImage,
      this.position.getX(),
      this.position.getY(),
      SPRITE_SIZE_DIMENSION,
      SPRITE_SIZE_DIMENSION,
    );
  }
}
