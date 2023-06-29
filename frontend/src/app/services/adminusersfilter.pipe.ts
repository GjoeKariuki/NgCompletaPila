import { Pipe, PipeTransform } from '@angular/core';
import { iUser } from '../questions/questions.model';

@Pipe({
  name: 'adminusersfilter',
  standalone: true
})
export class AdminusersfilterPipe implements PipeTransform {

  transform(allusers:iUser[], searchString:string): iUser[] {
    if(searchString == ''){
      return allusers
    }
    let filteredusers = []
    for(let rec of allusers){
      if(rec.uname.toLocaleLowerCase().includes(searchString.toLocaleLowerCase())){
        filteredusers.push(rec)
      }
    }
    return filteredusers
  }

}
