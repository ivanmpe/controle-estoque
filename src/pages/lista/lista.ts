import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the ListaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lista',
  templateUrl: 'lista.html',
})
export class ListaPage {

    produtos: Observable<any>;

    constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, database : AngularFireDatabase) {
      this.produtos = database.list('produtos').valueChanges();
    }
    showAlert(nome: string, peso: string, preco: string, quantidade: string ) {
        let alert = this.alertCtrl.create({
          title: nome ,
          subTitle: 'Preco Unitário: ' + preco + " \nPeso: "+ peso + " \nQuantidade: " + quantidade, 
          buttons: ['OK']
        });
        alert.present();
      }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaPage');
  }

}
