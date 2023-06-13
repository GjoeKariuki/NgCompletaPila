import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule,FontAwesomeModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  faPenToSquare = faPenToSquare
  changepwd = false
  constructor(){}
  togglePwd()
  {
    this.changepwd = !this.changepwd
  }
  
}
