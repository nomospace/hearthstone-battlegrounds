import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HeroesComponent } from './pages/heroes/heroes.component';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';
import { MatchesComponent } from './pages/matches/matches.component';
import { DailyPickComponent } from './pages/daily-pick/daily-pick.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'heroes', component: HeroesComponent },
  { path: 'heroes/:heroId', component: HeroDetailComponent },
  { path: 'matches', component: MatchesComponent },
  { path: 'daily', component: DailyPickComponent }
];
