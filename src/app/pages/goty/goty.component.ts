import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/interfaces/interfaces';
import { GameService } from '../../services/game.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-goty',
  templateUrl: './goty.component.html',
  styleUrls: ['./goty.component.css']
})
export class GotyComponent implements OnInit {

  juegos: Game[] = [];

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.gameService.getNominados()
                    .subscribe(resp=>{
                      console.log(resp);
                      this.juegos = resp;
                    });
  }

  votarJuego(juego: Game){
    console.log(juego);
    this.gameService.votarJuego(juego.id)
                    .subscribe((resp:{ok: boolean, mensaje:string})=>{
                      console.log(resp);
                      if(resp.ok){
                        Swal.fire({
                          title: 'Gracias',
                          text: resp.mensaje,
                          icon: 'success'
                        })
                      }
                    });
  }

}
