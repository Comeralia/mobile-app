import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { ListaPromos } from '../lista/lista';

@Component({
  selector: 'page-single-promo',
  templateUrl: 'single.html'
})
export class SinglePromo {

  constructor(public navCtrl: NavController) {

  }
  getItems(event){
    console.log('Hola');
  }

}
