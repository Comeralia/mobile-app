import { Component } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { SinglePromo } from '../single/single';

@Component({
  selector: 'page-lista-promos',
  templateUrl: 'lista.html'
})
export class ListaPromos {
  offers: any
  loading: any
  cityId: any
  constructor(public navCtrl: NavController, public http: Http,
    public loadingCtrl: LoadingController, private storage: Storage) {
    storage.get('city_id').then((val) => {
      this.cityId = val
      this.getOffers(this.cityId)
    });
  }

  getOffers(city){
    this.loading = this.loadingCtrl.create({
      content: 'Obteniendo promociones del día ...'
    });
    console.log('https://comeralia.herokuapp.com/api/v1/cities/'+city+'/day/'+this.getDay());
    this.loading.present()
    this.http.get(
      'https://comeralia.herokuapp.com/api/v1/cities/'+city+'/day/'+this.getDay()).
    map(res => res.json())
    .subscribe(
      data => {
        this.offers = data;
        console.log(this.offers)
        this.loading.dismiss()
      },
      err => {
        console.log("Oops!")
        this.loading.dismiss()
      }
    );
  }

  getDay(){
    let theDay = new Date()
    let theDay2 = theDay.getDay()+""
    if(theDay2 == "0"){
      theDay2 = "q"
    }
    return theDay2;
  }

  // public goToSingle(){
  //   console.log('go to single');
  //   this.navCtrl.push(SinglePromo);
  // }

}
