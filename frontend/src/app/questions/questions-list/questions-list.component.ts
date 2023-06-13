import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-questions-list',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.css']
})
export class QuestionsListComponent {
  questions = [
    {
      "id":1,
      "Title": "Is it goind to rain today",
      "Body": "I wanted to know if its going to rain today so that i can \
      carry an umbrella. According to the appearance of the clouds they are dark in color",
      "Tags": "'Umbrella','Clouds','Rain'"
    },
    {
      "id":2,
      "Title": "Is it goind to rain today",
      "Body": "I wanted to know if its going to rain today so that i can \
      carry an umbrella. According to the appearance of the clouds they are dark in color",
      "Tags": "'Umbrella','Clouds','Rain'"
    },
    {
      "id":3,
      "Title": "Is it goind to rain today",
      "Body": "I wanted to know if its going to rain today so that i can \
      carry an umbrella. According to the appearance of the clouds they are dark in color",
      "Tags": "'Umbrella','Clouds','Rain'"
    },
    {
      "id":4,
      "Title": "Is it goind to rain today",
      "Body": "I wanted to know if its going to rain today so that i can \
      carry an umbrella. According to the appearance of the clouds they are dark in color",
      "Tags": "'Umbrella','Clouds','Rain'"
    }
  ]
}
