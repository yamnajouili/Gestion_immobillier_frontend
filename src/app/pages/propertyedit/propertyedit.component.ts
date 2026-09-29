import {Component, OnInit} from '@angular/core';
import {BienService} from '../../service/bien.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Bien} from '../../Models/bien';
import {CommonModule} from '@angular/common';
import {SidebarComponent} from '../../components/sidebar/sidebar.component';
import {TopbarComponent} from '../../components/topbar/topbar.component';
import {FooterAdminComponent} from '../../components/footer-admin/footer-admin.component';
import {FormsModule} from '@angular/forms';
import {Imagefile} from '../../Models/imagefile';

@Component({
  selector: 'app-propertyedit',
  imports: [
    CommonModule,
    RouterLink,
    SidebarComponent,
    TopbarComponent,
    FooterAdminComponent,
    FormsModule
  ],
  templateUrl: './propertyedit.component.html',
  styleUrl: './propertyedit.component.scss'
})
export class PropertyeditComponent implements OnInit{
  activeSidebar: boolean = true;

  etape: number = 1;

  bien: Bien = new Bien();

  bienId!: number;

  isLoading: boolean = false;
  isLoadingBien: boolean = true;
  selectedFiles: File[] = [];
  previewUrls: string[] = [];

  onFilesSelected(event: Event): void {

    const input = event.target as HTMLInputElement;

    if (!input.files) {
      return;
    }

    const files = Array.from(input.files);

    files.forEach(file => {

      this.selectedFiles.push(file);

      const reader = new FileReader();

      reader.onload = () => {
        this.previewUrls.push(reader.result as string);
      };

      reader.readAsDataURL(file);
    });

    // Permet de sélectionner à nouveau le même fichier
    input.value = '';
  }
  supprimerNouvelleImage(index: number): void {

    this.selectedFiles.splice(index, 1);
    this.previewUrls.splice(index, 1);

  }

  constructor(
    private bienService: BienService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,

  ) {}

  ngOnInit(): void {

    // Récupérer l'id depuis /edit-property/:id
    this.bienId = Number(
      this.route.snapshot.paramMap.get('id')
    );

    console.log('ID du bien :', this.bienId);

    if (!this.bienId) {
      this.toastr.error('Identifiant du bien invalide', 'Erreur');
      this.router.navigate(['/all-property']);
      return;
    }

    this.loadBien();
  }

  // ==========================================
  // CHARGER LE BIEN
  // ==========================================

  loadBien(): void {

    this.isLoadingBien = true;

    this.bienService.getBienById(this.bienId)
      .subscribe({

        next: (data) => {

          console.log('Bien récupéré :', data);

          this.bien = data;

          this.isLoadingBien = false;
        },

        error: (err) => {

          console.error(
            'Erreur récupération bien :',
            err
          );

          this.toastr.error(
            'Impossible de récupérer le bien',
            'Erreur'
          );

          this.isLoadingBien = false;
        }
      });
  }


  // ==========================================
  // MODIFIER
  // ==========================================

  update(): void {

    if (this.isLoading) {
      return;
    }

    this.isLoading = true;

    console.log('Bien envoyé :', this.bien);

    // 1 - Modifier les informations du bien
    this.bienService.updateBien(this.bien)
      .subscribe({

        next: (res) => {

          console.log('Bien modifié :', res);

          // 2 - Vérifier s'il y a de nouvelles images
          if (this.selectedFiles.length > 0) {

            // Ajouter les nouvelles images
            this.bienService.uploadImages(
              this.bien.id,
              this.selectedFiles
            ).subscribe({

              next: () => {

                console.log('Images ajoutées avec succès');

                this.toastr.success(
                  'Bien et images modifiés avec succès',
                  'Succès',
                  {
                    timeOut: 3000,
                    progressBar: true,
                    closeButton: true,
                    positionClass: 'toast-top-right'
                  }
                );

                this.isLoading = false;

                this.router.navigate(['/all-property']);
              },

              error: (err) => {

                console.error(
                  'Erreur ajout images :',
                  err
                );

                this.toastr.error(
                  'Bien modifié mais erreur lors de l’ajout des images',
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

          } else {

            // Aucune nouvelle image
            this.toastr.success(
              'Bien modifié avec succès',
              'Succès',
              {
                timeOut: 3000,
                progressBar: true,
                closeButton: true,
                positionClass: 'toast-top-right'
              }
            );

            this.isLoading = false;

            this.router.navigate(['/all-property']);
          }
        },

        error: (err) => {

          console.error(
            'Erreur modification :',
            err
          );

          this.toastr.error(
            'Erreur lors de la modification du bien',
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

  // ==========================================
  // WIZARD
  // ==========================================

  nextStep(): void {

    if (this.etape < 4) {
      this.etape++;
    }
  }

  prevStep(): void {

    if (this.etape > 1) {
      this.etape--;
    }
  }


  toggleClass(): void {
    this.activeSidebar = !this.activeSidebar;
  }

  supprimerImage(image: Imagefile): void {

    if (!image?.id) {
      console.error('ID de l’image introuvable :', image);
      return;
    }

    this.bienService.deleteImage(image.id).subscribe({

      next: () => {

        this.bien.images = this.bien.images.filter(
          (img: any) => img.id !== image.id
        );

        console.log('Image supprimée avec succès');
      },

      error: (error) => {
        console.error(
          'Erreur lors de la suppression de l’image :',
          error
        );
      }

    });
  }}
