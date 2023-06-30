import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-pagenotfound',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.css']
})
export class PagenotfoundComponent {
  constructor(private  router:Router, private route:ActivatedRoute) {

  }
  goBack(){
    this.router.navigate(['../'],{relativeTo:this.route})
  }
}
