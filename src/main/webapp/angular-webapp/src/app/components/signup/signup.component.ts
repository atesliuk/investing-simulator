import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../models/User";
import {Router} from "@angular/router";
import {Cookie} from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  private alertType: string;
  private alertText: string;
  private alertFadeShow: string;
  private spinnerFadeShow: string;

  constructor(private userService: UserService,
              private router: Router) {
    if (JSON.parse(Cookie.get('user')) != undefined) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.alertFadeShow = 'fade';
    this.spinnerFadeShow = "fade";
  }

  onSignup(event:Event, email:string, firstName:string, lastName:string, password:string, repeatedPassword: string){
    event.preventDefault();

    if (password.length<6 || password.length>20){
      this.changeAlert("alert-danger", "Password should be 6-20 symbols long");
      return;
    }

    if (password != repeatedPassword){
      this.changeAlert("alert-danger", "Password confirmation doesn't match the password");
      return;
    }

    this.spinnerFadeShow = "show";

    let user = new User(0, email,firstName,lastName);
    user.password = password;

    this.userService.signup(user).subscribe((result: User)=>{
      console.log("Signup returned user:");
      console.log(result);

      this.spinnerFadeShow = 'fade';

      if (result == undefined){
        this.changeAlert("alert-danger", "User with this email already exists");
      }else{
        Cookie.set('user',JSON.stringify(result));
        this.alertFadeShow = "fade";
        //go to the main page
        this.router.navigate(['/']);
      }
    });

    this.alertFadeShow = 'fade';
  }

  changeAlert(alertType:string, alertText:string){
    this.alertFadeShow = "show";
    this.alertType = alertType;
    this.alertText = alertText;
  }

  hideAlert(){
    this.alertFadeShow = "fade";
  }

}
