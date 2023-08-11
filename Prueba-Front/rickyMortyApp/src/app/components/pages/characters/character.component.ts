import { Component, Input, ChangeDetectionStrategy } from "@angular/core";
import { Character } from "@app/shared/interfaces/character.interface";



@Component({
    selector : 'app-character',
    template : `<div class="card">
    <div class="image">
        <a [routerLink]="['/character-details', character.id]">
            <img 
            [src]="character.image" 
            [alt]="character.name"
            class="card-img-top"
            />
        </a>
    </div>
    <div class="card inner">
        <div class="header">
            <a [routerLink]="['/character-details', character.id]">
                <h2>{{character.name | slice: 0:20}}</h2>
            </a>
              <small class="text-muted">{{character.gender}}</small><br>
              <small class="text-muted">{{character.status}}</small><br>
              <small class="text-muted">{{character.species}}</small><br>
              <small class="text-muted">{{character.created | date}}</small>   
        </div>
    </div>
</div>`,
changeDetection : ChangeDetectionStrategy.OnPush
})

export class CharacterComponent {
    @Input()
    character!: Character;
}