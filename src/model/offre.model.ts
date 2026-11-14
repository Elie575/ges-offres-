import { Pub_id } from "./pub_id";

export class OffreEmploi {
    
    id?: number;
    titre?: string;
    description?: string;
    localisation?: string;
    plage_salaire?: string;
    type_contrat?: string;
    exigences?: string;
    date_limite?: Date;
    publie_par?: number;
    cree_le?:Date;
    status?:string;
    publie?:Pub_id;

    constructor() {
      this.id = 0;
      this.titre = '';
      this.description = '';
      this.localisation = '';
      this.plage_salaire = '';
      this.type_contrat = '';
      this.exigences = '';
      this.cree_le  =new Date();
      this.date_limite = new Date(); 
      this.publie_par= 0;
       this.publie=new Pub_id();

    }
  }
  