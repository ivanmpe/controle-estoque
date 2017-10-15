import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfoProdutoPage } from './info-produto';

@NgModule({
  declarations: [
    InfoProdutoPage,
  ],
  imports: [
    IonicPageModule.forChild(InfoProdutoPage),
  ],
})
export class InfoProdutoPageModule {}
