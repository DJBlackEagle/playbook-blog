import { Injectable, signal, WritableSignal } from '@angular/core';
import { NOTIFICATION_DURATION } from '../constants/notification.constants';

export interface Notification {
  message: string;
  type: 'success' | 'error';
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  readonly notification: WritableSignal<Notification | null> = signal<Notification | null>(null);
  private timeoutId: ReturnType<typeof setTimeout> | null = null;

  /**
   * Shows a notification message for a few seconds.
   * @param message The message to display.
   * @param type The type of notification ('success' or 'error').
   */
  show(message: string, type: 'success' | 'error' = 'success'): void {
    this.notification.set({ message, type });

    // Clear any existing timeout to prevent premature hiding
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    // Hide the notification after the specified duration
    this.timeoutId = setTimeout(() => {
      this.notification.set(null);
      this.timeoutId = null;
    }, NOTIFICATION_DURATION);
  }
}
