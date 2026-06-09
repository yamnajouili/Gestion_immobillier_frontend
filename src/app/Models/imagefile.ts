export class Imagefile {
  url: string;
  estPrincipale: boolean;
  ordre!: number;


  constructor(url: string="", estPrincipale: boolean=false, ordre: number=0) {
    this.url = url;
    this.estPrincipale = estPrincipale;
    this.ordre = ordre;
  }
}
