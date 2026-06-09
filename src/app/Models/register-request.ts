import {Role} from '../Enum/role';

export class RegisterRequest {
  id:number;
  nom: string;
  telephone: string;
  poste: string;
  email:string;
  password: string;
  confirmPassword:string;
  role: Role;


  constructor(id: number=0, nom: string="", telephone: string="", poste: string="", email: string="", password: string="",confirmPassword:string="", role: Role=Role.CLIENT) {
    this.id = id;
    this.nom = nom;
    this.telephone = telephone;
    this.poste = poste;
    this.email = email;
    this.password = password;
    this.confirmPassword=confirmPassword;
    this.role = role;
  }
}
