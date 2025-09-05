import { Injectable, signal, WritableSignal } from '@angular/core';

// Defines the structure of a notification message
export interface Notification {
  message: string;
  type: 'success' | 'error';
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  // A signal to hold the current notification state
  readonly notification: WritableSignal<Notification | null> = signal<Notification | null>(null);

  /**
   * Shows a notification message for a few seconds.
   * @param message The message to display.
   * @param type The type of notification ('success' or 'error').
   */
  show(message: string, type: 'success' | 'error' = 'success'): void {
    this.notification.set({ message, type });

    // Hide the notification after 3 seconds
    setTimeout(() => {
      this.notification.set(null);
    }, 3000);
  }
}
