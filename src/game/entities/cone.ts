import { Vector2 } from "../math/vector2";
import { SPRITE_SIZE_DIMENSION } from "../constants";
import { GameObject } from "./game-object";
import coneImageSrc from "../../assets/cone-sheet.png";

const coneImage = new Image();
coneImage.src = coneImageSrc;

export class Cone extends GameObject {
  constructor(position: Vector2) {
    super(position);
    this.pointValue = 5;
    this.totalFrames = 4;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    super.draw(ctx);
    ctx.drawImage(
      coneImage,
      this.srcX,
      0,
      SPRITE_SIZE_DIMENSION,
      SPRITE_SIZE_DIMENSION,
      this.position.getX(),
      this.position.getY(),
      SPRITE_SIZE_DIMENSION,
      SPRITE_SIZE_DIMENSION,
    );
  }
}
