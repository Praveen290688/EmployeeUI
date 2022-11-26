import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Employee } from 'src/app/models/employee.model';
import { EmployeesService } from 'src/app/services/employees.service';
//import { constructor } from 'typescript';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit{

addEmployeeForm! : FormGroup;
addEmployeeRequest: Employee ={
  id: '',
  firstName:'',
  lastName: '',
  email:'',
  phoneNumber:'',
  address:'',
  city:'',
  state:'',
  country:'',
  postalCode:'',
  password:''
}
constructor(private employeeService: EmployeesService,private fb: FormBuilder,private toast: NgToastService,
   private router: Router) { }

ngOnInit(): void {

  this.addEmployeeForm = this.fb.group({
    firstName: ['',Validators.required],
    lastName: ['',Validators.required],
     email: ['',Validators.required],
     phoneNumber: ['',Validators.required],
     address: ['',Validators.required],
     city: ['',Validators.required],
     state: ['',Validators.required],
     country: ['',Validators.required],
     postalCode: ['',Validators.required],
     password: ['',Validators.required],
  })


}

addEmployee() {
  this.employeeService.addEmployee(this.addEmployeeRequest)
  .subscribe({
    next: (employee) => {
      this.toast.success({detail : "SUCCESS", summary:"Details Added Successful", duration: 5000});
      this.router.navigate(['employees contact']);
     
    }
  });
}

  
closeEmployee(){
  this.employeeService.getAllEmployees()
  .subscribe({
    next: (response) =>
    {
      this.router.navigate(['employees contact']);

    }
  });
}


}
