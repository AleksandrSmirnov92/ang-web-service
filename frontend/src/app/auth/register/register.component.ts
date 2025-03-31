import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, RouterLinkActive],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group(
      {
        userName: ['', [Validators.required, this.nameValidator]],
        userSurname: ['', [Validators.required, this.surnameValidator]],
        email: ['', [Validators.required, this.emailValidator]], // поле email
        password: ['', [Validators.required, Validators.minLength(4)]],
        repeatPassword: ['', [Validators.required, Validators.minLength(4)]],
      },
      { validators: (control) => this.comparePasswords(control) },
    );
  }
  emailValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(value)) {
      return { invalidIdentifier: true };
    }
    return null;
  }
  nameValidator(control: AbstractControl): ValidationErrors | null {
    let value: string = control.value;

    if (!value) {
      return null; // Пустое значение считаем валидным
    }

    value = value.trim();

    const nameRegex = /^[a-zA-Zа-яА-Я]+$/;
    if (!nameRegex.test(value)) {
      return { invalidName: true };
    }

    const correctedValue = value.charAt(0).toUpperCase() + value.slice(1);

    // Если значение изменилось, обновляем его в форме (так Angular не заметит изменения)
    if (value !== correctedValue) {
      control.setValue(correctedValue, { emitEvent: false });
    }
    return null;
  }
  surnameValidator(control: AbstractControl): ValidationErrors | null {
    let value: string = control.value;

    if (!value) {
      return null; // Пустое значение считаем валидным
    }

    value = value.trim();

    const nameRegex = /^[a-zA-Zа-яА-Я]+$/;
    if (!nameRegex.test(value)) {
      return { invalidName: true };
    }

    const correctedValue = value.charAt(0).toUpperCase() + value.slice(1);

    if (value !== correctedValue) {
      control.setValue(correctedValue, { emitEvent: false });
    }
    return null;
  }

  comparePasswords(control: AbstractControl): ValidationErrors | null {
    const password: string | null = control.get('password')?.value;
    const repeatPassword: string | null = control.get('repeatPassword')?.value;
    if (password !== repeatPassword) {
      return { notEqual: true };
    }
    return null;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Форма отправлена', this.registerForm.value);
    } else {
      console.log('Форма содержит ошибки');
    }
  }
}
