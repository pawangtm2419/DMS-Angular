import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { CommonService, DepotService, ToasterService, UserService } from 'src/app/shared/services';

@Component({
  selector: 'app-viewd-depot-invoice',
  templateUrl: './viewd-depot-invoice.component.html',
  styleUrls: ['./viewd-depot-invoice.component.css']
})
export class ViewdDepotInvoiceComponent implements OnInit {
  params!: Params;
  userData = JSON.parse(localStorage.getItem('user') || '{}').data;

  constructor(
    private route: ActivatedRoute,
    private service: CommonService,
    private depot: DepotService,
    private toaster: ToasterService, private user: UserService,
    private router: Router) {
    this.route.params.subscribe((params: Params) => { this.params = params;});
  }

  ngOnInit(): void {
    this.depotByUser();
    this.depot.dealerInvoiceDetails(this.params['id']).subscribe((data: any) => {
      if(data.status) {
        this.toaster.showSuccess('Success', 'data load');
      }
    });
  }
  refresh(): void {
    this.ngOnInit();
  }

  depotByUser() {
    this.depot.getDepotByUser(this.userData.id).subscribe((data: any) => {
      this.toaster.showSuccess('Success', 'data load');
    });
  }

}
