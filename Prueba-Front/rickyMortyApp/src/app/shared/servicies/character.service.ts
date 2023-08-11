import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Character } from '../interfaces/character.interface';
import { environment } from 'src/environments';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private http: HttpClient) { }

  searchCharacter(query: string, page = 1): Observable<Character[]> {
    const filter = `${environment.baseUrlApi}/?name=${query}&page=${page}`;
    return this.http.get<Character[]>(filter);
  }
    
  getDetails(id: number): Observable<Character> {
    const filter = `${environment.baseUrlApi}/${id}`;
    return this.http.get<Character>(filter).pipe(
      map((character) => {
        const { id, name, image, species, gender, created, status, type, origin, location, episode, url } = character;
        return { id, name, image, species, gender, created, status, type, origin, location, episode, url } as Character;
      })
    );
  }
}
