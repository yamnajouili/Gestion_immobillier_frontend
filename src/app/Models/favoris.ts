export class Favoris {
   id:number;
   dateAjout:Date;
   bienId:number;


  constructor(id: number=0, dateAjout: Date=new Date(), bienId: number=0) {
    this.id = id;
    this.dateAjout = dateAjout;
    this.bienId = bienId;
  }
}
