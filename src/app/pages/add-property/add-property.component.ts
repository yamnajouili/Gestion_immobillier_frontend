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
 constructor(private bienService :BienService ,private toastr: ToastrService) {
 }

  isLoading: boolean = false;

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

  nextStep() {
    if (this.etape < 4) {
      this.etape++;
    }
  }

  prevStep() {
    if (this.etape > 1) {
      this.etape--;
    }
  }
  toggleClass() {
    this.activeSidebar = !this.activeSidebar;
  }



}
