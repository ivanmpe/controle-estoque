import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import { AngularFireDatabase } from 'angularfire2/database';
import { ToastController } from 'ionic-angular';
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
             public fb: FormBuilder, public toastCtrl: ToastController) {
   this.productForm = fb.group({
     'nome': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
     'peso': ['', [Validators.required, Validators.min(0)]],
     'preco': ['', [Validators.required, Validators.min(0)]],
     'quantidade': ['', [Validators.required, Validators.min(1)]],
   });
 }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroProdutosPage');
  }


  form_submit() {
    console.log(this.productForm.value.nome);
    this.database.list("produtos").push(
      {
        nome: this.productForm.value.nome,
        peso: this.productForm.value.peso,
        preco: this.productForm.value.preco,
        quantidade: this.productForm.value.preco,
      }
    ).then((t: any) => console.log('dados gravados: '+ t.key)),
      (e: any) => console.log(e.message);
    this.productForm.reset();
    this.presentToast();
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Produto cadastrado com sucesso! ',
      duration: 1000
    });
    toast.present();
  }

  /*8showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Produto cadastrado com sucesso!',
      buttons: ['OK']
    });
    alert.present();
  }*/
}
