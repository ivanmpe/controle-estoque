import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';
import { App} from 'ionic-angular';
import { MudarSenhaPage } from '../mudar-senha/mudar-senha';
import { AboutPage } from '../about/about';
//import * as pdfmake from 'pdfmake';
//import * as pdfmake from 'pdfmake';
import * as pdfmake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';






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

  mudarSenha(){
    this.navCtrl.push(MudarSenhaPage);
  }
  about(){
      this.navCtrl.push(AboutPage);
  }


  geraPDF(){
    var dd = { content: 'This is an sample PDF printed with pdfMake' };
    pdfmake.createPdf(dd).download();
  }





  logout(){
    this.afAuth.auth.signOut();
    this.app.getRootNav().setRoot(HomePage)
  }

}
