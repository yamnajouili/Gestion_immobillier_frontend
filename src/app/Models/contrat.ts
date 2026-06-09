import {Bien} from './bien';
import {Statutcontrat} from '../Enum/statutcontrat';

export class Contrat {

  id: number
  titre: string;
  dateDebut: Date;
  dateFin: Date;
  montantLoyer: number;
  caution: number;
  statut: Statutcontrat;
  tokenSignature: string;
  bien: Bien;
  bienId: number;
  clientEmail:string;
  proprietaireId: number;


  constructor(id: number=0, titre: string="", dateDebut: Date=new Date(), dateFin: Date=new Date(), montantLoyer: number=0, caution: number=0, statut: Statutcontrat=Statutcontrat.EN_ATTENTE, tokenSignature: string="", bien: Bien=new Bien(), bienId: number=0, clientId: number=0, proprietaireId: number=0, clientEmail:string="") {
    this.id = id;
    this.titre = titre;
    this.dateDebut = dateDebut;
    this.dateFin = dateFin;
    this.montantLoyer = montantLoyer;
    this.caution = caution;
    this.statut = statut;
    this.tokenSignature = tokenSignature;
    this.bien = bien;
    this.bienId = bienId;
    this. clientEmail =  clientEmail;
    this.proprietaireId = proprietaireId;
  }
}
