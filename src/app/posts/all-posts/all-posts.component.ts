import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {PostService} from "../new-post/post.service";

import {Post} from "../../model/post";
import {map, Observable} from "rxjs";

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent implements OnInit {


  constructor(private httpClient: HttpClient, private postService: PostService) {
  }

  public posts: Post[] = [];

  uploadedImage: File | null = null;
  dbImage: any;
  postResponse: any;
  successResponse: string = "";
  image: any;
  post: undefined = undefined;
  path: string = "C:\\Users\\dell\\IdeaProjects\\EmployeeManager\\images "


  public onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
  }

  public getPosts(): void {
    this.postService.getPosts().subscribe(
      (response: Post[]) => {
        this.posts = response;
        console.log(this.posts);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  imageUploadAction() {
    const formData = new FormData();
    // @ts-ignore
    formData.append('image', this.uploadedImage, this.uploadedImage.name);

    this.httpClient.post('http://localhost:8081/post/img', formData, {observe: 'response'})
      .subscribe((response) => {
        if (response.status === 200) {
          this.postResponse = response;
          this.successResponse = this.postResponse.body.message;
        } else {
          this.successResponse = 'Image not uploaded due to some error!';
        }
      });
  }

  ngOnInit(): void {
    this.getPosts();
  }


  public onDelete(id: number): void {
    this.postService.deletePost(id).subscribe(
      (response: void) => {
        console.log(response);
        this.getPosts();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  // @ts-ignore
  getProfileImage(imageName: string): Observable<string> {
    this.postService.getProfileImage(imageName).subscribe((data: Blob) => {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const imageUrl = event.target.result;
        // Set the image URL in your post object or wherever you need it
      };
      reader.readAsDataURL(data);
    });
  }

  protected readonly undefined = undefined;
}
