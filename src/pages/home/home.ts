import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import {  NgForm } from '@angular/forms';
import { CadastroPage} from '../cadastro/cadastro';
import { ToastController } from 'ionic-angular';
import { PagetabsPage} from '../pagetabs/pagetabs';
//import { ProdutoService} from '../../providers/produto/produto.service';




@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private afAuth: AngularFireAuth, public toastCtrl: ToastController) {

  }




  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Verifique senha e email. ',
      duration: 3000
    });
    toast.present();
  }

  paginaCadastro(){
    this.navCtrl.push(CadastroPage);
  }

  form_login (f: NgForm) {
    if (!f.valid) {
      return;
    }

    this.afAuth.auth.signInWithEmailAndPassword(f.controls.email.value, f.controls.password.value).then(ok => {
        //  userID = this.afAuth.auth.currentUser.uid;
        //  console.log(userID)
          this.navCtrl.push(PagetabsPage);
    }).catch((error)=>{
        this.presentToast();
    });
  }

}
