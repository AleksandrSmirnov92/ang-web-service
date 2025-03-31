import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'header',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  btnActiveLogin: boolean = false;
  btnActiveRegister: boolean = false;
  onClickBack() {
    console.log('Клик по кнопке Назад');
  }
  onClickLogin() {
    console.log('Клик по кнопке Login');
    this.btnActiveLogin = true;
    this.btnActiveRegister = false;
  }
  onClickRegister() {
    console.log('Клик по кнопке Register');
    this.btnActiveLogin = false;
    this.btnActiveRegister = true;
  }
}
