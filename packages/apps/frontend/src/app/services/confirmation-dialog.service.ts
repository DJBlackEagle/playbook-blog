import { Injectable, OnDestroy, signal } from '@angular/core';

interface DialogState {
  message: string;
  visible: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ConfirmationDialogService implements OnDestroy {
  readonly state = signal<DialogState>({ message: '', visible: false });
  private pendingResolve: ((value: boolean) => void) | null = null;

  /**
   * Lifecycle hook that is called when the service is destroyed.
   * If there is a pending promise resolution (e.g., from a confirmation dialog),
   * it resolves the promise with `false` to indicate cancellation and cleans up the reference.
   */
  ngOnDestroy(): void {
    if (this.pendingResolve) {
      this.pendingResolve(false);
      this.pendingResolve = null;
    }
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
        resolve(confirmed);
      };
    });
  }

  /**
   * Called when the user clicks the "Confirm" button.
   */
  confirm(): void {
    this.pendingResolve?.(true);
  }

  /**
   * Called when the user clicks the "Cancel" button.
   */
  cancel(): void {
    this.pendingResolve?.(false);
  }
}
