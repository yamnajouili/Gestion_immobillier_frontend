import { Component } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { CommonModule } from '@angular/common';
import { AboutComponent } from '../../../components/about/about.component';
import { FeaturesComponent } from '../../../components/features/features.component';
import { PropertiesComponent } from '../../../components/properties/properties.component';
import { ClientsComponent } from '../../../components/clients/clients.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { SwitcherComponent } from '../../../components/switcher/switcher.component';
import { GetInTouchComponent } from '../../../components/get-in-tuch/get-in-touch.component';
import {Bien} from '../../../Models/bien';
import {User} from '../../../Models/user';
import { BienService } from '../../../service/bien.service';
import { UserService } from '../../../service/user.service';
import { Router } from '@angular/router';
import {PreferenceService} from '../../../service/preference.service';
import {Preutilisateur} from '../../../Models/preutilisateur';
@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    NavbarComponent,
    NgSelectModule,
    FormsModule,
    YouTubePlayerModule,
    CommonModule,
    AboutComponent,
    FeaturesComponent,
    PropertiesComponent,
    ClientsComponent,
    GetInTouchComponent,
    FooterComponent,
    SwitcherComponent

  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent{
  preference: Preutilisateur=new Preutilisateur();


  // ✅ À AJOUTER si tu ne les as pas
  surfaceList: any[] = [
    { id: 20,  name: '20 m²' },
    { id: 50,  name: '50 m²' },
    { id: 70,  name: '70 m²' },
    { id: 80,  name: '80 m²' },
    { id: 100, name: '100 m²' },
    { id: 150, name: '150 m²' },
    { id: 200, name: '200 m²' },
  ];

  villes: any[] = [
    { name: 'Tunis' },
    { name: 'Ariana' },
    { name: 'Ben Arous' },
    { name: 'Manouba' },
    { name: 'Sousse' },
    { name: 'Sfax' },
    { name: 'Nabeul' },
    { name: 'Bizerte' },
  ];
  ngOnInit(): void {
    this.getUserConnecte();
    this.loadProperties();
  }
  propertyliste = [
    { name: 'Appartement', value: 'APPARTEMENT' },
    { name: 'Maison', value: 'MAISON' },
    { name: 'Villa', value: 'VILLA' },
    { name: 'Studio', value: 'STUDIO' }
  ];
  propertylist:Bien[]=[]
  user:User=new User();
  constructor(private bienService: BienService,private userService:UserService,private router :Router,private preferenceService:PreferenceService) {
  }





  rechercher(): void {

    console.log('Préférence envoyée :', this.preference);

    this.preferenceService
        .createPreference(this.preference)
        .subscribe({

          next: (response) => {

            console.log(
                'Préférence enregistrée :',
                response
            );

            // Redirection vers la page recommandation
            this.router.navigate(['/recommandation']);
          },

          error: (error) => {

            console.error(
                'Erreur lors de la création de la préférence :',
                error
            );

          }

        });
  }

  loadProperties(): void {
    this.bienService.getBiens().subscribe({
      next: (res: Bien[]) => {
        this.propertylist = res;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
  getUserConnecte(): void {
    this.userService.getUserConnecte().subscribe({
      next: (value: User) => {
        this.user = value;

        console.log('👤 Utilisateur connecté :', this.user);
        console.log('🆔 senderId :', this.user.id);
      },
      error: (error: any) => {
        console.error('❌ Erreur utilisateur connecté :', error);
      }
    });
  }






  contacterProprietaire(item: Bien): void {

    if (!this.user || !this.user.id) {
      console.error('❌ Utilisateur non connecté');
      return;
    }

    if (!item.proprietaire || !item.proprietaire.id) {
      console.error('❌ Propriétaire du bien introuvable');
      return;
    }

    const senderId = this.user.id;
    const recipientId = item.proprietaire.id;

    console.log('🏠 Bien :', item.titre);
    console.log('👤 senderId :', senderId);
    console.log('👤 recipientId :', recipientId);

    this.router.navigate(['/chat'], {
      queryParams: {
        recipientId: recipientId
      }
    });
  }





  // property = [
  //   { id: 1, name: 'Houses' },
  //   { id: 2, name: 'Apartment' },
  //   { id: 3, name: 'Offices' },
  //   { id: 4, name: 'Townhome' },
  // ]

  minPrice = [
    {id: 1, name: '500'},
    {id: 2, name: '1000'},
    {id: 3, name: '2000'},
    {id: 4, name: '3000'},
    {id: 5, name: '4000'}
  ]

  maxPrice = [
    {id: 1, name: '500'},
    {id: 2, name: '1000'},
    {id: 3, name: '2000'},
    {id: 4, name: '3000'},
    {id: 5, name: '4000'}
  ]

  activeindex:number = 1

  formTab(index:number) {
   this.activeindex = index
  }

}
