import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormsModule, NgForm } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { ToastController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth, public toastCtrl: ToastController) {
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Usuario criado com sucesso. ',
      duration: 3000
    });
    toast.present();
  }

  senhaCurtaToast(){
    let toast = this.toastCtrl.create({
      message: 'Senha muito curta. ',
      duration: 3000
    });
    toast.present();
  }


  senhasDiferentesToast(){
    let toast = this.toastCtrl.create({
      message: 'As senhas são diferentes. ',
      duration: 3000
    });
    toast.present();
  }
  cadastroSucesso(){
    let toast = this.toastCtrl.create({
      message: 'Cadastro efetuado com sucesso! ',
      duration: 3000
    });
    toast.present();

  }


  form_cadastro (f: NgForm) {
    if (!f.valid) {
      return;
    }
    if(f.controls.password.value.length < 6){
        this.senhaCurtaToast();
    } else {
        if(f.controls.password2.value === f.controls.password.value  ){
            this.cadastroSucesso();
            this.afAuth.auth.createUserWithEmailAndPassword(f.controls.email.value, f.controls.password.value).catch(function(error) {
                this.cadastroSucesso();
            });



        } else{
            this.senhasDiferentesToast();
        }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPage');
  }

}
