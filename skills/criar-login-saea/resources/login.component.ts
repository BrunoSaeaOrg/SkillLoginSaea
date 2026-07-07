import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { FeedbackService } from '../core/services/feedback.service';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule
  ]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  obscurePassword = true;
  isLoading = false;
  currentYear = new Date().getFullYear();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private feedbackService: FeedbackService,
    private cdr: ChangeDetectorRef
  ) {
    this.loginForm = this.formBuilder.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  togglePassword(): void {
    this.obscurePassword = !this.obscurePassword;
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const usuario = this.loginForm.get('usuario')?.value;
    const password = this.loginForm.get('password')?.value;

    this.isLoading = true;

    this.authService.login(usuario, password).subscribe({
      next: (response) => {
        this.isLoading = false;
        // Notifica a detecção de mudanças (necessário em apps zoneless) para
        // que o spinner pare imediatamente ao receber a resposta.
        this.cdr.markForCheck();
        this.feedbackService.showSuccess('Login efetuado com sucesso!');
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.isLoading = false;
        this.cdr.markForCheck();
        if (err.status === 401) {
          this.feedbackService.showError('Usuário ou senha inválidos.');
        } else {
          this.feedbackService.showError('Falha de comunicação com o servidor.');
        }
      }
    });
  }
}
