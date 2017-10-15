import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroProdutosPage } from './cadastro-produtos';

@NgModule({
  declarations: [
    CadastroProdutosPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastroProdutosPage),
  ],
})
export class CadastroProdutosPageModule {}
