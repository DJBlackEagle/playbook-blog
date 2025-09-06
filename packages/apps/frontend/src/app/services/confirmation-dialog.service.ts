import { Injectable, OnDestroy, signal } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

interface DialogState {
  message: string;
  visible: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ConfirmationDialogService implements OnDestroy {
  readonly state = signal<DialogState>({ message: '', visible: false });
  private readonly choice$ = new Subject<boolean>();
  private readonly destroy$ = new Subject<void>();
  private pendingResolve: ((value: boolean) => void) | null = null;

  /**
   * Lifecycle hook that is called when the service is destroyed.
   * Cleans up any pending promise resolutions, completes internal observables,
   * and releases resources to prevent memory leaks.
   *
   * - Resolves any pending confirmation dialog with `false` if unresolved.
   * - Emits and completes the `destroy$` subject to notify subscribers.
   * - Completes the `choice$` subject to clean up observers.
   */
  ngOnDestroy(): void {
    if (this.pendingResolve) {
      this.pendingResolve(false);
      this.pendingResolve = null;
    }

    this.destroy$.next();
    this.destroy$.complete();
    this.choice$.complete();
  }

  /**
   * Opens the confirmation dialog with a specific message.
   * @param message The confirmation message to display to the user.
   * @returns A promise that resolves with `true` if the user confirms, and `false` otherwise.
   */
  open(message: string): Promise<boolean> {
    if (this.pendingResolve) {
      return Promise.reject(
        new Error(
          'Cannot open confirmation dialog: another dialog is already open. Please close the existing dialog first.',
        ),
      );
    }
    this.state.set({ message, visible: true });
    return new Promise<boolean>((resolve) => {
      this.pendingResolve = (confirmed: boolean) => {
        this.state.set({ message: '', visible: false });
        this.pendingResolve = null;
        this.destroy$.next();
        resolve(confirmed);
      };
      this.choice$.pipe(takeUntil(this.destroy$)).subscribe((confirmed) => {
        if (this.pendingResolve) {
          this.pendingResolve(confirmed);
        }
      });
    });
  }

  /**
   * Called when the user clicks the "Confirm" button.
   */
  confirm(): void {
    this.choice$.next(true);
  }

  /**
   * Called when the user clicks the "Cancel" button.
   */
  cancel(): void {
    this.choice$.next(false);
  }
}
