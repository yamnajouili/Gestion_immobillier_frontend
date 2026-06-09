import {StatutVisite} from '../Enum/statut-visite';

export class Visite {


   id:number;
   dateProposee:Date;
   dateConfirme:Date;
   statut:StatutVisite;
   commentaire:string;
   bienId:number;
   clientId:number;


  constructor(id: number=0, dateProposee: Date=new Date(), dateConfirme: Date=new Date(), statut: StatutVisite=StatutVisite.EN_ATTENTE, commentaire: string="", bienId: number=0, clientId: number=0) {
    this.id = id;
    this.dateProposee = dateProposee;
    this.dateConfirme = dateConfirme;
    this.statut = statut;
    this.commentaire = commentaire;
    this.bienId = bienId;
    this.clientId = clientId;
  }
}
