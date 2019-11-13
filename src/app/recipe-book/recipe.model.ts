export class Recipe {
  public name: string;
  public description: string;
  public imagePath: string;

  constructor( name: string, decs: string, imagePath: string) {
    this.name = name;
    this.description = decs;
    this.imagePath = imagePath;
  }
}
