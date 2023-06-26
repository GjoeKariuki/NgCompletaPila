import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-showerror',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './showerror.component.html',
  styleUrls: ['./showerror.component.css']
})
export class ShowerrorComponent {

    @Input() errorMessage!:string|{string:string}
    @Output() close=new EventEmitter()
    onClose(){
      this.close.emit()
    }
}
