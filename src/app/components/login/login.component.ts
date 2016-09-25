import {Component} from "@angular/core";
import {AuthService} from "../../services/auth.service";
import {UserLogin} from "../../models/userLogin";
import {Router} from "@angular/router";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  providers: [AuthService]
})
export class LoginComponent {
  username: string;
  password: string;

  loginFailed = false;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  login(): void {
    this.loginFailed = false;

    var userLogin = new UserLogin();
    userLogin.username = this.username;
    userLogin.password = this.password;

    this.authService.login(userLogin)
      .then(isSuccess => {
      if(isSuccess) {
        this.router.navigate(['/pets']);
      } else {
        this.loginFailed = true;
      }
    }).catch(() => {
      this.loginFailed = true;
    });
  }
}
