import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Hero } from './hero';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) { }

  getHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroService: fetched heroes')
    return this.http.get<Hero[]>(this.heroesUrl)
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log`fetched hero id=${id}`)
    )
  }

  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }

  private heroesUrl = 'api/heroes';
}
