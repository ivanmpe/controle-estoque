import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AlertController } from 'ionic-angular';
import {InfoProdutoPage} from '../info-produto/info-produto';


@IonicPage()
@Component({
  selector: 'page-lista',
  templateUrl: 'lista.html',
})
export class ListaPage {

    produtos: Observable<any>;
    produto: Array<string>;

    constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, database : AngularFireDatabase) {
      this.produtos = database.list("listas/" + "MNAswDGtoNMzL9GYtwXHkdb82VD2").valueChanges();
    }



    ionViewDidLoad() {
      console.log('ionViewDidLoad ListaPage');
    }


    infoProduto( nome: string, peso: string, preco: string, quantidade: string ) {
      this.produto = [ nome, preco, peso, quantidade];
      this.navCtrl.push(InfoProdutoPage);
    }
    getProduto(){
      return this.produto;
    }


}
