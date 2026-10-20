import {Statutproposition} from '../Enum/statutproposition';

export class Propositionachat {
  id?: number;
  montantPropose: number;
  dateProposition: Date;
  statut: Statutproposition;
  clientId?: number;
  bienId: number;

  constructor(
    montantPropose: number = 0,
    dateProposition: Date =new Date(),
    statut: Statutproposition = Statutproposition.EN_ATTENTE,
    clientId: number = 0,
    bienId: number = 0,
    id: number = 0
  ) {
    this.id = id;
    this.montantPropose = montantPropose;
    this.dateProposition = dateProposition;
    this.statut = statut;
    this.clientId = clientId;
    this.bienId = bienId;
  }
}
