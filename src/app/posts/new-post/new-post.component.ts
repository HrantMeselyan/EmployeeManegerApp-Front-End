import {Component, OnInit} from '@angular/core';
import {Category} from "../../model/category";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {CategoryService} from "./category.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
    selector: 'app-new-post',
    templateUrl: './new-post.component.html',
    styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
    permalink: string = '';
    imgSrc: any = './assets/img.png';
    selectedImg: any = '';
    //
    public categories: Category[] = [];
    onTitleChanged($event: any) {
      const title = $event.target.value;
      this.permalink = title.replace(/\s/g, '-');
    }
    //
    showPreview($event: any) {
      if ($event.target && $event.target.files && $event.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          // @ts-ignore
          this.imgSrc = e.target.result;
        };
        reader.readAsDataURL($event.target.files[0]);
        this.selectedImg = $event.target.files[0];
      }
    }

    public getCategories(): void {
        this.categoryService.getCategories().subscribe(
            (response: Category[]) => {
                this.categories = response;
                console.log(this.categories);
            },
            (error: HttpErrorResponse) => {
                alert(error.message);
            }
        );
    }

    formData: FormGroup;

    constructor(private formBuilder: FormBuilder, private httpClient: HttpClient, private categoryService: CategoryService) {
        this.formData = this.formBuilder.group({
            title: '',
            postContent: '',
            img: null,
            excerpt: '',
            categoryId: ''
        });
    }

    onSubmit() {
        const formData = new FormData();
        // @ts-ignore
        formData.append('title', this.formData.get('title').value);
        // @ts-ignore
        formData.append('postContent', this.formData.get('postContent').value);
        // @ts-ignore
        formData.append('img', this.formData.get('img').value);
        // @ts-ignore
        formData.append('excerpt', this.formData.get('excerpt').value);
        // @ts-ignore
        formData.append('categoryId', this.formData.get('categoryId').value);

        this.httpClient
            .post('http://localhost:8081/post', formData)
            .subscribe((response: any) => {
                console.log(response);
            });
    }


    onFileSelected(event: any) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            // @ts-ignore
            this.formData.get('img').setValue(file);
        }
    }

    ngOnInit() {
        this.getCategories();
    }
}

