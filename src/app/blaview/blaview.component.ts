import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlaService, Player } from './bla.service';
import { BehaviorSubject, combineLatest, map, shareReplay, tap } from 'rxjs';

export enum SortDirection {
  Ascending = 'asc',
  Descending = 'desc',
  None = ''
}

export interface SortCriteria {
  sortField: string;
  sortDirection: SortDirection;
}

@Component({
  selector: 'app-blaview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blaview.component.html',
  styleUrl: './blaview.component.css'
})
export class BlaviewComponent {
  sortPlayers(players: Player[], sortCriteria: SortCriteria): any {
    if (sortCriteria.sortDirection === SortDirection.None) {
      return players;
    }
    return players.sort((leftPlayer, rightPlayer) => {
      if (sortCriteria.sortDirection === SortDirection.Ascending) {
        return leftPlayer[sortCriteria.sortField as keyof Player] > rightPlayer[sortCriteria.sortField as keyof Player] ? 1 : -1;
      } else {
        return leftPlayer[sortCriteria.sortField as keyof Player] < rightPlayer[sortCriteria.sortField as keyof Player] ? 1 : -1;
      }
    });
  }

  constructor(private dataService: BlaService) { }

  sortCriteriaSubject$ = new BehaviorSubject<SortCriteria>({ sortField: '', sortDirection: SortDirection.None });
  sortCriteria$ = this.sortCriteriaSubject$.asObservable();

  players$ = combineLatest([
    this.dataService.players$,
    this.sortCriteria$
  ]).pipe(
    tap(([players, sortCriteria]) => { console.log('*** players: ', players, 'sortCriteria: ', sortCriteria);}),
    map(([players, sortCriteria]) => {
      return this.sortPlayers(players, sortCriteria);
    }),
    shareReplay(1),
  );

  onHeaderClicked(field: string) {
    console.log('*** onHeaderClicked: ', field);
    
    this.sortCriteriaSubject$.next({ sortField: field, sortDirection: SortDirection.Ascending });
  }
}
