import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FontAwesomeModule} from '@fortawesome/angular-fontawesome'
import {faCheckDouble, fa8} from '@fortawesome/free-solid-svg-icons'





@Component({
  selector: 'app-answerslist',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './answerslist.component.html',
  styleUrls: ['./answerslist.component.css']
})
export class AnswerslistComponent {
  //faCoffee = faCoffee
  commenz = false
  faChessKnight = faCheckDouble
  fa8 = fa8

  toggleBelow(){
    this.commenz = !this.commenz
  }

}
