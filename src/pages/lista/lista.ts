import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AlertController } from 'ionic-angular';
import {InfoProdutoPage} from '../info-produto/info-produto';
import { AngularFireAuth } from 'angularfire2/auth';
import {ProdutoService} from '../../providers/produto/produto.service';


@IonicPage()
@Component({
  selector: 'page-lista',
  templateUrl: 'lista.html',
})
export class ListaPage {

    produtos: Observable<any>;
    produto: Array<string>;

    constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, database : AngularFireDatabase, public afAuth: AngularFireAuth, public alimento: ProdutoService) {



      this.afAuth.authState.subscribe(data => {
      //if (data && data.email && data.uid) {
          this.produtos = database.list("listas/" + data.uid).valueChanges();
      //}
    })
    }



    ionViewDidLoad() {
      console.log('ionViewDidLoad ListaPage');
    }


    infoProduto( nome: string, peso: string, preco: string, quantidade: string ) {
      this.alimento.setAlimento(nome, peso, preco, quantidade);
      this.navCtrl.push(InfoProdutoPage);
    }
    getProduto(){
      return this.produto;
    }


}
