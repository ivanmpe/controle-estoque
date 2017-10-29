import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ProdutoService} from '../../providers/produto/produto.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { ListaPage} from '../lista/lista';



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
      quantidade: "",
  }


  refBD: AngularFireDatabase;
  userid: string;

  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public alimento: ProdutoService, database : AngularFireDatabase, public afAuth: AngularFireAuth) {
      this.infoAlimento = this.alimento.getAlimento();
      this.refBD = database;
      this.afAuth.authState.subscribe( user => {
            this.userid = user.uid;
      })
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoProdutoPage');
  }

  showConfirmDeleteItem() {
      let confirm = this.alertCtrl.create({
        title: 'Deletar Item',
        message: 'Você deseja deletar esse produto da sua lista? ',
        buttons: [
          {
            text: 'Discordo',
            handler: () => {
              console.log('Disagree clicked');
            }
          },
          {
            text: 'Concordo',
            handler: () => {
              this.deleteItem();
              console.log('Agree clicked');
            }
          }
        ]
      });
      confirm.present();
    }



deleteItem(){
  var itensRef = this.refBD.list("listas/" + this.userid +  "/" +  this.alimento.getAlimentoKey());
  itensRef.remove();
  this.navCtrl.push(ListaPage);
}



















}
