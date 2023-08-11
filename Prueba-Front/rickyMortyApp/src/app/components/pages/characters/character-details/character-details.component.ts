import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Character } from '@app/shared/interfaces/character.interface';
import { CharacterService } from '@app/shared/servicies/character.service';
import { Observable, take } from 'rxjs';


@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss']
})
export class CharacterDetailsComponent {
  character$!: Observable<Character>
  constructor(private route: ActivatedRoute, private characterSvc: CharacterService, private location: Location) { }


  ngOnInit(): void {

    this.route.params.pipe(take(1)).subscribe((params) => {
      const id = params['id'];
      this.character$ = this.characterSvc.getDetails(id);
    });
  }

  onGoBack(): void {
    this.location.back();
  }
}
