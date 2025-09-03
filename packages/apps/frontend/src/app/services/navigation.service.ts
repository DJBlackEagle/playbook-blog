import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private homeClickedSource = new Subject<void>();

  homeClicked$ = this.homeClickedSource.asObservable();

  navigateToHome(): void {
    this.homeClickedSource.next();
  }
}
