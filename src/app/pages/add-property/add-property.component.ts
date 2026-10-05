import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { TopbarComponent } from '../../components/topbar/topbar.component';
import {FooterAdminComponent} from '../../components/footer-admin/footer-admin.component';
import {BienService} from '../../service/bien.service';
import {Bien} from '../../Models/bien';
import {FormsModule} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import * as L from 'leaflet';
import {HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-add-property',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    SidebarComponent,
    TopbarComponent,
    FooterAdminComponent,
    FormsModule
  ],
  templateUrl: './add-property.component.html',
  styleUrl: './add-property.component.scss'
})
export class AddPropertyComponent {
  activeSidebar:boolean = true
  setFile: string | null = null;
  etape: number = 1;
  setFiles: string[] = [];
  files: File[] = [];
  previewFiles: string[] = [];
  bien: Bien = new Bien();
 constructor(private bienService :BienService ,private toastr: ToastrService,private http:HttpClient) {
 }

  map!: L.Map;
  marker!: L.Marker;
  isLoading: boolean = false;
  initialiserMap(): void {

    setTimeout(() => {

      if (this.map) {
        this.map.invalidateSize();
        return;
      }

      const markerIcon = L.icon({
        iconUrl: 'assets/leaflet/marker-icon.png',
        shadowUrl: 'assets/leaflet/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });

      // Position initiale : Tunis
      this.map = L.map('map', {
        scrollWheelZoom: false,
        touchZoom: false
      }).setView([36.8065, 10.1815], 12);

      L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          attribution: '&copy; OpenStreetMap'
        }
      ).addTo(this.map);

      setTimeout(() => {
        this.map.invalidateSize();
      }, 200);

      // Clic sur la carte
      this.map.on('click', (event: L.LeafletMouseEvent) => {

        const latitude = event.latlng.lat;
        const longitude = event.latlng.lng;

        // Enregistrer les coordonnées
        this.bien.latitude = latitude;
        this.bien.longitude = longitude;

        console.log('Latitude :', latitude);
        console.log('Longitude :', longitude);

        // Supprimer ancien marqueur
        if (this.marker) {
          this.map.removeLayer(this.marker);
        }

        // Nouveau marqueur
        this.marker = L.marker(
          [latitude, longitude],
          { icon: markerIcon }
        ).addTo(this.map);

        // ⭐ Récupérer automatiquement adresse + ville
        this.remplirAdresse(latitude, longitude);
      });

    }, 100);
  }

  submit() {

    // 🚨 anti double click
    if (this.isLoading) return;

    this.isLoading = true;

    this.bienService.createBienWithImages(this.bien, this.files)
      .subscribe({
        next: (res) => {

          console.log("Bien ajouté", res);
          this.toastr.success(
            'Bien ajouté avec succès',
            'Succès',
            {
              timeOut: 3000,
              progressBar: true,
              closeButton: true,
              positionClass: 'toast-top-right'
            }
          );

          // 🔄 reset form
          this.bien = new Bien();
          this.files = [];
          this.previewFiles = [];

          // 🔥 retour step 1
          this.etape = 1;

          // optional UX
          window.scrollTo({ top: 0, behavior: 'smooth' });

          this.isLoading = false;
        },

        error: (err) => {

          console.error(err);

          // ❌ TOAST ERROR
          this.toastr.error(
            'Erreur lors de l’ajout du bien',
            'Erreur',
            {
              timeOut: 3000,
              progressBar: true,
              closeButton: true,
              positionClass: 'toast-top-right'
            }
          );

          this.isLoading = false;
        }
      });
  }
  handleChange(event: any) {
    const selectedFiles: File[] = Array.from(event.target.files);

    this.files = selectedFiles;
    this.previewFiles = [];

    selectedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewFiles.push(reader.result as string);
      };
      reader.readAsDataURL(file);
    });
  }
  removeImage(index: number) {
    this.previewFiles.splice(index, 1);
  }
  nextStep(): void {

    if (this.etape < 4) {

      // Si on quitte l'étape 3
      if (this.etape === 3) {
        this.detruireMap();
      }

      this.etape++;

      // Si on arrive à l'étape 3
      if (this.etape === 3) {
        this.initialiserMap();
      }
    }
  }

  prevStep(): void {

    if (this.etape > 1) {

      // Si on quitte l'étape 3
      if (this.etape === 3) {
        this.detruireMap();
      }

      this.etape--;

      // Si on revient à l'étape 3
      if (this.etape === 3) {
        this.initialiserMap();
      }
    }
  }





  detruireMap(): void {
    if (this.map) {
      this.map.remove();
      this.map = undefined as any;
      this.marker = undefined as any;
    }
  }


  toggleClass() {
    this.activeSidebar = !this.activeSidebar;
  }
  remplirAdresse(latitude: number, longitude: number): void {

    const url =
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;

    this.http.get<any>(url).subscribe({

      next: (data) => {

        this.bien.adresse = data.display_name || '';

        this.bien.ville =
          data.address?.city ||
          data.address?.town ||
          data.address?.village ||
          data.address?.municipality ||
          '';

        console.log('Adresse :', this.bien.adresse);
        console.log('Ville :', this.bien.ville);

        // Leaflet recalcule la taille après modification des champs
        setTimeout(() => {
          this.map?.invalidateSize();
        }, 100);
      },

      error: (error) => {
        console.error('Erreur récupération adresse :', error);
      }

    });
  }

}
