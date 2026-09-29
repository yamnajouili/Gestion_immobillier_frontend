export class Imagefile {
  id:number;
  url: string;
  estPrincipale: boolean;
  ordre!: number;


  constructor(id:number=0,url: string="", estPrincipale: boolean=false, ordre: number=0) {
    this.id=id;
    this.url = url;
    this.estPrincipale = estPrincipale;
    this.ordre = ordre;
  }
}
