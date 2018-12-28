import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';
import { MatDialog } from '@angular/material';
import { UserpopupComponent } from './userpopup/userpopup.component';
import { CarrierUserRequirements } from 'src/UserDetails';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  displayedColumns: string[] = [
    'requirementTitle',
    'carrierUserRequirementDocuments',
    'expiryDate',
    'isMandatory',
    'isActive',
    'action'
  ];
  phoneorNumber = 'Login';
  listDocument: CarrierUserRequirements[] = [];
  dataSource = new MatTableDataSource<CarrierUserRequirements>();

  patnumber = /[0-9\+\-\ ]/;
  animal = false;
  name = '';
  create: FormGroup;
  constructor(private fb: FormBuilder, public dialog: MatDialog) {}
  @ViewChild(MatPaginator) paginator: MatPaginator;
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
        phoneNumber: [
          '',
          [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]
        ],
        identityCardNumber: [null],
        isActive: [false],
        loginType: ['', Validators.required], // value: Phone / Email
        loginEmail: [''],
        login: ['', [Validators.required]],
        profileImage: ['', []],
        isDispatcher: [false, []],
        isDriver: [false, []],
        cpassword: ['', [Validators.required]],
        carrierUserRequirements: [[]]
      },
      { validator: [checklappass, checkisDriver, checkLogintype] }
    );
    this.dataSource.paginator = this.paginator;
  }
  onChange(even) {
    console.log(event);
    if (even === 'Phone') {
      this.phoneorNumber = 'Phone Number';
    } else {
      this.phoneorNumber = 'Email';
    }
    this.animal = true;
  }
  openDialog() {
    const dialogRef = this.dialog.open(UserpopupComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.listDocument.push(result);
        this.dataSource.data = this.listDocument;
      }
    });
  }
  onDelete(index: number) {
    this.listDocument.splice(index, 1);
    this.dataSource.data = this.listDocument;
  }
  onUpdate(iddocument: CarrierUserRequirements, index: number): void {
    const dialogRef = this.dialog.open(UserpopupComponent, {
      data: iddocument
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.listDocument.splice(index, 0, result);
        this.listDocument.splice(index + 1, 1);
        this.dataSource.data = this.listDocument;
      }
    });
  }
  onSubmit() {
    const { valid, value } = this.create;
    if (valid) {
      console.log(value);
    } else {
      console.log(valid);
    }
  }
}
export function checklappass(control: AbstractControl) {
  const password: string = control.get('password').value; // get password from our password form control
  const confirmPassword: string = control.get('cpassword').value; // get password from our confirmPassword form control
  // compare is the password math
  if (password !== confirmPassword) {
    // if they don't match, set an error in our confirmPassword form control
    control.get('cpassword').setErrors({ NoPassswordMatch: true });
  }
}
// khi cline chọn Driver thì id number không trống
export function checkisDriver(control: AbstractControl) {
  const driver: boolean = control.get('isDriver').value; // get isDriver từ control
  const idNumber: string = control.get('carrierUserDisplayID').value;
  if (driver && idNumber == null) {
    control.get('carrierUserDisplayID').setErrors({ idNumberforDriver: true });
  }
}
// check login type
export function checkLogintype(control: AbstractControl) {
  const loginType = control.get('loginType').value;
  const email = control.get('email').value;
  const phone = control.get('phoneNumber').value;
  const login = control.get('login').value;
  if (loginType === 'Email') {
    if (login !== email) {
      control.get('login').setErrors({ ErrorsLogin: true });
    }
  } else {
    if (login !== phone) {
      control.get('login').setErrors({ ErrorsLogin: true });
    }
  }
}
