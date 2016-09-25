import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {routing} from "./app.routing";
import {AppComponent} from "./components/app/app.component";
import {PetService} from "./services/pet.service";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {PetListComponent} from "./components/petlist/petlist.component";
import {PetSearchComponent} from "./components/petsearch/petsearch.component";
import {ViewPetComponent} from "./components/viewpet/viewpet.component";
import {EditPetComponent} from "./components/editpet/editpet.component";
import {LoginComponent} from "./components/login/login.component";
import {AuthGuard} from "./guards/auth.guard";
import {AdminGuard} from "./guards/admin.guard";
import {AuthService} from "./services/auth.service";
import { CookieService } from 'angular2-cookie/services/cookies.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    PetListComponent,
    PetSearchComponent,
    ViewPetComponent,
    EditPetComponent,
    LoginComponent
  ],
  providers: [
    PetService,
    AuthService,
    AuthGuard,
    AdminGuard,
    CookieService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
