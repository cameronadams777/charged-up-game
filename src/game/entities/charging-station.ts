import { SPRITE_SIZE_DIMENSION } from "../constants";
import { Vector2 } from "../math/vector2";
import { GameObject } from "./game-object";
import chargingStationSrc from "../../assets/charging-station.png";

const chargingStationImage = new Image();
chargingStationImage.src = chargingStationSrc;

export class ChargingStation extends GameObject {
  constructor(position: Vector2) {
    super(position);
    this.width = SPRITE_SIZE_DIMENSION * 4;
    this.height = SPRITE_SIZE_DIMENSION * 2;
    this.pointValue = 30;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(
      chargingStationImage,
      this.position.getX(),
      this.position.getY(),
      this.width,
      this.height,
    );
  }

}
