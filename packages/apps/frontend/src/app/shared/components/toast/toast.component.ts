import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-toast',
  imports: [],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponent {
  readonly notificationService = inject(NotificationService);
}
