import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  currenTime?: string
  currentDate?: string
  constructor() {
    this.getTimings()
  }

  getTimings(){
    const currently = new Date()
    this.currenTime = currently.toLocaleTimeString()
    this.currentDate = currently.toLocaleDateString()
  }
}
