import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Category } from "../../model/category";
import {environment} from "../../environment"; // Import your Category model

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {}

    public getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(`${this.apiServerUrl}/categories`);
    }

    public addCategory(category: Category): Observable<Category> {
        return this.http.post<Category>(`${this.apiServerUrl}/categories`, category);
    }

    public deleteCategory(categoryId: number): Observable<void> {
        const url = `${this.apiServerUrl}/categories/${categoryId}`;
        return this.http.delete<void>(url);
    }
}
