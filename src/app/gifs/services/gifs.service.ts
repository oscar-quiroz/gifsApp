import { HttpClient, JsonpClientBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Gif, SearchGifsResponse} from '../interfaces/gifs.inteface'

@Injectable({
  providedIn: 'root'
})
export class GifsService {

 private apiKey:string = '2roJaL3s0GsZMJcsqMIcSdSu9IIUUl77';
 private _historial: string[] = [];
 
 
 public resultados:Gif[] = [];
 
 get historial() {
   //this._historial = this._historial.splice(0,10) // devolver unicamente los ultimos 10 agregados
   return [...this._historial]
 }

constructor( private http: HttpClient){
  this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
  this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
}

 buscarGifs( query:string ){
   
  query = query.trim().toLocaleLowerCase();
   
   if( !this._historial.includes( query )){ // includes -> si ya existe o incluye el nuevo elemento entrante
    this._historial.unshift( query );
    this._historial = this._historial.splice(0,10) // devolver unicamente los ultimos 10 agregados
    
    localStorage.setItem('historial', JSON.stringify( this._historial))
  }
  

  this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=2roJaL3s0GsZMJcsqMIcSdSu9IIUUl77&q=${ query }&limit=10`)
  .subscribe( (res) => {
    console.log(res.data);
    this.resultados = res.data;
    localStorage.setItem('resultados', JSON.stringify(this.resultados))
  })
 // fetch('https://api.giphy.com/v1/gifs/search?api_key=2roJaL3s0GsZMJcsqMIcSdSu9IIUUl77&q=dbz&limit=10')
  //.then(res => {
    //res.json().then(data => console.log(data))
  //})
 }
}
