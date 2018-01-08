import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name : "transformDay"
})

export class TransformDay{

  transform(n): string{
    console.log('TransformDay')
    console.log(n);
    let day = ''
    switch(n){
      case '1':{
        day = 'Lunes';
        break;
      }
      case '2':{
        day = 'Martes';
        break;
      }
      case '3':{
        day = 'Miércoles';
        break;
      }
      case '4':{
        day = 'Jueves';
        break;
      }
      case '5':{
        day = 'Viernes';
        break;
      }
      case '6':{
        day = 'Sábado';
        break;
      }
      case '7':{
        day = 'Domingo';
        break;
      }
      default:{
        day = '';
        break;
      }
    }
    console.log(day)
    return day
  }
}
