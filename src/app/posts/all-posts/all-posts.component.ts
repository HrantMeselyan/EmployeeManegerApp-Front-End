import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent {


  constructor(private httpClient: HttpClient) {
  }


  uploadedImage: File | null = null;
  dbImage: any;
  postResponse: any;
  successResponse: string = "";
  image: any;
  post: undefined = undefined;


  public onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
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


}
