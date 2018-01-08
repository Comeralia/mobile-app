import { Component, Pipe, PipeTransform } from '@angular/core';
import {CommonModule} from '@angular/common';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { FoodType } from '../foodtype/foodtype';
import { Sucursal } from '../sucursal/sucursal';
import { DataProvider } from '../../../providers/data';

@Component({
  selector: 'page-venue',
  templateUrl: 'venue.html'
})
export class Venue {
  loading: any;
  establishments: any;
  restaurantId: number = 0;
  restaurant: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public http: Http, public loadingCtrl: LoadingController,
    public _data: DataProvider
  ) {
    this.restaurantId = this.navParams.get('restaurant_id');
  }

  ionViewWillEnter() {
    if(!this._data.getSingleRestaurant()){
      this.loading = this.loadingCtrl.create({
        content: 'Obteniendo información ...'
      });
      this.loading.present();
      this.getRestaurantInfo()
    }
  }
  ionViewWillLeave(){
    this._data.setRestaurants(true)
    this._data.setSingleRestaurant(false)
  }

  getRestaurantInfo(){
    this.http.get(
      'http://comeralia.herokuapp.com/api/v1/restaurants/'+this.restaurantId).
      map(res => res.json()).subscribe(data => {
        this.restaurant = data;
        this.establishments = this.restaurant.establishments;
        this._data.setSingleRestaurant(true);
        this.loading.dismiss();
      });
  }
  goToSucursal(sucursal){
    this.navCtrl.push(Sucursal, {sucursal_id: sucursal});
  }

}
