import { Pipe, PipeTransform } from '@angular/core';
import { iQuestion } from '../questions/questions.model';

@Pipe({
  name: 'adminquestionsfilter',
  standalone: true
})
export class AdminquestionsfilterPipe implements PipeTransform {

  transform(allquestions: iQuestion[], searchString:string):iQuestion[] {
    if(searchString == ''){
      return allquestions
    }
    let allquestionsfiltered = []
    for (let rec of allquestions){
      if(rec.qtitle.toLocaleLowerCase().includes(searchString.toLocaleLowerCase())){
        allquestionsfiltered.push(rec)
      }
    }
    return allquestionsfiltered
  }

}
