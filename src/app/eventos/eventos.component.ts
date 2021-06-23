import { HttpClient } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  eventos: any = [];
  eventosFiltrados: any = [];
  _filtroLista : string = "";
  get filtroLista(): string {
    return this._filtroLista;
  }
  set filtroLista(value :string){
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
  }

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getEventos();
  }

  filtrarEventos(filtrarPor: string): any {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter((evento: { tema: string; }) =>
      evento.tema.toLocaleLowerCase().indexOf(filtrarPor) != -1
    );
  }

  getEventos() {
    this.http.get('https://localhost:5001/api/evento').subscribe(response => {
      this.eventos = response;
      this.eventosFiltrados = this.eventos;
    }, error => {
      console.log(error);
    });
  }

}
