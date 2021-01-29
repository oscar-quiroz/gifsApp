import { HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Gif, SearchGifsResponse} from '../interfaces/gifs.inteface'

@Injectable({
  providedIn: 'root'
})
export class GifsService {

 private apiKey:string = '2roJaL3s0GsZMJcsqMIcSdSu9IIUUl77';
 private servicioURL:string ='https://api.giphy.com/v1/gifs';
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
    
    localStorage.setItem('historial', JSON.stringify( this._historial ))
  }
  
  const params = new HttpParams()
  .set('api_key', this.apiKey)
  .set('limit', '15')
  .set('q',  query)
  
  
  this.http.get<SearchGifsResponse>(`${this.servicioURL}/search`, {params})
  .subscribe( (res) => {
    this.resultados = res.data;
    localStorage.setItem('resultados', JSON.stringify(this.resultados))
  })
 // fetch('https://api.giphy.com/v1/gifs/search?api_key=2roJaL3s0GsZMJcsqMIcSdSu9IIUUl77&q=dbz&limit=10')
  //.then(res => {
    //res.json().then(data => console.log(data))
  //})
 }
}
