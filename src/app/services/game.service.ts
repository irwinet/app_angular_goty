import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Game } from '../interfaces/interfaces';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class GameService {

  private juegos: Game[] = [];

  constructor(private http: HttpClient) { }

  getNominados(){
    if(this.juegos.length>0){
      console.log('Desde cache');
      return of(this.juegos);
    }else{
      console.log('Desde Internet');
      return this.http.get<Game[]>(`${environment.url}/api/goty`)
                      .pipe(
                        tap(resp=>{
                          this.juegos = resp;
                        })
                      );
    }    
  }

  votarJuego(id:string){
    return this.http.post(`${environment.url}/api/goty/${id}`, {})
                    .pipe(
                      catchError(err => {
                        console.log('Error en la peticion');
                        return of(err.error);
                      })
                    )
  }
}
