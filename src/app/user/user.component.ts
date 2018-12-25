import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  create: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.create = this.fb.group({
      id: ['C93FD91D-A544-4C86-8214-D19F8191EE04'], // fix
      carrierUserDisplayID: [''], // luôn null
      carrierCompanyId: ['7EA98F7D-3181-49CF-96C9-31C4369460E3'], // fix
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.email]],
      password: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      identityCardNumber: ['', [Validators.required]],
      isActive: [''],
      loginType: [], // value: Phone / Email
      loginEmail: [''],
      login: ['', [Validators.required]],
      profileImage: ['', [Validators.required]],
      isDispatcher: ['', [Validators.required]],
      isDriver: ['', [Validators.required]],
      cpassword: ['', [Validators.required]]
    });
  }
  onSubmit() {
    const { valid, value } = this.create;
  }
}
