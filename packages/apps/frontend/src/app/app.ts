import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { HeaderComponent } from './components/header/header.component';
import { ToastComponent } from './components/toast/toast.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, ToastComponent, ConfirmationDialogComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('frontend');
}
