// import { Injectable } from '@angular/core';
// import {HttpClient} from '@angular/common/http';
// import {environment} from '../environments/environment';
// import {Observable} from 'rxjs';
// import {Chatmessage} from '../Models/chatmessage';
//
// @Injectable({
//   providedIn: 'root'
// })
// export class ChatService {
//   apiUrl = environment.apiUrl
//   constructor(private http: HttpClient) {}
//
//   getMessages(
//     senderId: number,
//     recipientId: number
//   ): Observable<Chatmessage[]> {
//
//     return this.http.get<Chatmessage[]>(
//       `${this.apiUrl}/messages/${senderId}/${recipientId}`
//     );
//   }
//
//   sendMessage(message: Chatmessage): Observable<Chatmessage> {
//     return this.http.post<Chatmessage>(
//       `${this.apiUrl}/send`,
//       message
//     );
//   }
// }
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { Chatmessage } from '../Models/chatmessage';
import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import {Contactdto} from '../Models/contactdto';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  apiUrl = environment.apiUrl;

  private stompClient!: Client;

  constructor(private http: HttpClient) {}

  // Récupérer les anciens messages
  getMessages(
    senderId: number,
    recipientId: number
  ): Observable<Chatmessage[]> {

    return this.http.get<Chatmessage[]>(
      `${this.apiUrl}/api/chat/messages/${senderId}/${recipientId}`
    );
  }

  // Connexion WebSocket
  connect(onMessage: (message: Chatmessage) => void): void {

    this.stompClient = new Client({

      webSocketFactory: () =>
        new SockJS('http://localhost:8081/ws'),

      reconnectDelay: 5000,

      debug: (message) => {
        console.log(message);
      }
    });

    this.stompClient.onConnect = () => {

      console.log('✅ WebSocket connecté');

      this.stompClient.subscribe(
        '/user/queue/messages',
        (message: IMessage) => {

          const receivedMessage: Chatmessage =
            JSON.parse(message.body);

          console.log('📩 Message reçu :', receivedMessage);

          onMessage(receivedMessage);
        }
      );
    };

    this.stompClient.onStompError = (error) => {
      console.error('❌ Erreur WebSocket :', error);
    };

    this.stompClient.activate();
  }

  // Envoyer un message
  sendMessage(message: Chatmessage): void {

    if (!this.stompClient || !this.stompClient.connected) {
      console.error('❌ WebSocket non connecté');
      return;
    }

    const messageToSend = {
      chatId: null,
      senderId: message.senderId,
      recipientId: message.recipientId,
      content: message.content,
      timestamp: null,

      // ✅ IMPORTANT
      files: message.files || []
    };

    console.log('📤 WebSocket message =', messageToSend);
    console.log('📎 WebSocket files =', messageToSend.files);

    this.stompClient.publish({
      destination: '/app/chat',
      body: JSON.stringify(messageToSend)
    });
  }

  getContacts(userId: number): Observable<any[]> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any[]>(
      `${this.apiUrl}/api/chat/contacts/${userId}`,
      { headers }
    );
  }







  uploadFiles(files: File[]): Observable<any[]> {

    const formData = new FormData();

    files.forEach(file => {
      formData.append('files', file);
    });

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post<any[]>(
      `${this.apiUrl}/api/chat/upload`,
      formData,
      { headers }
    );
  }






}
