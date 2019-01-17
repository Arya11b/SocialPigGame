import { UserComponent } from './form/user/user.component';
import { FieldService } from './services/field.service';
import { MaterialModule } from './shared/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MenuComponent } from './menu/menu.component';
import { DropdownComponent } from './components/dropdown-multiple/dropdown-multiple.component';
import { TextFieldComponent } from './components/text-field/text-field.component';
import { FieldComponent } from './form/field/field.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { GameComponent } from './game/game.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    ProfileComponent,
    LoginComponent,
    SignupComponent,
    ToolbarComponent,
    MenuComponent,
    DropdownComponent,
    TextFieldComponent,
    UserComponent,
    FieldComponent,
    AllUsersComponent,
    GameComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'sign-up', component: SignupComponent },
      { path: 'login', component: LoginComponent },
      { path: 'all-users', component: AllUsersComponent },
      { path: 'counter', component: CounterComponent },
      { path: 'profile/:id', component: ProfileComponent },
      { path: 'fetch-data', component: FetchDataComponent },
    ])
  ],
  providers: [
    FieldService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
