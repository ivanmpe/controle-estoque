import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';
import { App} from 'ionic-angular';

/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private afAuth: AngularFireAuth, private app: App) {
  }

  public cordova:any;

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
  }



  geraPDF(){
    const before = Date.now();

           document.addEventListener('deviceready', () => {
               console.log('DEVICE READY FIRED AFTER', (Date.now() - before), 'ms');

               //generate the pdf.
               this.cordova.plugins.pdf.htmlToPDF({
                       data: "<html> <h1>  Hello World  </h1> </html>",
                       //url: "www.cloud.org/template.html"
                   },
                   (sucess) => console.log('sucess: ', sucess),
                   (error) => console.log('error:', error));
           });



  }





  logout(){
    this.afAuth.auth.signOut();
    this.app.getRootNav().setRoot(HomePage)
  }

}
