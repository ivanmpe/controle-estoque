import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the ProdutoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProdutoService {

  constructor() {

  }
  private alimento = {
      nome: "",
      peso:"",
      preco: "",
      quantidade: "",

  }

  private alimentoKey: string;

  getAlimentoKey(){
    return this.alimentoKey;
  }
  setAlimentoKey( key: string){
    this.alimentoKey = key;
  }

  getAlimento(){
    return this.alimento;
  }

  setAlimento(nome: string, peso: string, preco: string, quantidade: string ){
      this.alimento.nome = nome;
      this.alimento.peso = peso;
      this.alimento.preco = preco;
      this.alimento.quantidade = quantidade;
    }

}
