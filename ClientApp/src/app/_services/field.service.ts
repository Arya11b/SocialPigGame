import {Injectable} from '@angular/core';
import {FieldBase} from '../form/models/FieldBase';
import {FieldTextBox} from '../form/models/FieldTextBox';
import {Validators} from '@angular/forms';
@Injectable()
export class FieldService {
  constructor() {
  }

  public fields: FieldBase<any>[] = [
    new FieldTextBox({
      key: 'userName',
      label: 'User Name',
      value: '',
      placeHolder: 'Enter a Username',
      icon: 'form-3',
      order: 3,
      validators: [
        Validators.required,
        Validators.pattern('[A-Za-z0-9]*')
      ]
    }),
    new FieldTextBox({
      key: 'password',
      label: 'Password',
      value: '',
      type:'password',
      placeHolder: 'Choose a password',
      icon: 'form-3',
      order: 3,
      validators: [
        Validators.required,
        Validators.pattern('[A-Za-z0-9]*'),
      ]
    }),
    new FieldTextBox({
      key: 'email',
      label: 'Email',
      value: '',
      placeHolder: 'Enter your Email',
      icon: 'form-3',
      order: 3,
      validators: [
        Validators.required,
        Validators.email
      ]
    }),
    new FieldTextBox({
      key: 'first_name',
      label: 'First Name',
      value: '',
      placeHolder: 'Enter your First Name',
      order: 3,
      validators: [
        Validators.pattern('[A-Za-z0-9]*'),

      ]
    }),
    new FieldTextBox({
      key: 'last_name',
      label: 'Last Name',
      value: '',
      placeHolder: 'Enter your Last Name',
      order: 3,
      validators: [
        Validators.pattern('[A-Za-z0-9]*'),
      ]
    }),

  ];
  checkPasswords(): boolean {
    console.log(this.fields);
    return true;
  }
  public loginFields: FieldBase<any>[] = [
    new FieldTextBox({
      key: 'userName',
      label: 'User Name',
      value: '',
      placeHolder: 'Enter a Username',
      icon: 'form-3',
      order: 3,
      validators: [
        Validators.required,
        Validators.pattern('[A-Za-z0-9]*')
      ]
    }),
    new FieldTextBox({
      key: 'password',
      label: 'Password',
      value: '',
      type:'password',
      placeHolder: 'Choose a password',
      icon: 'form-3',
      order: 3,
      validators: [
        Validators.required,
        Validators.pattern('[A-Za-z0-9]*'),
      ]
    }),
    ];


}


