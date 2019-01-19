import { Routes, RouterModule } from '@angular/router';

import { AllUsersComponent } from './all-users';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './_guards';
import {HomeComponent} from './home/home.component';
import {ProfileComponent} from './profile/profile.component';
import {GameComponent} from './game/game.component';
import {AllGamesComponent} from './all-games/all-games.component';
import {GameDesignComponent} from './game-design/game-design.component';
import {SignupComponent} from './signup/signup.component';
import {DesignedGamesComponent} from './designed-games/designed-games.component';

const appRoutes: Routes = [
  { path: 'users/all', component: AllUsersComponent},
  { path: 'game.ts/all', component: AllGamesComponent},
  {path: 'game.ts/design', component: GameDesignComponent, canActivate: [AuthGuard]},
  // { path: 'all', component: AllUsersComponent, canActivate: [AuthGuard] },
  { path: '', component: HomeComponent},
    { path: 'login', component: LoginComponent },
  { path: 'register', component: SignupComponent },
  { path: 'users/:id', component: ProfileComponent },
  { path: 'game.ts', component: GameComponent },
  { path: 'game.ts/modes', component: DesignedGamesComponent },

    // otherwise redirect to all-users
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
