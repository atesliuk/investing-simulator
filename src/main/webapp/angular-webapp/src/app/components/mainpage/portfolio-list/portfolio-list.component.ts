import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/User";
import {Cookie} from "ng2-cookies/ng2-cookies";
import {Portfolio} from "../../../models/Portfolio";
import {Router} from "@angular/router";

@Component({
  selector: 'app-portfolio-list',
  templateUrl: './portfolio-list.component.html',
  styleUrls: ['./portfolio-list.component.css']
})
export class PortfolioListComponent implements OnInit {

  private theUser: User;
  private allPortfolios;
  private createPortfolioAlertText;
  private createPortfolioAlertHideShow;
  private createPortfolioAlertType;
  private spinnerFadeShow;
  private portfolioToDelete: Portfolio;

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.theUser = JSON.parse(Cookie.get('user'));

    if (this.theUser == undefined) {
      this.router.navigate(['/login']);
    }
    this.updateUser(this.theUser.id);

    this.createPortfolioAlertHideShow = "fade";
    this.createPortfolioAlertText = "";
    this.createPortfolioAlertType = "alert-danger";
    this.spinnerFadeShow= "fade";
    this.portfolioToDelete = new Portfolio("",0,0);
  }

  getPortfolios(){
    let ids = this.theUser.portfolios;
    this.allPortfolios = new Array<Portfolio>();

    ids.forEach((id) => {
      this.userService.getPortfolio(id).subscribe((portfolio: Portfolio)=> {
        this.allPortfolios.push(portfolio);
      });
    });

  }

  onCreateNewPortfolio(event: Event, name: string, initialInvestment: string){
    event.preventDefault();

    this.spinnerFadeShow= "show";

    let investmentNumber = +initialInvestment;
    let newPortfolio = new Portfolio(name, investmentNumber, this.theUser.id);

    this.userService.saveNewPortfolio(newPortfolio).subscribe((result: Portfolio)=>{

      this.spinnerFadeShow = 'fade';

      if (result == undefined){
        this.createPortfolioAlertType = "alert-danger";
        this.createPortfolioAlertText = "Portfolio with this name already exists! Chose another name!";
        this.createPortfolioAlertHideShow = "show";
      }else{
        this.createPortfolioAlertType = "alert-success";
        this.createPortfolioAlertText = `Portfolio ${name} created. Updating...`;

        this.spinnerFadeShow = 'show';

        this.updateUser(this.theUser.id);
      }
    });
  }

  updateUser(id: number){
    this.userService.getUser(id).subscribe((result: User) => {
      if (result==undefined){
        Cookie.set('user',undefined);
        this.router.navigate(['/login']);
      }else{
        Cookie.set('user',JSON.stringify(result));
        this.theUser = result;
        this.getPortfolios();

        console.log("PortfolioList. Updating user. Updated, putted in cookies. Cookies:");
        console.log(JSON.parse(Cookie.get('user')));

        this.spinnerFadeShow = 'fade';
        //closing the modal windows if opened
        document.getElementById("closeModalButton").click();
        document.getElementById("closeDeleteModal").click();
      }

    });
  }

  deletePortfolio(portfolio: Portfolio){
    this.userService.deletePortfolio(portfolio.id).subscribe((result: string) => {
      this.updateUser(this.theUser.id);
    });
  }


  setPortfolioToDelete(portfolio: Portfolio){
    this.portfolioToDelete = portfolio;
  }

  onModalClosed(){
    this.spinnerFadeShow="fade";
    this.createPortfolioAlertHideShow="fade";
    document.getElementById("closeModalButton").click();
  }

}
