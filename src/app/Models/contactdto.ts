export class Contactdto {


  id: number;
  name: string;
  image: string ;
  status: string;
  lastMessage: string;
  lastMessageTime?: Date;

  constructor(id: number=0, name: string="", image: string ="", status: string="", lastMessage: string="", lastMessageTime: Date=new Date()) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.status = status;
    this.lastMessage = lastMessage;
    this.lastMessageTime = lastMessageTime;
  }
}
