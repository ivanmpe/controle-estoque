import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ProdutoService} from '../../providers/produto/produto.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { AlertController } from 'ionic-angular';
import { ListaPage} from '../lista/lista';
import { ToastController } from 'ionic-angular';
import {  NgForm } from '@angular/forms';



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
  mudanca: boolean = false;


  constructor(public alertCtrl: AlertController, public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams, public alimento: ProdutoService, database : AngularFireDatabase, public afAuth: AngularFireAuth) {
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
  this.presentToast('Item removido com sucesso');
  this.navCtrl.push(ListaPage);
}


presentToast( msg: string) {
  let toast = this.toastCtrl.create({
    message: msg,
    duration: 1000
  });
  toast.present();
}




  form_edit(f: NgForm) {
    if (!f.valid) {
      return;
    }
    this.editItem(f.controls.nome.value, f.controls.peso.value, f.controls.preco.value, f.controls.quantidade.value);
  }



editItem(nome: string, peso: string, preco: string, quantidade: string ){
  var itensRef;
//  if(nome!=null){
    itensRef = this.refBD.list("listas/" + this.userid +  "/" +  this.alimento.getAlimentoKey() + "/" + "nome");
    console.log(itensRef);
    itensRef.update(nome);

//  }
//  if(peso!=null){
    itensRef = this.refBD.list("listas/" + this.userid +  "/" +  this.alimento.getAlimentoKey() + "/" + "peso");
    console.log(itensRef);
    itensRef.update(peso);

//  }
//  if(preco!=null){
    itensRef = this.refBD.list("listas/" + this.userid +  "/" +  this.alimento.getAlimentoKey() + "/" + "preco");
    console.log(itensRef);
    itensRef.update(preco);

//  }
//  if(quantidade=null){
    itensRef = this.refBD.list("listas/" + this.userid +  "/" +  this.alimento.getAlimentoKey() + "/" + "quantidade");
    itensRef.update(quantidade);

//  }

//update(keyRefOrSnap: string, value: T)
}















}
