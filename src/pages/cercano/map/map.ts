import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  constructor(
    public navCtrl: NavController, public loadingCtrl: LoadingController,
    public geolocation: Geolocation
  ) {

  }
  public loading = this.loadingCtrl.create({
    content: 'cargando ubicación actual...'
  });
  public myPos;
  public intervalo;

  ionViewWillEnter(){
    console.log('view is loaded');
    this.loadMap();
    this.loading.present();
  }

  // ionViewDidLeave(){
  //   this.stopFunc();
  // }

  loadMap(){
    console.log('load map');
    this.geolocation.getCurrentPosition().then((position) => {
      console.log('got current position');
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      this.myPos = latLng;
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.loading.dismiss();
      this.addMarker();
    }, (err) => {
      console.log(err);
    });
  }

  addMarker(){
    console.log('add marker');
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.myPos,
    });
    let content = "<h4>Information!</h4>";
    this.addInfoWindow(marker, content);
    // this.intervalo = setInterval(function(){
    //   console.log('interval fired')
    //   Geolocation.getCurrentPosition().then((position) => {
    //     let latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    //     marker.setPosition(latlng);
    //     this.myPos = latlng;
    //   });
    // }, 1500);
  }

  // stopFunc(){
  //   clearInterval(this.intervalo);
  // }
  addInfoWindow(marker, content){
    console.log('add info window')
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }
}
