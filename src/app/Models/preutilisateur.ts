import {Typebien} from '../Enum/typebien';


export class Preutilisateur {

  prixMin?: number;
  prixMax?: number;
  villePrefere?: string;
  typeBienPref?: Typebien;
  surfaceMin?: number;


  constructor( prixMin: number=0, prixMax: number=0, villePrefere: string="", typeBienPref: Typebien=Typebien.APPARTEMENT, surfaceMin: number=0) {

    this.prixMin = prixMin;
    this.prixMax = prixMax;
    this.villePrefere = villePrefere;
    this.typeBienPref = typeBienPref;
    this.surfaceMin = surfaceMin;
  }
}
