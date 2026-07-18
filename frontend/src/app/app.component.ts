import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  template: `
    <app-navbar></app-navbar>
    <main class="contenido">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`.contenido { background: #f3f4f6; min-height: calc(100vh - 60px); }`]
})
export class AppComponent {}
