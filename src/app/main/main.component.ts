import {Component} from '@angular/core';
import {Employee} from "../model/employee";
import {EmployeeService} from "../employee.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {Category} from "../model/category";

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent {
    public employees: Employee[] = [];
    public editEmployee: Employee | null = null;
    public deleteEmployee: Employee | null = null

    constructor(private employeeService: EmployeeService) {
    }

    ngOnInit() {
        this.getEmployees();
    }

    public getEmployees(): void {
        this.employeeService.getEmployees().subscribe(
            (response: Employee[]) => {
                this.employees = response;
                console.log(this.employees);
            },
            (error: HttpErrorResponse) => {
                alert(error.message);
            }
        );
    }


    public onAddEmployee(addForm: NgForm): void {
        // @ts-ignore
        document.getElementById('add-employee-form').click();
        this.employeeService.addEmployee(addForm.value).subscribe(
            (response: Employee) => {
                console.log(response);
                this.getEmployees();
                addForm.reset();
            },
            (error: HttpErrorResponse) => {
                alert(error.message);
                addForm.reset();
            }
        );
    }

    public onUpdateEmployee(employee: Employee): void {
        this.employeeService.updateEmployee(employee).subscribe(
            (response: Employee) => {
                console.log(response);
                this.getEmployees();
            },
            (error: HttpErrorResponse) => {
                alert(error.message);
            }
        );
    }

    public onDeleteEmployee(employeeId: number): void {
        this.employeeService.deleteEmployee(employeeId).subscribe(
            (response: void) => {
                console.log(response);
                this.getEmployees();
            },
            (error: HttpErrorResponse) => {
                alert(error.message);
            }
        );
    }

    public onOpenModal(employee: Employee | null, mode: string): void {
        const container = document.getElementById('main-container');
        const button = document.createElement('button');
        button.type = 'button';
        button.style.display = 'none';
        button.setAttribute('data-toggle', 'modal');
        if (container) {
            if (mode === 'add') {
                button.setAttribute('data-target', '#addEmployeeModal');
            }
            if (mode === 'edit') {
                this.editEmployee = employee;
                button.setAttribute('data-target', '#updateEmployeeModal');
            }
            if (mode === 'delete') {
                this.deleteEmployee = employee;
                button.setAttribute('data-target', '#deleteEmployeeModal');
            }
            container.appendChild(button);
            button.click();
        }
    }

}
