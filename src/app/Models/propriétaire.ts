import {User} from './user';
import {TypeProprietaire} from '../Enum/type-proprietaire';

export class Propriétaire extends User{
  typeProprietaire: TypeProprietaire;
  adresseProfessionnelle: string;
  numeroSiret: string;
  nomAgence: string;


  constructor(typeProprietaire: TypeProprietaire=TypeProprietaire.Particulier, adresseProfessionnelle: string="", numeroSiret: string="", nomAgence: string="") {
    super();
    this.typeProprietaire = typeProprietaire;
    this.adresseProfessionnelle = adresseProfessionnelle;
    this.numeroSiret = numeroSiret;
    this.nomAgence = nomAgence;
  }
}
