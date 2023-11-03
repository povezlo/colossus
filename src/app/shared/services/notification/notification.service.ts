import { Injectable, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

const TOASTR_CONFIG = {
  positionClass: 'toast-top-right',
  closeButton: true,
  timeOut: 3000,
  messageClass: 'toast-message',
};

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private toastr = inject(ToastrService);

  showSuccess(message: string): void {
    this.toastr.success(message, 'Done!', TOASTR_CONFIG);
  }

  showError(message: string): void {
    this.toastr.error(message, 'What`s wrong!', TOASTR_CONFIG);
  }
}
