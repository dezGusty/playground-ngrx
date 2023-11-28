import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlaService, Player } from './bla.service';
import { BehaviorSubject, combineLatest, map, scan, shareReplay, tap } from 'rxjs';

export enum SortDirection {
  Ascending = 'asc',
  Descending = 'desc',
  None = ''
}

export interface SortColumnConfig {
  name: string;
  sortable: boolean;
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

  private columnDefs = [
    { name: "id", sortable: true },
    { name: "name", sortable: true },
    { name: "extraSearchFields", sortable: true },
    { name: "rating", sortable: true },
    { name: "comments", sortable: true },
  ] as SortColumnConfig[];

  private cachedSortCriteria: SortCriteria = { sortField: '', sortDirection: SortDirection.None };

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

  changeSortCriteriaSubject$ = new BehaviorSubject<SortCriteria>({ sortField: '', sortDirection: SortDirection.None });
  changeSortCriteria$ = this.changeSortCriteriaSubject$.asObservable().pipe(
    tap(item => console.log('*** changeSortCriteria: ', item)),
    // adjust from the previous value (toggle it).
    scan((previous, current) => {
      if (previous.sortField === current.sortField) {
        if (previous.sortDirection === SortDirection.Ascending) {
          return { sortField: current.sortField, sortDirection: SortDirection.Descending };
        } else if (previous.sortDirection === SortDirection.Descending) {
          return { sortField: current.sortField, sortDirection: SortDirection.None };
        } else {
          return { sortField: current.sortField, sortDirection: SortDirection.Ascending };
        }
      } else {
        return { sortField: current.sortField, sortDirection: SortDirection.Ascending };
      }
    }),
    tap(item => this.cachedSortCriteria = item),
    shareReplay(1),

  );

  players$ = combineLatest([
    this.dataService.players$,
    this.changeSortCriteria$
  ]).pipe(
    tap(([players, sortCriteria]) => { console.log('*** players: ', players, 'sortCriteria: ', sortCriteria); }),
    map(([players, sortCriteria]) => {
      return this.sortPlayers(players, sortCriteria);
    }),
    shareReplay(1),
  );

  onHeaderClicked(field: string, event$: any) {
    console.log('*** onHeaderClicked: ', field, event$);
    this.changeSortCriteriaSubject$.next({ sortField: field, sortDirection: SortDirection.Ascending });

    var target = event$.target || event$.srcElement || event$.currentTarget;
    console.log(" target: ", target);
    var attr = target.attributes.getNamedItem("mapfield");
    console.log(" attr: ", attr);
    // var value = idAttr.nodeValue;
    // console.log(" target: ", target, " idAttr: ", idAttr, " value: ", value);
    
  }

  getCSSClassForTableHeader(field: string): string {
    // If not sortable, return empty string
    if (this.columnDefs.find(col => col.name === field)?.sortable === false) {
      return "";
    }

    if (this.cachedSortCriteria.sortField != field) {
      return "sortable both";
    }

    if (this.cachedSortCriteria.sortDirection == SortDirection.Ascending) {
      return "sortable asc";
    }
    if (this.cachedSortCriteria.sortDirection == SortDirection.Descending) {
      return "sortable desc";
    }

    return "sortable both";
  }

  getCSSForTHAsync(field: string, crit: SortCriteria | null): string {
    console.log('*** getCSSClassForTableHeader2: ', field, crit);
    // If not sortable, return empty string
    if (this.columnDefs.find(col => col.name === field)?.sortable === false) {
      return "";
    }

    if (crit && crit.sortField != field) {
      return "sortable both";
    }

    if (crit && crit.sortDirection === SortDirection.Ascending) {
      return "sortable asc";
    }
    if (crit && crit.sortDirection === SortDirection.Descending) {
      return "sortable desc";
    }

    return "sortable both";
  }
}
