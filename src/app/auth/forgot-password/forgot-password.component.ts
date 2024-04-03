import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/main/http.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  constructor(private http: HttpService) {
  }

  emailHasSent: boolean;

  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  get email() {
    return this.form.get('email');
  }

  onSubmit() {

    const sub = this.http.post('users/forgot-password', { email: this.form.value.email }).subscribe({
      next: () => {
        this.emailHasSent = true;
        sub.unsubscribe();
      },
      error: () => this.emailHasSent = false
    })
  }
}
