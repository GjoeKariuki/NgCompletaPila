import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit{
  constructor(private store:Store){}

  ngOnInit(): void {
    this.store.subscribe((state) => console.log('log store from landing', state)
    )
  }

  
}
