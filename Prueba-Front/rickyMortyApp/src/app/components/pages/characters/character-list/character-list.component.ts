import { Component, HostListener, Inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, ParamMap, Router } from '@angular/router';
import { Character } from '@app/shared/interfaces/character.interface';
import { CharacterService } from '@app/shared/servicies/character.service';
import { filter, take } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';

type RequestInfo = {
  next?: string | undefined;
};

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss'],
})
export class CharacterListComponent {
  characters: Character[] = [];
  info: RequestInfo = {
    next: undefined,
  };
  private pageNum = 1;
  private query: string = '';
  private hideScrollHeight = 200;
  private showScrollHeight = 500;
  showGoUp = false;

  constructor(
    @Inject(DOCUMENT) private document:Document,
    private characterSvc: CharacterService, 
    private route: ActivatedRoute,
    private router: Router
    ) {this.onUrlChanged();}

  ngOnInit(): void {
    this.getCharactersByQuery();
  }

  @HostListener('window:scroll', [])
  onWindowScroll():void{
    const yoffSet = window.pageYOffset;
    if ((yoffSet||this.document.body.scrollTop||this.document.documentElement.scrollTop)> this.showScrollHeight) {
      this.showGoUp = true;
    }else if((yoffSet||this.document.body.scrollTop||this.document.documentElement.scrollTop)< this.showScrollHeight){
      this.showGoUp = false;
    }
  }

  onScrollDown():void{
    if (this.info.next) {
      this.pageNum++;
      this.getDataFromService();
    }
  }

  onScrollUp():void{
    this.document.body.scrollTop = 0;
    this.document.documentElement.scrollTop = 0;
  }

  private onUrlChanged():void{
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)).subscribe(
        ()=>{
          this.characters=[];
          this.pageNum = 1;
          this.getCharactersByQuery();
        }
      )
  }

  private getCharactersByQuery(): void {
    this.route.queryParamMap.pipe(take(1)).subscribe((params: ParamMap) => {
      this.query = params.get('q') ?? ''; 
      this.getDataFromService();
    });
  }

  private getDataFromService(): void {
    this.characterSvc
      .searchCharacter(this.query, this.pageNum)
      .pipe(take(1))
      .subscribe((res: any) => {
        if (res?.results?.length) {
        const { info, results } = res;
        this.characters = [...this.characters, ...results];
        this.info = info;
        } else {
          this.characters = [];
        }
        
      });
  }
}
