import { Injectable, Component, Inject } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-custom-toast',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="custom-toast" [ngClass]="data.type">
      <div class="toast-icon">
        <mat-icon>{{ data.icon }}</mat-icon>
      </div>
      <div class="toast-content">
        <span class="toast-title">{{ data.title }}</span> - <span class="toast-message">{{ data.message }}</span>
      </div>
      <div class="toast-close" (click)="snackBarRef.dismiss()">
        <mat-icon style="font-size: 18px; width: 18px; height: 18px;">close</mat-icon>
      </div>
    </div>
  `,
  styles: [`
    .custom-toast {
      display: flex;
      align-items: center;
      background: white;
      padding: 12px 16px;
      border-radius: 4px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      border-top: 4px solid #333;
      min-width: 320px;
      color: #333;
      font-family: Roboto, "Helvetica Neue", sans-serif;
    }
    .custom-toast.success { border-top-color: #4caf50; }
    .custom-toast.error { border-top-color: #ef4444; }
    .custom-toast.warning { border-top-color: #f59e0b; }
    .custom-toast.info { border-top-color: #3b82f6; }

    .toast-icon {
      margin-right: 12px;
      display: flex;
    }
    .custom-toast.success .toast-icon { color: #4caf50; }
    .custom-toast.error .toast-icon { color: #ef4444; }
    .custom-toast.warning .toast-icon { color: #f59e0b; }
    .custom-toast.info .toast-icon { color: #3b82f6; }

    .toast-content {
      flex: 1;
      font-size: 14px;
    }
    .toast-title {
      font-weight: 700;
      color: #1e293b;
    }
    .toast-message {
      color: #475569;
    }

    .toast-close {
      margin-left: 12px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #f59e0b;
      opacity: 0.7;
    }
    .custom-toast.success .toast-close { color: #4caf50; }
    .custom-toast.error .toast-close { color: #ef4444; }
    .custom-toast.warning .toast-close { color: #f59e0b; }
    .custom-toast.info .toast-close { color: #3b82f6; }

    .toast-close:hover { opacity: 1; }

    :host-context(body.dark-theme) .custom-toast {
      background: #1e1e1e;
      border-top: 4px solid #333;
    }
    :host-context(body.dark-theme) .toast-title { color: #f8fafc; }
    :host-context(body.dark-theme) .toast-message { color: #cbd5e1; }

    :host-context(body.dark-theme) .custom-toast.success { border-top-color: #22c55e; }
    :host-context(body.dark-theme) .custom-toast.error { border-top-color: #ef4444; }
    :host-context(body.dark-theme) .custom-toast.warning { border-top-color: #f59e0b; }
    :host-context(body.dark-theme) .custom-toast.info { border-top-color: #3b82f6; }
  `]
})
export class CustomToastComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: { title: string; message: string; type: string; icon: string },
    public snackBarRef: MatSnackBarRef<CustomToastComponent>
  ) {}
}

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private defaultConfig: MatSnackBarConfig = {
    horizontalPosition: 'right',
    verticalPosition: 'top',
    duration: 4000,
    panelClass: 'headless-snackbar'
  };

  constructor(private snackBar: MatSnackBar) {}

  showError(message: string, duration?: number) {
    this.snackBar.openFromComponent(CustomToastComponent, {
      ...this.defaultConfig,
      duration: duration || this.defaultConfig.duration,
      data: { title: 'Erro', message, type: 'error', icon: 'error_outline' }
    });
  }

  showSuccess(message: string, duration?: number) {
    this.snackBar.openFromComponent(CustomToastComponent, {
      ...this.defaultConfig,
      duration: duration || this.defaultConfig.duration,
      data: { title: 'Sucesso', message, type: 'success', icon: 'check_circle_outline' }
    });
  }

  showWarning(message: string, duration?: number) {
    this.snackBar.openFromComponent(CustomToastComponent, {
      ...this.defaultConfig,
      duration: duration || this.defaultConfig.duration,
      data: { title: 'Aviso', message, type: 'warning', icon: 'warning_amber' }
    });
  }

  showInfo(message: string, duration?: number) {
    this.snackBar.openFromComponent(CustomToastComponent, {
      ...this.defaultConfig,
      duration: duration || this.defaultConfig.duration,
      data: { title: 'Info', message, type: 'info', icon: 'info_outline' }
    });
  }
}
