import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {  NgForm } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { ToastController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
  providers: [AngularFireAuth]

})
export class CadastroPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,  public toastCtrl: ToastController, private database: AngularFireDatabase, private afAuth: AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPage');
  }

  presentToast( msg:string ) {
       let toast = this.toastCtrl.create({
         message: msg ,
         duration: 1000
       });
       toast.present();
    }



  form_cadastro(f: NgForm) {
      if (!f.valid) {
        return;
      }

      this.afAuth.auth.createUserWithEmailAndPassword(f.controls.email.value, f.controls.password.value ).then(ok=> {
        //var userId =  this.afAuth.auth.currentUser.uid;

          this.database.list("listas/").set( this.afAuth.auth.currentUser.uid, {
            teste: { nome: "Nome Produto", preco:"0.0", peso: "0kg", quantidade: "0" }} );
            this.presentToast('Usuário cadastrado com sucesso!');
            this.navCtrl.popToRoot();

      }).catch((e)=>{

        this.presentToast(e);

      });

    }
}
