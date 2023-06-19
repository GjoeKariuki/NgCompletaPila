import { Injectable } from '@angular/core';
import { InMemoryDbService} from 'angular-in-memory-web-api'
import { Question } from './questions/questions.model';



@Injectable({
    providedIn:'root'
})
export class IndbMemoryService implements InMemoryDbService {
    constructor() {}
    createDb(){
        const questions:Question[] = [
            {id:1, Title: "How do i style the inner paragraphs with italics and colors", Body:["<div><p>loremsdjfbsjdfjsfs</p><p>loremsdjfbsjdfjsfs</p></div>"], Tags:["html","css"]},            
            {id:2, Title: "How do i style the inner paragraphs with italics and colors", Body:["<div><p>loremsdjfbsjdfjsfs</p><p>loremsdjfbsjdfjsfs</p></div>"], Tags:["html","css"]},
            {id:3, Title: "How do i style the inner paragraphs with italics and colors", Body:["<div><p>loremsdjfbsjdfjsfs</p><p>loremsdjfbsjdfjsfs</p></div>"], Tags:["html","css"]},
            {id:4, Title: "How do i style the inner paragraphs with italics and colors", Body:["<div><p>loremsdjfbsjdfjsfs</p><p>loremsdjfbsjdfjsfs</p></div>"], Tags:["html","css"]},
            {id:5, Title: "How do i style the inner paragraphs with italics and colors", Body:["<div><p>loremsdjfbsjdfjsfs</p><p>loremsdjfbsjdfjsfs</p></div>"], Tags:["html","css"]},            
            {id:6, Title: "How do i style the inner paragraphs with italics and colors", Body:["<div><p>loremsdjfbsjdfjsfs</p><p>loremsdjfbsjdfjsfs</p></div>"], Tags:["html","css"]},
            {id:7, Title: "How do i style the inner paragraphs with italics and colors", Body:["<div><p>loremsdjfbsjdfjsfs</p><p>loremsdjfbsjdfjsfs</p></div>"], Tags:["html","css"]},
            {id:8, Title: "How do i style the inner paragraphs with italics and colors", Body:["<div><p>loremsdjfbsjdfjsfs</p><p>loremsdjfbsjdfjsfs</p></div>"], Tags:["html","css"]},
            {id:9, Title: "How do i style the inner paragraphs with italics and colors", Body:["<div><p>loremsdjfbsjdfjsfs</p><p>loremsdjfbsjdfjsfs</p></div>"], Tags:["html","css"]},
            {id:0, Title: "How do i style the inner paragraphs with italics and colors", Body:["<div><p>loremsdjfbsjdfjsfs</p><p>loremsdjfbsjdfjsfs</p></div>"], Tags:["html","css"]}

        ]
        return {questions}
    }
}