import { CommonModule } from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import { NavbarComponent } from '../../../../components/navbar/navbar.component';
import { tns } from 'tiny-slider/src/tiny-slider';
import { FooterComponent } from '../../../../components/footer/footer.component';
import {BienService} from '../../../../service/bien.service';
import {Bien} from '../../../../Models/bien';
import {FooterAdminComponent} from '../../../../components/footer-admin/footer-admin.component';
import * as L from 'leaflet';
import {UserService} from '../../../../service/user.service';
import {User} from '../../../../Models/user';
import {Propositionachat} from '../../../../Models/propositionachat';
import {PropositionAchatService} from '../../../../service/proposition-achat.service';
import {FormsModule} from '@angular/forms';
@Component({
  selector: 'app-property-detail-two',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterLink,
    NavbarComponent,
    FooterAdminComponent
  ],
  templateUrl: './property-detail-two.component.html',
  styleUrl: './property-detail-two.component.scss'
})
export class PropertyDetailTwoComponent implements OnInit{
  slider: any;

  bien: Bien=new Bien();
  propertyMap!: L.Map;
  propertyMarker!: L.Marker;
  user:User=new User();
  afficherModalProposition = false;
  erreurProposition = '';
  envoiProposition = false;
  proposition: Propositionachat = new Propositionachat();

  constructor(private route: ActivatedRoute,  private bienService: BienService,private router:Router,private userService:UserService
  ,private propositionAchatService:PropositionAchatService)
  {}
  ngOnInit(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    console.log('ID du bien :', id);

    this.getBienById(id);

    this.userService.getUserConnecte().subscribe({
      next: (data) => {
        this.user = data;

        console.log('User connecté :', this.user);
        console.log('Role :', this.user.role);
      },
      error: (err) => {
        console.error('Erreur récupération user :', err);
      }
    });
  }



  contacterProprietaire(item: Bien): void {
    if (!item.proprietaire?.id) {
      console.warn('Pas de propriétaire pour ce bien', item);
      return;
    }
    this.router.navigate(['/chat'], {
      queryParams: { recipientId: item.proprietaire.id }
    });
  }
  initialiserMapBien(): void {

    setTimeout(() => {

      if (!this.bien.latitude || !this.bien.longitude) {
        return;
      }

      if (this.propertyMap) {
        this.propertyMap.remove();
      }

      const markerIcon = L.icon({
        iconUrl: 'assets/leaflet/marker-icon.png',
        shadowUrl: 'assets/leaflet/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });

      this.propertyMap = L.map('propertyMap', {
        scrollWheelZoom: false
      }).setView(
        [this.bien.latitude, this.bien.longitude],
        16
      );

      L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          attribution: '&copy; OpenStreetMap'
        }
      ).addTo(this.propertyMap);

      this.propertyMarker = L.marker(
        [this.bien.latitude, this.bien.longitude],
        { icon: markerIcon }
      )
        .addTo(this.propertyMap)
        .bindPopup(this.bien.titre || 'Localisation du bien');

      setTimeout(() => {
        this.propertyMap.invalidateSize();
      }, 100);

    }, 100);
  }
  getBienById(id: number): void {

    this.bienService.getBienById(id)
      .subscribe({

        next: (data) => {

          console.log('Bien récupéré :', data);

          this.bien = data;
          this.initialiserSlider();
          this.initialiserMapBien();

        },

        error: (error) => {

          console.error(
            'Erreur récupération bien :',
            error
          );

        }

      });
  }

  isVideo(url: string): boolean {

    if (!url) {
      return false;
    }

    const file = url.toLowerCase().split('?')[0];

    return file.endsWith('.mp4') ||
      file.endsWith('.webm') ||
      file.endsWith('.ogg') ||
      file.endsWith('.mov');
  }
  initialiserSlider(): void {

    setTimeout(() => {

      if (!this.bien.images || this.bien.images.length < 2) {
        return;
      }

      this.slider = tns({
        container: '.tiny-one-item',
        items: 1,

        controls: true,

        controlsText: [
          '<i class="mdi mdi-chevron-left"></i>',
          '<i class="mdi mdi-chevron-right"></i>'
        ],

        mouseDrag: true,
        loop: true,

        autoplay: false,

        nav: false,
        speed: 400,
        gutter: 0
      });

    }, 100);
  }


//   ************************************* proposition d'achat*******************************************

  ouvrirProposition(): void {
    this.proposition.montantPropose = 0;
    this.erreurProposition = '';
    this.afficherModalProposition = true;
  }

  fermerProposition(): void {
    if (this.envoiProposition) return;

    this.afficherModalProposition = false;
    this.erreurProposition = '';
  }

  envoyerProposition(): void {

    if (
      !this.bien?.id ||
      this.bien.typeTransaction !== 'VENTE' ||
      this.user?.role !== 'CLIENT' ||
      this.proposition.montantPropose <= 0
    ) {
      this.erreurProposition = 'Veuillez saisir un montant valide.';
      return;
    }

    this.proposition.bienId = this.bien.id;

    this.envoiProposition = true;
    this.erreurProposition = '';

    this.propositionAchatService.ajouter(this.proposition).subscribe({
      next: () => {
        this.envoiProposition = false;
        this.fermerProposition();

        alert('Votre proposition a été envoyée avec succès.');
      },
      error: (error) => {
        console.error('Erreur ajout proposition :', error);
        this.erreurProposition = "Impossible d'envoyer votre proposition.";
        this.envoiProposition = false;
      }
    });
  }
}
