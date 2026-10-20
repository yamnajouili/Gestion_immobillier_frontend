import {TypeProprietaire} from '../Enum/type-proprietaire';
import {Role} from '../Enum/role';

export class UserDetail {

  id: number;
  nom: string;
  telephone: string;
  poste: string;
  email: string;
  role: Role;
  creationDate: Date;
  photoProfil: string;
  typeProprietaire?: TypeProprietaire;
  adresseProfessionnelle?: string;
  numeroSiret?: string;
  nomAgence?: string;

  constructor(id: number=0, nom: string="", telephone: string="", poste: string="", email: string="", role: Role=Role.CLIENT, creationDate: Date=new Date(), photoProfil: string="", typeProprietaire: TypeProprietaire=TypeProprietaire.Particulier, adresseProfessionnelle: string="", numeroSiret: string="", nomAgence: string="") {
    this.id = id;
    this.nom = nom;
    this.telephone = telephone;
    this.poste = poste;
    this.email = email;
    this.role = role;
    this.creationDate = creationDate;
    this.photoProfil = photoProfil;
    this.typeProprietaire = typeProprietaire;
    this.adresseProfessionnelle = adresseProfessionnelle;
    this.numeroSiret = numeroSiret;
    this.nomAgence = nomAgence;
  }
}
