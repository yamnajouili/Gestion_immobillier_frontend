import {Typebien} from '../Enum/typebien';
import {Imagefile} from './imagefile';
import {Propriétaire} from './propriétaire';
export class Bien {
  id: number;
  titre: string;
  description: string;
  prix: number;
  surface: number;
  type: Typebien;
  adresse: string;
  ville: string;
  disponible: boolean;
  images: Imagefile[] = [];
  proprietaire:Propriétaire;


  constructor(id: number=0, titre: string="", description: string="", prix: number=0, surface: number=0,type: Typebien = Typebien.APPARTEMENT, adresse: string="", ville: string="", disponible: boolean=true, images: Imagefile[] = [],proprietaire: Propriétaire=new Propriétaire()) {
    this.id = id;
    this.titre = titre;
    this.description = description;
    this.prix = prix;
    this.surface = surface;
    this.type = type;
    this.adresse = adresse;
    this.ville = ville;
    this.disponible = disponible;
    this.images = images;
    this.proprietaire=proprietaire;
  }
}
