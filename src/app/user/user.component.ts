import { Component, OnInit, Inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

export function checklappass(control: AbstractControl) {
  const password: string = control.get('password').value; // get password from our password form control
  const confirmPassword: string = control.get('cpassword').value; // get password from our confirmPassword form control
  // compare is the password math
  if (password !== confirmPassword) {
    // if they don't match, set an error in our confirmPassword form control
    control.get('cpassword').setErrors({ NoPassswordMatch: true });
  }
}
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  patnumber = /[0-9\+\-\ ]/;
  animal = false;
  name = '';
  create: FormGroup;
  constructor(private fb: FormBuilder, public dialog: MatDialog) {}

  ngOnInit() {
    this.create = this.fb.group(
      {
        id: ['C93FD91D-A544-4C86-8214-D19F8191EE04'], // fix
        carrierUserDisplayID: [null], // luôn null
        carrierCompanyId: ['7EA98F7D-3181-49CF-96C9-31C4369460E3'], // fix
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.email]],
        password: ['', [Validators.required]],
        phoneNumber: ['', [Validators.required, Validators.pattern('[0-9]+')]],
        identityCardNumber: [null],
        isActive: [''],
        loginType: [], // value: Phone / Email
        loginEmail: [''],
        login: ['login', [Validators.required]],
        profileImage: ['', [Validators.required]],
        isDispatcher: ['', [Validators.required]],
        isDriver: ['', [Validators.required]],
        cpassword: ['', [Validators.required]]
      },
      { validator: checklappass }
    );
  }
  onChange(even) {
    console.log(even.value);
    this.animal = true;
  }
  onChangePassword(pass: string) {
    this.name = pass;
    console.log(pass);
  }
  onSubmit() {
    const { valid, value } = this.create;
  }
}
