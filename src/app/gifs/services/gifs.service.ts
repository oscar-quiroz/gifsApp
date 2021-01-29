import { HttpClient } from '@angular/common/http';
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

}

 buscarGifs( query:string ){
   
  query = query.trim().toLocaleLowerCase();
   
   if( !this._historial.includes( query )){ // includes -> si ya existe o incluye el nuevo elemento entrante
    this._historial.unshift( query );
    this._historial = this._historial.splice(0,10) // devolver unicamente los ultimos 10 agregados
  }
  

  this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=2roJaL3s0GsZMJcsqMIcSdSu9IIUUl77&q=${ query }&limit=10`)
  .subscribe( (res) => {
    console.log(res.data);
    this.resultados = res.data;
  })
 // fetch('https://api.giphy.com/v1/gifs/search?api_key=2roJaL3s0GsZMJcsqMIcSdSu9IIUUl77&q=dbz&limit=10')
  //.then(res => {
    //res.json().then(data => console.log(data))
  //})
 }
}
