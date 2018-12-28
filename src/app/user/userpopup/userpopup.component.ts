import { UserComponent } from './../user.component';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';
import { CarrierUserRequirements } from 'src/UserDetails';
@Component({
  selector: 'app-userpopup',
  templateUrl: './userpopup.component.html',
  styleUrls: ['./userpopup.component.scss']
})
export class UserpopupComponent implements OnInit {
  selectedFile: File;
  documentForm: FormGroup;
  notDisplayed = false;
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
        expiryDate: ['', Validators.required],
        referenceValue1: [],
        referenceValue2: [],
        isMandatory: [false],
        isActive: [false],
        isDeleted: [false],
        carrierUserRequirementDocuments: [[]]
      },
      { validator: checkDate }
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
export function checkDate(control: AbstractControl) {
  const date = new Date();
  const date1 = new Date(control.get('expiryDate').value);
  if (date1.getTime() < date.getTime()) {
    control.get('expiryDate').setErrors({ ErrorsTime: true });
  }
}
