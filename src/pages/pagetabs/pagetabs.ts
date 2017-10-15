import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the PagetabsPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pagetabs',
  templateUrl: 'pagetabs.html'
})
export class PagetabsPage {

  listaRoot = 'ListaPage'
  cadastroProdutosRoot = 'CadastroProdutosPage'
  perfilRoot = 'PerfilPage'


  constructor(public navCtrl: NavController) {}

}
