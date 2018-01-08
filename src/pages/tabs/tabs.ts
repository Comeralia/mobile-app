import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
// HOME PAGE
import { HomePage } from '../home/home/home';
import { FoodType } from '../home/foodtype/foodtype';
// PROMOCIONES
import { ListaPromos } from '../promos/lista/lista';
import { SinglePromo } from '../promos/single/single';
// CERCANO
import { MapPage } from '../cercano/map/map';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = ListaPromos;
  // tab3Root: any = MapPage;

  constructor() {

  }
}
