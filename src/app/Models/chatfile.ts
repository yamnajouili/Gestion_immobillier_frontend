export class Chatfile {

  id?: number;
  url: string;
  type: string;
  fileName: string;

  constructor(
    url: string = '',
    type: string = '',
    fileName: string = '',
    id: number=0
  ) {
    this.url = url;
    this.type = type;
    this.fileName = fileName;
    this.id = id;
  }
}
