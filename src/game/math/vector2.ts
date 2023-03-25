export class Vector2 {
  x: number;
  y: number;

  constructor(x: number, y:  number){
    this.x = x;
    this.y = y;
  }

  static Zero(): Vector2 {
    return new Vector2(0, 0);
  }

  getX(): number {
    return this.x;
  }

  setX(x: number): void {
    this.x = x;
  }

  getY(): number {
    return this.y;
  }

  setY(y: number): void {
    this.y = y; 
  }
}
