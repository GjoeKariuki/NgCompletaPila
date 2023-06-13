import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FontAwesomeModule} from '@fortawesome/angular-fontawesome'
import {faCheckDouble, fa8} from '@fortawesome/free-solid-svg-icons'
// import {} from '@fortawesome/free-brands-svg-icons'
//import {} from '@fortawesome/free-regular-svg-icons'
// import {} from '@fortawesome/fontawesome-common-types'
// import {} from '@fortawesome/fontawesome-svg-core'




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
