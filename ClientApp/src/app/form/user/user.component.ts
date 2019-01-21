import {Component, OnInit, ViewChild, Input} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {FieldService} from "../../_services/field.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: []
})
export class UserComponent implements OnInit {
  @Input() userForm: FormGroup;

  constructor(private fieldService: FieldService) {
  }

  initUserForm() {
    this.fields.forEach(
      (field) => {
        this.userForm.addControl(field.key, new FormControl('', field.validators));
      }
    );
  }

  ngOnInit() {
    this.initUserForm();
  }

  get fields() {
    return this.fieldService.fields;
  }


}

