import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase} from 'angularfire2/database';
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
    userid: string;
    refBD: AngularFireDatabase;
    //refItem: AngularFireObject<any>;


    constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, database : AngularFireDatabase, public afAuth: AngularFireAuth, public alimento: ProdutoService) {
        this.refBD = database;
        this.afAuth.authState.subscribe( user => {
              this.userid = user.uid;
              this.produtos = database.list("listas/" + user.uid).valueChanges();
        })
    }




    ionViewDidLoad() {
      console.log('ionViewDidLoad ListaPage');
    }


    doRefresh(refresher) {
       console.log('Begin async operation', refresher);

       setTimeout(() => {
         console.log('Async operation has ended');
         refresher.complete();
       }, 2000);
     }

    infoProduto( nome: string, peso: string, preco: string, quantidade: string) {
      var refItem = this.refBD.list("listas/" + this.userid);
      refItem.snapshotChanges([])
        .subscribe( filhos => {
          filhos.forEach( filho => {
            if(filho.payload.val().nome === nome){
              this.alimento.setAlimentoKey(filho.key);
              console.log(filho.key);
            }
          });
        });
      //console.log(chave);
      //this.alimento.setAlimentoKey(chave);
      this.alimento.setAlimento(nome, peso, preco, quantidade);
      this.navCtrl.push(InfoProdutoPage);
    }

    deleteAll(){
      //var refBD = this.database.list("listas/" + this.userid);
      var itensRef = this.refBD.list("listas/" + this.userid);
      itensRef.remove();
    }


    showConfirm() {
        let confirm = this.alertCtrl.create({
          title: 'Deletar tudo?',
            message: 'Você deseja deletar todos os produtos da lista? ',
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
                    this.deleteAll();
                    console.log('Agree clicked');
                  }
                }
              ]
            });
            confirm.present();
      }





}
