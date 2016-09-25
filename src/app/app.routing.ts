import {ModuleWithProviders} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {PetListComponent} from "./components/petlist/petlist.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {PetSearchComponent} from "./components/petsearch/petsearch.component";
import {ViewPetComponent} from "./components/viewpet/viewpet.component";
import {EditPetComponent} from "./components/editpet/editpet.component";
import {LoginComponent} from "./components/login/login.component";
import {AuthGuard} from "./guards/auth.guard";
import {AdminGuard} from "./guards/admin.guard";

const appRoutes: Routes = [
  {
    path: 'pets',
    component: PetListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'search',
    component: PetSearchComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'pet/:id',
    component: ViewPetComponent
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'editpet/:id',
    component: EditPetComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'editpet',
    component: EditPetComponent,
    canActivate: [AuthGuard, AdminGuard]
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
