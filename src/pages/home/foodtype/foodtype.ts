import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
// import { HTTP } from '@ionic-native/http';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { Venue } from '../venue/venue';
import { DataProvider } from '../../../providers/data';

@Component({
  selector: 'page-foodtype',
  templateUrl: 'foodtype.html'
})
export class FoodType {
  restaurants: any;
  loading:any;
  foodCategory:any;
  foodName:any;
  cityId: any;
  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    public http: Http, public loadingCtrl: LoadingController,
    public platform: Platform, private storage: Storage, private _data: DataProvider
  ) {
    this.foodName = this.navParams.get('foodName');
    this.foodCategory = this.navParams.get('foodtype');
    this.cityId = this.navParams.get('city_id');
  }



  ionViewWillEnter() {
    console.log(' Ion View Will Enter ')

  }
  ionViewDidLoad(){
    console.log('hay restaurantes?' +this._data.getRestaurants())
    if(!this._data.getRestaurants()){
      this.loading = this.loadingCtrl.create({
        content: 'Obteniendo restaurantes ...'
      });
      this.loading.present()
      this.getRestaurants()
    }
  }
  ionViewWillLeave(){
    this._data.setRestaurants(false);
    this._data.setGoingFoward(false);
  }
  getRestaurants(){
    let mainUrl = 'http://comeralia.herokuapp.com/api/v1';
    console.log(mainUrl)
    this.storage.get('city_id').then((val) => {
      console.log(mainUrl+'/categories/'+this.foodCategory+'/cities/'+val+'/restaurants')
      if(val === null){
      }else{
        console.log("getting restaurants")
        this.http.get(
          mainUrl+'/categories/'+this.foodCategory+'/cities/'+val+'/restaurants').
        map(res => res.json()).subscribe(data => {
          this.restaurants = data;
          this.loading.dismiss();
          this._data.setRestaurants(true);
          console.log(this.restaurants);
        });

      }
    }).catch((err)=>{
    });

  }

  goToVenue(resId){
    this.navCtrl.push(Venue, {'restaurant_id': resId});
  }

}
