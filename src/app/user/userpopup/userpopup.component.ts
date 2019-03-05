import { UserComponent } from './../user.component';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';
import { CarrierUserRequirements } from 'src/UserDetails';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE
} from '@angular/material/core';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports

const moment = _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD MMM YYYY'
  },
  display: {
    dateInput: 'DD MMM YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};
@Component({
  selector: 'app-userpopup',
  templateUrl: './userpopup.component.html',
  styleUrls: ['./userpopup.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class UserpopupComponent implements OnInit {
  selectedFile: File;
  documentForm: FormGroup;
  notDisplayed = true;
  noneCheck = false;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CarrierUserRequirements
  ) {}
  ngOnInit(): void {
    this.documentForm = this.fb.group(
      {
        id: [],
        carrierUserId: [],
        requirementTitle: ['', Validators.required],
        expiryDate: [moment(), Validators.required],
        referenceValue1: [],
        referenceValue2: [],
        isMandatory: [false],
        isActive: [false],
        isDeleted: [false],
        isCheck: [true, ],
        carrierUserRequirementDocuments: [[]]
      },
      { validator: [checkDate] }
    );
    if (this.data != null) {
      this.documentForm.patchValue(this.data);
    }
  }
  onFileChanged(even) {
    this.notDisplayed = true;
    this.documentForm.value.carrierUserRequirementDocuments = [
      {
        id: null,
        carrierUserRequirementId: null,
        documentName: 'documentName 1',
        documentLink: 'documentLink 1',
        isDeleted: true
      },
      {
        id: null,
        carrierUserRequirementId: null,
        documentName: 'documentName 1',
        documentLink: 'documentLink 1',
        isDeleted: false
      }
    ];
    // even.target.files[0].name
  }
  onClose() {
    this.dialogRef.close();
  }
  deleteFile() {
    console.log('Minh vuong dep trai');
  }
  onChang(event: boolean) {
    this.noneCheck = !this.noneCheck;
    const date = new Date();
    const date1 = new Date(this.documentForm.get('expiryDate').value);
    if (date1.getTime() < date.getTime()) {
      // qua han
      this.documentForm.get('expiryDate').setValue('');
    } else {
      console.log(false);
    }
  }

  onSubmit() {
    const { valid, value } = this.documentForm;
    if (valid) {
      this.dialogRef.close(value);
    } else {
      console.error('invalid');
    }
  }

}
export function  tickDate(control: AbstractControl) {
  const check = control.get('isCheck');
  console.log(check);
  // if () {
  //   this.noneCheck = false;
  // } else {this.noneCheck = true; }
  return null;
}
export function checkDate(control: AbstractControl) {
  const date = new Date();
  const date1 = new Date(control.get('expiryDate').value);
  if (date1.getTime() < date.getTime()) {
    control.get('expiryDate').setErrors({ ErrorsTime: true });
  }
}
