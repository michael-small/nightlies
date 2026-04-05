import { Component, signal } from '@angular/core';
import { debounce, email, form, FormField, FormRoot, required } from '@angular/forms/signals';

interface LoginData {
  email: string;
  password: string;
}

@Component({
  selector: 'app-forms-with-signals-doc-page',
  imports: [FormField, FormRoot],
  styleUrls: ['./forms-with-signals-doc-page.css'],
  template: `
    <form [formRoot]="loginForm">
      <div>
        <label>
          Email:
          <input type="email" [formField]="loginForm.email" />
        </label>
        @if (loginForm.email().touched() && loginForm.email().invalid()) {
          <ul class="error-list">
            @for (error of loginForm.email().errors(); track error) {
              <li>{{ error.message }}</li>
            }
          </ul>
        }
      </div>
      <div>
        <label>
          Password:
          <input type="password" [formField]="loginForm.password" />
        </label>
        @if (loginForm.password().touched() && loginForm.password().invalid()) {
          <div class="error-list">
            @for (error of loginForm.password().errors(); track error) {
              <p>{{ error.message }}</p>
            }
          </div>
        }
      </div>
      <button type="submit">Log In</button>
    </form>
  `,
})
export class FormsWithSignalsDocPage {
  loginModel = signal<LoginData>({
    email: '',
    password: '',
  });

  loginForm = form(this.loginModel, (schemaPath) => {
    debounce(schemaPath.email, 500);
    // `message` is optional
    required(schemaPath.email, { message: 'Email is required' });
    email(schemaPath.email, { message: 'Please enter a valid email address' });
  });

  constructor() {
    // Update the value programmatically
    this.loginForm.email().value.set('alice@wonderland.com');
    // The model signal is also updated
    // console.log(this.loginModel().email); // 'alice@wonderland.com'
  }
}
