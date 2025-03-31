import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
  AbstractControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      emailOrPhone: ['', [Validators.required, this.emailOrPhoneValidator]], // Поле email/телефон,
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }
  emailOrPhoneValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^\+?\d{10,15}$/; // Телефон от 10 до 15 цифр (с + или без)

    if (!emailRegex.test(value) && !phoneRegex.test(value)) {
      return { invalidIdentifier: true };
    }
    return null;
  }
  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Форма отправлена', this.loginForm.value);
    } else {
      console.log('Форма содержит ошибки');
    }
  }
}
