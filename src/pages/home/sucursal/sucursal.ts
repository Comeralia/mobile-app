import { Component } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { DataProvider } from '../../../providers/data';

@Component({
  selector: 'page-sucursal',
  templateUrl: 'sucursal.html'
})
export class Sucursal {
  segment: string = 'rest'
  sucursalId: number = 0
  sucursal: any
  specialties: any
  offers: any
  loading: any
  constructor(
    public navCtrl: NavController, private _data: DataProvider,
    public navParams: NavParams, public http: Http,
    public loadingCtrl: LoadingController
  ) {
    this.sucursalId = this.navParams.get('sucursal_id');
  }

  ionViewWillEnter(){
    this.getEstablishment(this.sucursalId)
  }

  ionViewDidEnter(){
    this._data.setSingleRestaurant(true)
  }

  getEstablishment(sucursalId){
    this.loading = this.loadingCtrl.create({
      content: 'Obteniendo información ...'
    });
    this.loading.present();
    this.http.get(
      'https://comeralia.herokuapp.com/api/v1/establishments/'+sucursalId).
    map(res => res.json())
    .subscribe(
      data => {
        this.sucursal = data;
        this.specialties = this.sucursal.specialties
        this.offers = this.sucursal.offers
        console.log(this.sucursal)
        this.loading.dismiss()
      },
      err => {
        console.log("Oops!")
        this.loading.dismiss()
      }
    );
  }

}
