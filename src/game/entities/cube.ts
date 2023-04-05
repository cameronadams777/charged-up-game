import { SPRITE_SIZE_DIMENSION } from "../constants";
import { Vector2 } from "../math/vector2";
import { GameObject } from "./game-object";
import cubeImageSrc from "../../assets/cube-sheet.png";

const cubeImage = new Image();
cubeImage.src = cubeImageSrc;

export class Cube extends GameObject {
  constructor(position: Vector2) {
    super(position);
    this.pointValue = 1;
    this.totalFrames = 2;
  }

  draw(ctx: CanvasRenderingContext2D) {
    super.draw(ctx);
    ctx.drawImage(
      cubeImage,
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
