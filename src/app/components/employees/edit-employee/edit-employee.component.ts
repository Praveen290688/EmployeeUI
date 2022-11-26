import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Employee } from 'src/app/models/employee.model';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  editEmployeeForm! : FormGroup;
  employeeDetails: Employee ={

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
  };

  constructor(private route: ActivatedRoute, private employeeService: EmployeesService,private fb: FormBuilder,
    private router: Router, private toast : NgToastService){ }

  ngOnInit(): void {

    this.editEmployeeForm = this.fb.group({
       id:['',Validators.required],
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

    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');

        if(id){
          this.employeeService.getEmployee(id)
          .subscribe({
            next: (response) => {
              this.employeeDetails = response;
            }
          })
        }
      }
    })
  }


  updateEmployee(){
    this.employeeService.updateEmployee(this.employeeDetails.id, this.employeeDetails)
    .subscribe({
      next: (response) =>
      {
        this.toast.success({detail : "SUCCESS", summary:"Details Updated Successful", duration: 5000});
        this.router.navigate(['employees contact']);
      }
    });
  }


  deleteEmployee(id: string){
    this.employeeService.deleteEmployee(id)
    .subscribe({
      next: (response) =>
      {
        this.toast.success({detail : "SUCCESS", summary:"Details Deleted Successful", duration: 5000});
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
