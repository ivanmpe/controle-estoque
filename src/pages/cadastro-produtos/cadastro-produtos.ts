import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import { AngularFireDatabase } from 'angularfire2/database';
import { ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the CadastroProdutosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro-produtos',
  templateUrl: 'cadastro-produtos.html',
})
export class CadastroProdutosPage {

  private productForm: FormGroup;

 constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase,
             public fb: FormBuilder, public toastCtrl: ToastController, public afAuth: AngularFireAuth
             ) {

   this.productForm = fb.group({
     'nome': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
     'peso': ['', [Validators.required, Validators.min(0.1)]],
     'preco': ['', [Validators.required, Validators.min(0.1)]],
     'quantidade': ['', [Validators.required, Validators.min(0.1)]],
   });
 }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroProdutosPage');
  }


  form_submit() {

    console.log(this.productForm.value.nome);
    this.afAuth.authState.subscribe(data => {
    //if (data && data.email && data.uid) {
      //  this.produtos = database.list("listas/" + data.uid).valueChanges();
    //}
      this.database.list("listas/" + data.uid).push({
          nome: this.productForm.value.nome,
          peso: this.productForm.value.peso,
          preco: this.productForm.value.preco,
          quantidade: this.productForm.value.quantidade,
          }).then((t: any) => console.log('dados gravados: '+ t.key)), (e: any) => console.log(e.message);
          this.productForm.reset();
          this.toast();
      })

  }

  toast() {
    let toast = this.toastCtrl.create({
      message: 'Product succesfully registered. ',
      duration: 1000
    });
    toast.present();
  }


}
