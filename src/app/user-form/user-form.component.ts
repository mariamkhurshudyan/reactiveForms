import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';
import {MustMatch} from '../must-Match';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  public userForm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      userArray: this.formBuilder.array([this.newFormGroup()])
    })
  }

  get f() {
    return this.userForm.controls;
  }

  currentFormArray(index: number) {
    return this.userArrayControls[index] as FormGroup;
  }

  get profileFormControl() {
    return this.userForm.controls;
  }

  get userArray() {
    return this.userForm.get('userArray') as FormArray;
  }

  get userArrayControls() {
    return this.userArray.controls;
  }

  addForm() {
    this.userArray.push(this.newFormGroup());
  }

  private newFormGroup() {
    return this.formBuilder.group({
        firstName: ['', [Validators.required, Validators.minLength(3)]],
        lastName: ['', [Validators.required], Validators.minLength(3)],
        email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
        password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9$@$!%*?&].{6,}')]],
        confirmPassword: ['', Validators.required],
      },

      {
        validator: MustMatch('password', 'confirmPassword')
      },
    );
  }

  deleteForm(i: any){
    if(i !==0){
      this.userArray.removeAt(i);
    }
  }

  onSubmit() {
    this.submitted = true;
    if(this.userArray.length >= 3) {
      alert('Only your 10 forms will be submitted.');
      return;
      
    }
    if (this.userForm.invalid) {
      return;
    }
    console.warn(this.userForm.value);
    console.log(this.userArrayControls.filter((element, index) => index <= 3))
    
  }
}
