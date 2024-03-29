﻿import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {fakeBackendProvider} from './_helpers';
import {AppComponent} from './app.component';
import {routing} from './app.routing';
import {AlertComponent} from './_components';
import {JwtInterceptor, ErrorInterceptor} from './_helpers';
import {AllUsersComponent} from './all-users';
import {LoginComponent} from './login';
import {SignupComponent} from './signup/signup.component';
import {CommentComponent} from './comment/comment.component';
import {CommentFieldComponent} from './comment-field/comment-field.component';
import {ProfileComponent} from './profile/profile.component';
import {AuthComponent} from './form/auth/auth.component';
import {UserComponent} from './form/user/user.component';
import {MaterialModule} from './shared/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FieldComponent} from './form/field/field.component';
import {TextFieldComponent} from './_components/text-field/text-field.component';
import {DropdownComponent} from './_components/dropdown-multiple/dropdown-multiple.component';
import {HomeComponent} from './home/home.component';
import {ToolbarComponent} from './toolbar/toolbar.component';
import {GameComponent} from './game/game.component';
import {GameDesignComponent} from './game-design/game-design.component';
import {AllGamesComponent} from './all-games/all-games.component';
import {OnlineUsersComponent} from './online-users/online-users.component';
import {FieldService} from './_services/field.service';
import {DesignedGamesComponent} from './designed-games/designed-games.component';
import {BestGameModesComponent} from './best-game-modes/best-game-modes.component';
import {AdminPanelComponent} from './admin-panel/admin-panel.component';
import { OnlineFriendsComponent } from './online-friends/online-friends.component';
import {MenuComponent} from './menu/menu.component';
import { MiniProfileComponent } from './mini-profile/mini-profile.component';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { MiniGamemodeComponent } from './mini-gamemode/mini-gamemode.component';
import { DesignFormComponent } from './form/design-form/design-form.component';
import { GamesHubComponent } from './games-hub/games-hub.component';

@NgModule({
  imports: [
    BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    routing
  ],
  declarations: [
    AppComponent,
    AlertComponent,
    AllUsersComponent,
    LoginComponent,
    SignupComponent,
    CommentComponent,
    CommentFieldComponent,
    ProfileComponent,
    AuthComponent,
    UserComponent,
    FieldComponent,
    TextFieldComponent,
    DropdownComponent,
    HomeComponent,
    ToolbarComponent,
    GameComponent,
    GameDesignComponent,
    AllGamesComponent,
    OnlineUsersComponent,
    DesignedGamesComponent,
    AdminPanelComponent,
    MenuComponent,
    BestGameModesComponent,
    MiniProfileComponent,
    ProfileDetailComponent,
    OnlineFriendsComponent,
    MiniGamemodeComponent ,
    GamesHubComponent,
    DesignFormComponent],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},

    // provider used to create fake backend
    fakeBackendProvider,
    FieldService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
