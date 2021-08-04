import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @ViewChild('masterNav') masterNav!: ElementRef;
  @ViewChild('dashNav') dashNav!: ElementRef;
  @ViewChild('plantNav') plantNav!: ElementRef;
  @ViewChild('depotNav') depotNav!: ElementRef;
  @ViewChild('dealerNav') dealerNav!: ElementRef;
  @ViewChild('showRep') showRep!: ElementRef;
  @ViewChild('showInv') showInv!: ElementRef;
  @ViewChild('showRtn') showRtn!: ElementRef;
  @ViewChild('showStat') showStat!: ElementRef;
  @ViewChild('showPlans') showPlans!: ElementRef;
  @ViewChild('showAts') showAts!: ElementRef;
  constructor(private service: UserService,  private router: Router, private elref: ElementRef) { }

  ngOnInit(): void {
  }
  getLogout(): void {
   this.service.logout();
  }
  openMasterNav(): void {
    console.log(this.masterNav.nativeElement);
    if (this.masterNav.nativeElement.style.width === '0px'){
      this.masterNav.nativeElement.style.width = '220px';
      this.masterNav.nativeElement.transition = '.5s all ease-in-out';
    }else{
      this.masterNav.nativeElement.style.width = '0px';
      this.masterNav.nativeElement.transition = '.5s all ease-in-out';
    }
  }
  openDashboardNav(): void {
    if (this.dashNav.nativeElement.style.width === '0px'){
      this.dashNav.nativeElement.style.width = '220px';
      this.dashNav.nativeElement.transition = '.5s all ease-in-out';
    }else{
      this.dashNav.nativeElement.style.width = '0px';
      this.dashNav.nativeElement.transition = '.5s all ease-in-out';
    }
  }
  openPlantNav(): void {
    if (this.plantNav.nativeElement.style.width === '0px'){
      this.plantNav.nativeElement.style.width = '220px';
      this.plantNav.nativeElement.transition = '.5s all ease-in-out';
    }else{
      this.plantNav.nativeElement.style.width = '0px';
      this.plantNav.nativeElement.transition = '.5s all ease-in-out';
    }
  }
  openDepotNav(): void {
    if (this.depotNav.nativeElement.style.width === '0px'){
      this.depotNav.nativeElement.style.width = '220px';
      this.depotNav.nativeElement.transition = '.5s all ease-in-out';
    }else{
      this.depotNav.nativeElement.style.width = '0px';
      this.depotNav.nativeElement.transition = '.5s all ease-in-out';
    }
  }
  openDealerNav(): void {
    if (this.dealerNav.nativeElement.style.width === '0px'){
      this.dealerNav.nativeElement.style.width = '235px';
      this.dealerNav.nativeElement.transition = '.5s all ease-in-out';
    }else{
      this.dealerNav.nativeElement.style.width = '0px';
      this.dealerNav.nativeElement.transition = '.5s all ease-in-out';
    }
  }
  showReports(): void {
    if (this.showRep.nativeElement.style.display === 'none'){
       this.showRep.nativeElement.style.display = 'block';
       this.showRep.nativeElement.transition = '.5s all ease-in-out';
    }else{
      this.showRep.nativeElement.style.display = 'none';
      this.showRep.nativeElement.transition = '.5s all ease-in-out';
    }
  }
  invReports(): void {
    if (this.showInv.nativeElement.style.display === 'none'){
       this.showInv.nativeElement.style.display = 'block';
       this.showInv.nativeElement.transition = '.5s all ease-in-out';
    }else{
      this.showInv.nativeElement.style.display = 'none';
      this.showInv.nativeElement.transition = '.5s all ease-in-out';
    }
  }
  rtnReports(): void {
    if (this.showRtn.nativeElement.style.display === 'none'){
       this.showRtn.nativeElement.style.display = 'block';
       this.showRtn.nativeElement.transition = '.5s all ease-in-out';
    }else{
      this.showRtn.nativeElement.style.display = 'none';
      this.showRtn.nativeElement.transition = '.5s all ease-in-out';
    }
  }
  delStatement(): void {
    if (this.showStat.nativeElement.style.display === 'none'){
       this.showStat.nativeElement.style.display = 'block';
       this.showStat.nativeElement.transition = '.5s all ease-in-out';
    }else{
      this.showStat.nativeElement.style.display = 'none';
      this.showStat.nativeElement.transition = '.5s all ease-in-out';
    }
  }
  plansRep(): void {
    if (this.showPlans.nativeElement.style.display === 'none'){
       this.showPlans.nativeElement.style.display = 'block';
       this.showPlans.nativeElement.transition = '.5s all ease-in-out';
    }else{
      this.showPlans.nativeElement.style.display = 'none';
      this.showPlans.nativeElement.transition = '.5s all ease-in-out';
    }
  }
  atsRep(): void {
    if (this.showAts.nativeElement.style.display === 'none'){
       this.showAts.nativeElement.style.display = 'block';
       this.showAts.nativeElement.style.transition = '.5s all ease-in-out';
    }else{
      this.showAts.nativeElement.style.display = 'none';
      this.showAts.nativeElement.style.transition = '.5s all ease-in-out';
    }
  }
}
