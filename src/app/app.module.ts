import { NgModule, ErrorHandler,Pipe, PipeTransform  } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { Keyboard } from '@ionic-native/keyboard';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage'
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { TransformDay } from '../pipes/transformDay';
import { ExcludeNull, ReturnDefault } from '../pipes/excludeNull';
// import { OrderModule } from 'ngx-order-pipe';
// HOME PAGE
import { HomePage, SelectCity } from '../pages/home/home/home';
import { FoodType } from '../pages/home/foodtype/foodtype';
import { Venue } from '../pages/home/venue/venue';
import { Sucursal } from '../pages/home/sucursal/sucursal';
// PROMOCIONES
import { ListaPromos } from '../pages/promos/lista/lista';
import { SinglePromo } from '../pages/promos/single/single';
// CERCANO
import { MapPage } from '../pages/cercano/map/map';
import { DataProvider } from '../providers/data';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SelectCity,
    FoodType,
    Venue,
    Sucursal,
    ListaPromos,
    SinglePromo,
    MapPage,
    TabsPage,
    TransformDay,
    ExcludeNull,
    ReturnDefault
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SelectCity,
    FoodType,
    Venue,
    Sucursal,
    ListaPromos,
    SinglePromo,
    MapPage,
    TabsPage
  ],
  providers: [
    DataProvider,
    StatusBar,
    SplashScreen,
    Keyboard,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
