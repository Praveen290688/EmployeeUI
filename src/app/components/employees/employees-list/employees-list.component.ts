import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';  
import { AuthService } from 'src/app/services/auth.service';
import { EmployeesService } from 'src/app/services/employees.service';


@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})



export class EmployeesListComponent implements OnInit {

  employees: Employee[] =[

    // {
    //   id: '5dfgfdgd-fgf2-d4dddfd-7hhfgfgfg-6ghg6fg',
    //   firstName: 'praveen',
    //   lastName: 'kumar',
    //   email: 'mpraveen@gmail.com',
    //   phoneNumber: '6766655444',
    //   address:'kurinchinagar',
    //   city:'gobi',
    //   state: 'Tamilnadu',
    //   country: 'India',
    //   postalCode: '638452',
    //   password: 'Winner'
    // }

    // {
    //   id: '5dfegd-f3rrgf2-d33dhddfd-t4gdhh-60bbhg6fg',
    //   firstName: 'ram',
    //   lastName: 'kumar',
    //   email: 'ram@gmail.com',
    //   phoneNumber: '9865298652',
    //   address:'carstreet',
    //   city:'erode',
    //   state: 'Tamilnadu',
    //   country: 'India',
    //   postalCode: '638638',
    //   password: 'First'
    // }


  ];

  HighlightRow : Number | undefined;  
  Employee : any;  
  ClickedRow:any;


  
//   public ascNumberSort = true;
//    sortNumberColumn() {
//     this.ascNumberSort = !this.ascNumberSort;
//     if(this.ascNumberSort) {
//         this.Employee.firstName.sort((a:any,b:any) => a - b); // For ascending sort
//     } else {
//         this.Employee.firstName.sort((a:any,b:any) => b - a); // For descending sort
//     }
// }
  
 
  constructor(private employeesService: EmployeesService, private auth: AuthService) {
  
  this.HighlightRow = 0; 
};

  //headers = ['Id', 'FirstName', 'Office', 'Age', 'Start Date', 'Salary','Salary','Salary','Salary','Salary','Salary'];

  ngOnInit(): void {

    this.employeesService.getAllEmployees()
    .subscribe({
      next: (employees) => {
        this.employees = employees;
     },
      error: (response) => {
        console.log(response);
      }
    });
  }

  logout()
  {
    this.auth.signOut();  
  }

  

}
