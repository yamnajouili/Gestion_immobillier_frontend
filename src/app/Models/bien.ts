import {Typebien} from '../Enum/typebien';
import {Imagefile} from './imagefile';

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


  constructor(id: number=0, titre: string="", description: string="", prix: number=0, surface: number=0,type: Typebien = Typebien.APPARTEMENT, adresse: string="", ville: string="", disponible: boolean=true, images: Imagefile[] = []) {
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
  }
}
