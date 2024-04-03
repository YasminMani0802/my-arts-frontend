import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/main/http.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  constructor(private http: HttpService, private activatedRoute: ActivatedRoute, private router: Router) { }
  params: any;
  allowedToReset: boolean;
  resetReqSucceeded: boolean | null;



  ngOnInit() {

    this.activatedRoute.params.subscribe((queryParams) => {
      this.params = queryParams;
    })

    const sub = this.http.get<{ authenticated: boolean }>(`users/get-reset-password/${this.params.id}/${this.params.token}`).subscribe({
      next: ({ authenticated }) => {
        this.allowedToReset = authenticated;

        sub.unsubscribe();

      },
      error: ({ authenticated }) => this.allowedToReset = authenticated

    })
  }

  form: FormGroup = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.pattern(
      '^(?=(.*?[0-9]){4})(?=.*?[A-Z])(?=.*?[a-z])(?=.*[!@#$%^&*-_*]).{8,}$'
    )]),
    confirmPassword: new FormControl('', [Validators.required, Validators.pattern(
      '^(?=(.*?[0-9]){4})(?=.*?[A-Z])(?=.*?[a-z])(?=.*[!@#$%^&*-_*]).{8,}$'
    )])
  },
    [CustomValidators.MatchValidator('password', 'confirmPassword')]);

  get password() {
    return this.form.get('password');
  }

  get confirmPassword() {
    return this.form.get('confirmPassword');
  }

  get passwordMatchError() {
    return (
      this.form.getError('mismatch') &&
      this.form.get('confirmPassword')?.touched
    );
  }
  onSubmit() {

    const sub = this.http.put<{ authenticated: boolean }>(`users/reset-password/${this.params.id}/${this.params.token}`, this.form.value).subscribe({
      next: () => {

        this.router.navigate(['/login']);

        sub.unsubscribe();
      },
      error: () => this.resetReqSucceeded = false
    })
  }
}





export class CustomValidators {
  static MatchValidator(source: string, target: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const sourceCtrl = control.get(source);
      const targetCtrl = control.get(target);

      return sourceCtrl && targetCtrl && sourceCtrl.value !== targetCtrl.value
        ? { mismatch: true }
        : null;
    };
  }


}

