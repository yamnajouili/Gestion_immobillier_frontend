import {Chatfile} from './chatfile';

export class Chatmessage {


  id: number;
  chatId: string;
  senderId: number;
  recipientId: number;
  content: string;
  timestamp?: Date;
  files: Chatfile[] ;

  constructor(id: number=0, chatId: string="", senderId: number=0, recipientId: number=0, content: string="", timestamp: Date=new Date(),    files: Chatfile[] = []) {
    this.id = id;
    this.chatId = chatId;
    this.senderId = senderId;
    this.recipientId = recipientId;
    this.content = content;
    this.timestamp = timestamp;
    this.files = files;
  }
}
