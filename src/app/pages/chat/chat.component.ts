
import { CommonModule } from '@angular/common';
import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { TopbarComponent } from '../../components/topbar/topbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { NgClickOutsideDirective } from 'ng-click-outside2';

import { ChatService } from '../../service/chat.service';
import { Chatmessage } from '../../Models/chatmessage';
import { UserService } from '../../service/user.service';
import { User } from '../../Models/user';
import { Contactdto } from '../../Models/contactdto';
import {SidebaruserComponent} from '../../components/sidebaruser/sidebaruser.component';
import {PropriétaireService} from '../../service/propriétaire.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    SidebarComponent,
    TopbarComponent,
    FooterComponent,
    NgClickOutsideDirective,SidebaruserComponent
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit {

  activeSidebar: boolean = true;
  showEmojiPicker: boolean = false;
  emojis: string[] = [
    '😀', '😂', '😍', '🥰', '😊',
    '😎', '😢', '😭', '😡', '🤔',
    '👍', '👎', '❤️', '🔥', '🎉',
    '👏', '🙏', '👌', '🏠', '🔑'
  ];

  user: User = new User();
  selectedContact: Contactdto | null = null;
  messages: Chatmessage[] = [];
  contacts: Contactdto[] = [];
  selectedFiles: File[] = [];
  previewUrls: string[] = [];
  senderId!: number;
  recipientId!: number;

  show: boolean = false;

  constructor(
    private chatService: ChatService,
    private userservice: UserService,
    private ngZone: NgZone,
    private route: ActivatedRoute,
    private proprietaireservice:PropriétaireService
  ) {}

  // =====================================================
  // ngOnInit
  // =====================================================
  ngOnInit(): void {

    // ✅ 1. Lire recipientId depuis l'URL
    this.route.queryParamMap.subscribe(params => {
      const id = params.get('recipientId');
      if (id) {
        this.recipientId = Number(id);
        console.log('🆔 recipientId reçu =', this.recipientId);

        if (this.senderId) {
          this.getMessages();
        }
      }
    });

    // ✅ 2. Récupérer l'utilisateur connecté
    this.getUserConnecte();

    // ✅ 3. Connexion WebSocket
    this.chatService.connect((message: Chatmessage) => {

      console.log('📩 Nouveau message reçu :', message);

      this.loadContacts();

      const isForCurrentConversation =
        (message.senderId === this.senderId && message.recipientId === this.recipientId)
        ||
        (message.senderId === this.recipientId && message.recipientId === this.senderId);

      if (!isForCurrentConversation) return;

      // ✅ Éviter le doublon : ignorer mes propres messages (déjà affichés)
      if (message.senderId === this.senderId) {
        console.log('↩️ Mon propre message ignoré (déjà affiché)');
        return;
      }

      this.ngZone.run(() => {
        this.messages = [...this.messages, message];
      });
    });
  }

  // =====================================================
  // Récupérer l'utilisateur connecté
  // =====================================================
  getUserConnecte(): void {
    this.userservice.getUserConnecte().subscribe({
      next: (value: User) => {
        this.user = value;
        this.senderId = value.id;

        console.log('================================');
        console.log('👤 Utilisateur connecté :', this.user);
        console.log('🆔 senderId =', this.senderId);
        console.log('🆔 recipientId =', this.recipientId);
        console.log('================================');

        this.loadContacts();

        // ✅ LA CORRECTION CLÉ : charger les messages ici
        if (this.recipientId) {
          console.log('✅ Les 2 IDs sont prêts → getMessages()');
          this.getMessages();
        } else {
          console.warn('⚠️ recipientId pas encore lu depuis l\'URL');
        }
      },
      error: (error: any) => {
        console.error('❌ Erreur utilisateur connecté :', error);
      }
    });
  }

  // =====================================================
  // Charger la liste des contacts
  // =====================================================
  loadContacts(): void {
    if (!this.senderId) return;

    // @ts-ignore
    this.chatService.getContacts(this.senderId).subscribe({
      complete(): void {
      },
      next: (res: Contactdto[]) => {
        console.log('👥 Contacts chargés :', res);
        this.contacts = res;

        if (this.recipientId && !this.selectedContact) {

          const found = res.find(c => c.id === this.recipientId);

          if (found) {

            // Conversation existe déjà
            this.selectedContact = found;

          } else {

            // Première conversation avec ce propriétaire
            this.proprietaireservice.getProprietaireById(this.recipientId)
              .subscribe({
                next: (proprietaire: any) => {

                  this.selectedContact = {
                    id: proprietaire.id,
                    name: proprietaire.nom,
                    image: '',
                    status: 'offline',
                    lastMessage: ''
                  };

                  console.log(
                    '✅ Nouveau propriétaire sélectionné :',
                    this.selectedContact
                  );
                },

                error: (err) => {
                  console.error(
                    '❌ Impossible de récupérer le propriétaire',
                    err
                  );
                }
              });
          }
        }
      },
      error: (err: any) => {
        console.error('❌ Erreur contacts :', err);
      }
    });
  }

  // =====================================================
  // Récupérer les anciens messages
  // =====================================================
  getMessages(): void {
    if (!this.senderId || !this.recipientId) {
      console.warn('⚠️ senderId ou recipientId manquant');
      return;
    }

    console.log('📨 Récupération messages : senderId =', this.senderId, 'recipientId =', this.recipientId);

    this.chatService.getMessages(this.senderId, this.recipientId).subscribe({
      next: (res: Chatmessage[]) => {
        console.log('✅ Messages chargés :', res.length, res);
        this.messages = res;
      },
      error: (err: any) => {
        console.error('❌ Erreur récupération messages :', err);
      }
    });
  }

  // =====================================================
  // Sélectionner une conversation
  // =====================================================
  selectContact(item: Contactdto): void {
    console.log('🔄 Changement de contact :', item);

    this.recipientId = item.id;
    this.selectedContact = item;
    this.messages = [];
    this.getMessages();
  }

  // =====================================================
  // Envoyer un message
  // =====================================================
  // send(text: string): void {
  //
  //   if (!text || !text.trim()) return;
  //
  //   if (!this.senderId) {
  //     console.error('❌ senderId non disponible');
  //     return;
  //   }
  //
  //   if (!this.recipientId) {
  //     console.error('❌ recipientId non disponible');
  //     return;
  //   }
  //
  //   const message = new Chatmessage(
  //     0,
  //     '',
  //     this.senderId,
  //     this.recipientId,
  //     text.trim(),
  //     new Date()
  //   );
  //
  //   console.log('📤 Envoi message :', message);
  //
  //   // ✅ CORRECTION : affichage immédiat
  //   this.messages = [...this.messages, message];
  //
  //   // ✅ Envoi via WebSocket
  //   this.chatService.sendMessage(message);
  //
  //   // ✅ Rafraîchir la liste des contacts
  //   this.loadContacts();
  // }



  send(text: string): void {

    const content = text?.trim() || '';

    // Rien à envoyer
    if (!content && this.selectedFiles.length === 0) {
      return;
    }

    if (!this.senderId) {
      console.error('❌ senderId non disponible');
      return;
    }

    if (!this.recipientId) {
      console.error('❌ recipientId non disponible');
      return;
    }

    // =====================================================
    // CAS 1 : message texte seulement
    // =====================================================
    if (this.selectedFiles.length === 0) {

      const message = new Chatmessage(
        0,
        '',
        this.senderId,
        this.recipientId,
        content,
        new Date(),
        []
      );

      this.messages = [...this.messages, message];

      this.chatService.sendMessage(message);

      this.loadContacts();

      return;
    }

    // =====================================================
    // CAS 2 : photos / vidéos
    // =====================================================
    this.chatService.uploadFiles(this.selectedFiles).subscribe({

      next: (files) => {

        console.log('📎 Fichiers uploadés :', files);

        const message = new Chatmessage(
          0,
          '',
          this.senderId,
          this.recipientId,
          content,
          new Date(),
          files
        );

        console.log('📤 Message avec fichiers :', message);

        // Affichage immédiat
        this.messages = [...this.messages, message];

        // WebSocket
        this.chatService.sendMessage(message);

        // Nettoyer les fichiers sélectionnés
        this.selectedFiles = [];
        this.previewUrls = [];

        this.loadContacts();
      },

      error: (err) => {
        console.error('❌ Erreur upload fichiers :', err);
      }
    });
  }




  // =====================================================
  // Sidebar
  // =====================================================
  toggleClass(): void {
    this.activeSidebar = !this.activeSidebar;
  }

  // =====================================================
  // Menu chat
  // =====================================================
  chatDropdown(): void {
    this.show = !this.show;
  }

  // =====================================================
  // Fermer menu
  // =====================================================
  closeOutsideClick(): void {
    this.show = false;
  }

  onFilesSelected(event: Event): void {

    const input = event.target as HTMLInputElement;

    if (!input.files) {
      return;
    }

    const files = Array.from(input.files);

    files.forEach(file => {

      // Accepter seulement images et vidéos
      if (
        !file.type.startsWith('image/') &&
        !file.type.startsWith('video/')
      ) {
        return;
      }

      this.selectedFiles.push(file);
    });

    // Permet de sélectionner à nouveau le même fichier
    input.value = '';

    console.log('📎 Fichiers sélectionnés :', this.selectedFiles);
  }

  toggleEmojiPicker(): void {
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  addEmoji(emoji: string, input: HTMLInputElement): void {

    // Ajouter l'emoji dans le message
    input.value += emoji;

    // Fermer la fenêtre emoji
    this.showEmojiPicker = false;

    // Remettre le curseur dans l'input
    input.focus();
  }

  removeSelectedFile(i: number) {
    
  }
}
