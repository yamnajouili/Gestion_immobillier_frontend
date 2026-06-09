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
  selector: 'app-blogs',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule, 
    NavbarComponent, 
    FooterComponent
  ],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss'
})
export class BlogsComponent {

  blogData: Blog[] = blog;  

}
