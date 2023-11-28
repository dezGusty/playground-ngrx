import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription, combineLatest, of, share, shareReplay, switchMap, tap } from 'rxjs';
import { MoreData } from './moreData.model';
import { UserInfo } from './userInfo.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
    this.subscribeToEvents();
  }

  private subscriptions: Subscription[] = [];
  private subscribeToEvents() {
    this.subscriptions.push(
      this.userLogin$.subscribe(([userActionAuth, userBackgroundLogin]) => {
        console.log('*** userLogin: ', userActionAuth, userBackgroundLogin);
      }));
    this.subscriptions.push(this.userData$.subscribe(_ => { }));
    this.subscriptions.push(this.evenMoreUserData$.subscribe(_ => { }));
  }

  private userActionAuthSubject$ = new BehaviorSubject<boolean>(false);
  public readonly userActionAuth$ = this.userActionAuthSubject$.asObservable();

  private userBackgroundLoginSubject$ = new BehaviorSubject<boolean>(false);
  public readonly userBackgroundLogin$ = this.userBackgroundLoginSubject$.asObservable();

  userLogin$ = combineLatest([this.userActionAuth$, this.userBackgroundLogin$])
    .pipe(
      tap(([userActionAuth, userBackgroundLogin]) => { console.log('*** userActionAuth: ', userActionAuth, 'userBackgroundLogin: ', userBackgroundLogin); }),
      shareReplay(1),
    );

  userData$ = this.userLogin$.pipe(
    switchMap(([userActionAuth, userBackgroundLogin]) => {
      // ignore the 2 inputs. Just make a call to the fake API
      return of({ name: 'John Doe', email: 'john.smith@something.con' } as UserInfo);
    }),
    tap(_ => console.log('*** userData: ', _)),
    shareReplay(1),
  );

  evenMoreUserData$ = this.userData$.pipe(
    switchMap(userData => {
      return of({ token: '1234567890' } as MoreData)
    }),
    tap(data => { console.log('*** evenMoreUserData: ', data) }),
    shareReplay(1),
  );

  public fakeUserAuth() {
    this.userActionAuthSubject$.next(true);
  }

  public fakeUserBackgroundLogin() {
    this.userBackgroundLoginSubject$.next(true);
  }
}
