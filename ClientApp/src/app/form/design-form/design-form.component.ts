import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {FieldService} from '../../_services/field.service';

@Component({
  selector: 'app-design-form',
  templateUrl: './design-form.component.html',
  styleUrls: []
})
export class DesignFormComponent implements OnInit {

  @Input() designForm: FormGroup;

  constructor(private fieldService: FieldService) {
  }

  initUserForm() {
    this.fields.forEach(
      (field) => {
        this.designForm.addControl(field.key, new FormControl('', field.validators));
      }
    );
  }

  ngOnInit() {
    this.initUserForm();
  }

  get fields() {
    return this.fieldService.modeFields;
  }



}
