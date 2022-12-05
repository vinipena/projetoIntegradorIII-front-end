import { FormBuilder } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/autenticacao/usuario/usuario.service';
import { Animais } from '../animais';

interface CarrinhoDeMercado {
  id: number;
  descricao: string;
  ultimoEmprestimo: Date;
  situacao: boolean;
  situacaoTexto: string;
  ativo: boolean;
  deletado: boolean;
}

const carrinhosDeMercado: CarrinhoDeMercado[] = [
  {
    id: 1,
    descricao: 'Carrinho para compras e pequenos transportes no condominio',
    ultimoEmprestimo: new Date('2022-06-17T03:24:00'),
    situacao: true,
    situacaoTexto: '',
    ativo: true,
    deletado: false,
  },
  {
    id: 2,
    descricao: 'Carrinho para compras e pequenos transportes no condominio',
    ultimoEmprestimo: new Date(),
    situacao: false,
    situacaoTexto: '',
    ativo: true,
    deletado: false,
  },
  {
    id: 3,
    descricao: 'Carrinho para compras e pequenos transportes no condominio',
    ultimoEmprestimo: new Date(),
    situacao: false,
    situacaoTexto: '',
    ativo: false,
    deletado: false,
  },
];

@Component({
  selector: 'app-grade-fotos-animais',
  templateUrl: './grade-fotos-animais.component.html',
  styleUrls: ['./grade-fotos-animais.component.css'],
})
export class GradeFotosAnimaisComponent implements OnInit {
  @Input() animais!: Animais;
  listaCarros = carrinhosDeMercado;
  user$ = this.usuarioService.retornaUsuario();
  switchAtivo = true

  constructor(
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder
  ) {}

  listaAcoes = ['Desativar', 'Deletar', 'Liberar'];

  ngOnInit(): void {
    this.verficaSituacaoEmprestimo();
  }

  formGroup = this.formBuilder.group({
    switchAtivo: true,
  });

  verficaSituacaoEmprestimo() {
    this.listaCarros.forEach((element) => {
      if(element.ativo == false){
        element.situacaoTexto='Carrinho desativado'
      }else if (element.situacao == true) {
        element.situacaoTexto = 'Emprestado';
      } else {
        element.situacaoTexto = 'Livre para Emprestimo';
      }
    });
  }

  switchCarrinho(event: any, carro:CarrinhoDeMercado) {
    console.log(event, carro.ativo);
    carro.ativo !=carro.ativo
  }


  liberarCarrinho(carro:CarrinhoDeMercado){
    let carroSelecionado = this.listaCarros.forEach(element =>{
      if(element.id ==carro.id && element.situacao == true){
        element.situacao = !element.situacao
      }
      this.verficaSituacaoEmprestimo()
    })
  }

}
