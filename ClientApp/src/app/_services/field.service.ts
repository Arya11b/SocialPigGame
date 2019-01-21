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
    })
  ];
  public modeFields: FieldBase<any>[] = [
    new FieldTextBox({
      key: 'name',
      label: 'Name',
      value: '',
      placeHolder: 'Enter your game name',
      validators: [
        Validators.required,
        Validators.pattern('[A-Za-z0-9]*')
      ]
    }),
    new FieldTextBox({
      key: 'death_dice',
      label: 'Death Dice',
      value: '',
      placeHolder: 'enter the number of death dice',
      order: 3,
      validators: [
        Validators.required,
        Validators.pattern('[1-6]'),
      ]
    }),
    new FieldTextBox({
      key: 'max_score',
      label: 'Winning score',
      value: '',
      placeHolder: 'Set the Winning score',
      order: 3,
      validators: [
        Validators.required,
        Validators.pattern('[0-9]*')
      ]
    }),
    new FieldTextBox({
      key: 'dice_count',
      label: 'Dice Count',
      value: '',
      placeHolder: 'Enter the number of dices',
      order: 3,
      validators: [
        Validators.pattern('[1-2]'),
      ]
    }),
    new FieldTextBox({
      key: 'max_dice_role',
      label: 'Max dice role',
      value: '',
      placeHolder: 'Enter the number of max dice role',
      order: 3,
      validators: [
        Validators.pattern('[0-9]*'),
      ]
    })
  ];
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


