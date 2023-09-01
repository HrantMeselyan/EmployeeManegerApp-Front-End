import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environment";
import {Post} from "../../model/post";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  public getPosts(): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/post`);
  }

  public getById(postId: number): Observable<Post> {
    return this.http.get<Post>(`${this.apiServerUrl}/post/${postId}`);
  }


  public addPost(postData: FormData): Observable<Post> {
    return this.http.post<Post>(`${this.apiServerUrl}/post`, postData);
  }


  public updatePost(post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.apiServerUrl}/post/update`, post);
  }

  public deletePost(postId: number): Observable<void> {
    const url = `${this.apiServerUrl}/post/${postId}`;
    return this.http.delete<void>(url);
  }

  public getProfileImage(imageName: string): Observable<Blob> {
    const url = `${this.apiServerUrl}/post/getImage/${imageName}`;
    return this.http.get(url, {responseType: 'blob'});
  }

  public getPostImages(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiServerUrl}/getImage`);
  }

}
