import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Employee} from "./model/employee";
import {environment} from "./environment";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  public getEmployees(): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/employee`);
  }

  public getById(employeeId: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiServerUrl}/employee/${employeeId}`);
  }

  public addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiServerUrl}/employee/save`, employee);
  }

  public updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiServerUrl}/employee/update`, employee);
  }

  public deleteEmployee(employeeId: number): Observable<void> {
    const url = `${this.apiServerUrl}/employee/delete?id=${employeeId}`;
    return this.http.delete<void>(url);
  }

}
