import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Platform } from 'ionic-angular';
import { Http } from '@angular/http';
import { NavController, ModalController, ViewController,
  LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { FoodType } from '../foodtype/foodtype';
import { Venue } from '../venue/venue';
import { DataProvider } from '../../../providers/data';
import {Observable}  from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  loading:any;
  cityId:any;
  searchTerm: string = '';
  searchControl: FormControl;
  searching: any;
  items: any;
  restaurantList: any;
  searchIsOn: boolean = false;
  
  constructor(
    public navCtrl: NavController, public http: Http,
    private storage: Storage, public modalCtrl: ModalController, 
    private platform: Platform, private _data: DataProvider,
    public loadingCtrl: LoadingController
  ) {
    this.searchControl = new FormControl();
  }
  
  ionViewWillEnter(){
    this.checkForVarsInStorage();
  }

  checkForVarsInStorage(){
    this.storage.get('city_id').then((val) => {
      if(val === null){
        this.presentModal();
      }else{
        console.log('city_id: '+val)
        this.cityId = val
        this._data.loadRestaurantList(val);
      }
    }).catch((err)=>{
      console.log('theres no city_id -> '+err)
    });
  }

  ionViewDidLoad(){

  }
  
  ionViewDidEnter(){

  }
  
  setFilteredItems() {
    this.items = this._data.filterItems(this.searchTerm);
    this.restaurantList = this._data.filterRestaurants(this.searchTerm);
  }
  
  activateSearch() {
    this.searchIsOn = true;
    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
      this.searching = false;
      this.setFilteredItems();
    });
  }
  
  onCancel($event){
    this.searchIsOn = false;
  }
  
  onSearchInput(){
    this.searching = true;
  }

  presentModal() {
    let modal = this.modalCtrl.create(SelectCity);
    modal.onDidDismiss(() => {
      this.checkForVarsInStorage();
    });
    modal.present();
  }
  openSelectCityModal(){
    console.log("openSelectCityModal")
    let modal = this.modalCtrl.create(SelectCity);
    modal.present();
  }

  getItems(event){
    console.log('Hola');
  }

  goToFoodType(cat,foodName){
    console.log('cat: '+cat)
    console.log('foodName: '+foodName)
    this.navCtrl.push(FoodType,{foodtype: cat, city_id: this.cityId, foodName: foodName});
  }
  
  goToVenue(resId){
    this.navCtrl.push(Venue, {'restaurant_id': resId});
  }
}


@Component({
  template: `<ion-header>
    <ion-navbar color="comeralia">
      <ion-title>¿De donde eres?</ion-title>
    </ion-navbar>
  </ion-header>

  <ion-content>
    <ion-list>
      <ion-item *ngFor="let city of cities" (click)="saveCityId(city.id)">
        <h2>{{ city.name }}</h2>
      </ion-item>
    </ion-list>
  </ion-content>`
})
export class SelectCity {
  loading: any;
  cities: any;
  
  constructor(
    public viewCtrl: ViewController, public http: Http, public platform: Platform,
    private storage: Storage, public loadingCtrl: LoadingController
  ) {
    this.loading = this.loadingCtrl.create({
      content: 'Obteniendo ciudades disponibles ...'
    });
  }
  
  ionViewWillEnter(){
    this.loading.present();
  }
  
  ionViewDidLoad(){
    this.loadCities()
  }
  
  loadCities(){
    this.http.get('https://comeralia.herokuapp.com/api/v1/cities').
      map(res => res.json()).subscribe(data => {
        this.cities = data;
        this.loading.dismiss();
      });
  }

  saveCityId(cityId){
    this.storage.set('city_id',cityId)
    this.dismiss();
  }
  
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
