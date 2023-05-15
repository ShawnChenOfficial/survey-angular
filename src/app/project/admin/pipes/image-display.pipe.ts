import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'imageDisplay'
})
export class ImageDisplayPipe implements PipeTransform {

  transform(value?: string): string {
    if(!value){
      return '';
    }
    return `${environment.baseEndPoint}${environment.imageEndPoint}${value}`;
  }

}
