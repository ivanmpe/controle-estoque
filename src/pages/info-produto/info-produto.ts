import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ProdutoService} from '../../providers/produto/produto.service';
/**
 * Generated class for the InfoProdutoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-info-produto',
  templateUrl: 'info-produto.html',
})
export class InfoProdutoPage {


public infoAlimento = {
      nome: "",
      peso: "",
      preco: "",
      quantidade: ""
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public alimento: ProdutoService) {
      this.infoAlimento = this.alimento.getAlimento();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoProdutoPage');
  }

}
