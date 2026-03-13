import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HeroesComponent } from './pages/heroes/heroes.component';
import { BuildsComponent } from './pages/builds/builds.component';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';
import { LineupsComponent } from './pages/lineups/lineups.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'heroes', component: HeroesComponent },
  { path: 'heroes/:heroId', component: HeroDetailComponent },
  { path: 'builds', component: BuildsComponent },
  { path: 'lineups', component: LineupsComponent }
];
