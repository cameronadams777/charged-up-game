import { Vector2 } from "../math/vector2";
import { GameObject } from "./game-object";

export class Cone extends GameObject {
  constructor(position: Vector2) {
    super(position);
    this.pointValue = 5;
  }
}
