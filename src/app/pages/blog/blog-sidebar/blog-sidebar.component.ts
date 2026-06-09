import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import blog from '../../../data/blog.json'
import { FooterComponent } from '../../../components/footer/footer.component';
import { RouterLink } from '@angular/router';

interface Blog{
  id:number
  image:string
  title:string
  date:string
  tag:string
}

@Component({
  selector: 'app-blog-sidebar',
  standalone: true,
  imports: [
    CommonModule, 
    NavbarComponent, 
    FooterComponent,
    RouterLink
  ],
  templateUrl: './blog-sidebar.component.html',
  styleUrl: './blog-sidebar.component.scss'
})
export class BlogSidebarComponent {
  blogData: Blog[] = blog; 
}
