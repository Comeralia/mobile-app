import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise'

@Injectable()
export class DataProvider {
  loading: any
  public data: any
  restaurants: boolean = false
  singleRestaurant: boolean = false
  goingForward: boolean = false
  items: any
  restaurantList: any;

  constructor(
    public http: Http, public loadingCtrl: LoadingController,
    private storage: Storage) {
    this.items = [
        {title: 'Alitas', id: 1},
        {title: 'Cafeterías', id: 2},
        {title: 'Comida Rápida', id: 3},
        {title: 'Cortes', id: 4},
        {title: 'Desayunos', id: 5},
        {title: 'Hamburguesas', id: 6},
        {title: 'Internacional', id: 7},
        {title: 'Italiana', id: 8},
        {title: 'Mariscos', id: 9},
        {title: 'Mexicana', id: 10},
        {title: 'Oriental', id: 11},
        {title: 'Pizzas', id: 12},
        {title: 'Saludable', id: 13},
        {title: 'Tacos', id: 14},
        {title: 'Tortas', id: 15}
      ]
  }
  
  filterItems(searchTerm){
    return this.items.filter((item) => {
      return item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    }); 
  }
  filterRestaurants(searchTerm){
    return this.restaurantList.filter((restaurant) => {
      return restaurant.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }
  
  loadRestaurantList(cityId){
    this.loading = this.loadingCtrl.create({
      content: 'Obteniendo Restaurantes disponibles ...'
    });
    this.loading.present();
    this.http.get('https://comeralia.herokuapp.com/api/v1/cities/'+cityId+'/restaurants').
      map(res => res.json()).subscribe(data => {
        this.restaurantList = data;
        this.loading.dismiss();
      });
  }
  
  
  // Single Restaurant view already loaded
  setSingleRestaurant(boolVal){
    this.singleRestaurant = boolVal
  }
  getSingleRestaurant(){
    return this.singleRestaurant
  }

  // Restaurants view already loaded
  setRestaurants(boolVal){
    this.restaurants = boolVal
  }
  getRestaurants(){
    return this.restaurants
  }

  // Restaurant view chain going forward
  setGoingFoward(boolVal){
    this.goingForward = true
  }
  getGoingForward(){
    return this.goingForward
  }

}
