import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {EmployeeService} from "./employee.service";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AllPostsComponent} from './posts/all-posts/all-posts.component';
import {NewPostComponent} from './posts/new-post/new-post.component';
import {MainComponent} from "./main/main.component";
import {HeaderComponent} from './layouts/header/header.component';
import {AngularEditorModule} from "@kolkov/angular-editor";
@NgModule({
    declarations: [
        AppComponent,
        AllPostsComponent,
        NewPostComponent,
        MainComponent,
        HeaderComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        AngularEditorModule,
        ReactiveFormsModule

    ],
    providers: [EmployeeService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
