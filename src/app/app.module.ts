import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { AngularFireDatabase } from 'angularfire2/database';
import {AngularFireModule} from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import {FormsModule} from '@angular/forms';
import { CadastroPage} from '../pages/cadastro/cadastro';
import {PagetabsPage} from '../pages/pagetabs/pagetabs';
import {InfoProdutoPage} from '../pages/info-produto/info-produto';
import { ProdutoService } from '../providers/produto/produto.service';
import { MudarSenhaPage} from '../pages/mudar-senha/mudar-senha';
import { AboutPage} from '../pages/about/about';


var config = {
   apiKey: "AIzaSyBnUP7i0PHO6AhxTZ8-fPuA8M8sFZn2vt4",
   authDomain: "controle-de-estoque-20767.firebaseapp.com",
   databaseURL: "https://controle-de-estoque-20767.firebaseio.com",
   projectId: "controle-de-estoque-20767",
   storageBucket: "",
   messagingSenderId: "181241066356"
 };

 @NgModule({
   declarations: [
     MyApp,
     HomePage,
     CadastroPage,
     PagetabsPage,
     InfoProdutoPage,
     MudarSenhaPage,
     AboutPage

   ],
   imports: [
     BrowserModule,
     IonicModule.forRoot(MyApp),
     AngularFireModule.initializeApp(config),
     FormsModule
   ],
   bootstrap: [IonicApp],
   entryComponents: [
     MyApp,
     HomePage,
     CadastroPage,
     PagetabsPage,
     InfoProdutoPage,
     MudarSenhaPage,
     AboutPage
   ],
   providers: [
     StatusBar,
     SplashScreen,
     AngularFireDatabase,
     AngularFireAuth,
     {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProdutoService,

   ]
 })
export class AppModule {}
