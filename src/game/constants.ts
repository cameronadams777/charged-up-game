import { Vector2 } from "./math/vector2";

export const SPRITE_SIZE_DIMENSION = 24;

export const PLAYER_START_POSITION = (viewport: HTMLCanvasElement) => new Vector2(
  viewport.width / 2 - SPRITE_SIZE_DIMENSION / 2, 
  viewport.height / 2 - SPRITE_SIZE_DIMENSION / 2
)


