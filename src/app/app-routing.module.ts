import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AllPostsComponent} from "./posts/all-posts/all-posts.component";
import {NewPostComponent} from "./posts/new-post/new-post.component";
import {MainComponent} from "./main/main.component";

const routes: Routes = [
  {path:'posts',component:AllPostsComponent},
  {path:'posts/new',component:NewPostComponent},
  {path:'',component:MainComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
