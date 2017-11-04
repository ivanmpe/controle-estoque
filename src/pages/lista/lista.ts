import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AlertController } from 'ionic-angular';
import {InfoProdutoPage} from '../info-produto/info-produto';
import { AngularFireAuth } from 'angularfire2/auth';
import {ProdutoService} from '../../providers/produto/produto.service';
import { ToastController } from 'ionic-angular';


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


    constructor(public alertCtrl: AlertController, public navCtrl: NavController,
       public navParams: NavParams, database : AngularFireDatabase, public afAuth: AngularFireAuth,
       public alimento: ProdutoService, public toastCtrl: ToastController) {
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
       }, 1000);
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

    deleteItem(nome: string){
      var refItem = this.refBD.list("listas/" + this.userid);
      refItem.snapshotChanges([])
        .subscribe( filhos => {
          filhos.forEach( filho => {
            if(filho.payload.val().nome === nome){
              var itensRef = this.refBD.list("listas/" + this.userid +  "/" +  filho.key);
              itensRef.remove();
            //this.presentToast('Item successfully removed!')
              console.log(filho.key);
            }
          });
        });
      //console.log(chave);
      //this.alimento.setAlimentoKey(chave);
      //this.alimento.setAlimento(nome, peso, preco, quantidade);


      //this.presentToast('Item removido com sucesso');

    }

    presentToast( msg: string) {
      let toast = this.toastCtrl.create({
        message: msg,
        duration: 3000
      });
      toast.present();
    }

    showConfirm() {
        let confirm = this.alertCtrl.create({
          title: 'Delete All',
            message: 'Do you want to delete all products from the list? ',
              buttons: [
                {
                  text: 'Disagree',
                  handler: () => {
                    console.log('Disagree clicked');
                  }
                },
                {
                  text: 'Agree',
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
