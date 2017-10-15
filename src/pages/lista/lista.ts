import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AlertController } from 'ionic-angular';
import {InfoProdutoPage} from '../info-produto/info-produto';
import {HomePage} from '../home/home';
@IonicPage()
@Component({
  selector: 'page-lista',
  templateUrl: 'lista.html',
})
export class ListaPage {

    produtos: Observable<any>;
    produto: Array<string>;

    constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, database : AngularFireDatabase) {
      this.produtos = database.list('listas/' + '1').valueChanges();
    }

    /*showAlert(nome: string, peso: string, preco: string, quantidade: string ) {
        let alert = this.alertCtrl.create({
          title: nome ,
          subTitle: 'Preco Unitário: ' + preco + " \nPeso: "+ peso + " \nQuantidade: " + quantidade,
          buttons: ['OK']
        });
        alert.present();
      }
      */

    infoProduto( nome: string, peso: string, preco: string, quantidade: string ) {
      this.produto = [ nome, preco, peso, quantidade];
      this.navCtrl.push(InfoProdutoPage);
    }
    getProduto(){
      return this.produto;
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaPage');
  }

}
