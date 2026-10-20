import {Typebien} from '../Enum/typebien';
import {Typetransaction} from '../Enum/typetransaction';


export class Preutilisateur {

  prixMin?: number;
  prixMax?: number;
  villePrefere?: string;
  typeBienPref?: Typebien;
  surfaceMin?: number;
  typeTransaction:Typetransaction;



  constructor( prixMin: number=0, prixMax: number=0, villePrefere: string="", typeBienPref: Typebien=Typebien.APPARTEMENT, surfaceMin: number=0,  typeTransaction:Typetransaction=Typetransaction.LOCATION
) {

    this.prixMin = prixMin;
    this.prixMax = prixMax;
    this.villePrefere = villePrefere;
    this.typeBienPref = typeBienPref;
    this.surfaceMin = surfaceMin;
    this.typeTransaction=typeTransaction;
  }
}
