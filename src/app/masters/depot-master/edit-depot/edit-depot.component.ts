import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MastersService } from 'src/app/shared/services/masters.service';


@Component({
  selector: 'app-edit-depot',
  templateUrl: './edit-depot.component.html',
  styleUrls: ['./edit-depot.component.css']
})
export class EditDepotComponent implements OnInit {
  depotInfo: any;
  constructor(private route: ActivatedRoute,private master: MastersService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("depot");
    const data = {useType: "ALL", _id : id };
    this.master.depotInfo(data).subscribe(res=> {
      this.depotInfo=res.data;
    });    
  }

  onSubmit(f: NgForm) {
    const depotData = this.depotInfo[0];
    const updateData = f.value;
    if(f.valid) {
      const data = {
          "_id": depotData._id,
          "depotCreatedBy": depotData.depotCreatedBy,
          "eastimatedTransitDayToDepot": depotData.eastimatedTransitDayToDepot,
          "depotRemarks": updateData.depotRemarks,
          "depotFaxNum": updateData.depotFaxNum,
          "depotTelNum": updateData.depotTelNum,
          "depotEmail": updateData.depotEmail,
          "plantDepotFlag": updateData.plantDepotFlag,
          "depotDescription": updateData.depotDescription,
          "depotName": updateData.depotName,
          "depotCode": updateData.depotCode,
          "isDeleted": depotData.isDeleted,
          "__v": depotData.__v,
          "isPlant": depotData.isPlant,
          "isActive": depotData.isActive,
          "depotLatitude": depotData.depotLatitude,
          "depotLongitude": depotData.depotLongitude,
          "depotGST": updateData.depotGST,
          "depotPAN": updateData.depotPAN,
          "depotCIN": updateData.depotCIN,
          "roots": depotData.roots,
          "depotCreatedDate": depotData.depotCreatedDate,
          "depotLeasePeriodDate": {
            "renewal": updateData.renewal,
            "to": updateData.to,
            "from": updateData.from
          },
          "depotStatus": updateData.depotStatus,
          "depotHead": {
            "mobile": updateData.depotHeadmobile,
            "email": updateData.depotHeademail,
            "name": updateData.depotHeadname
          },
          "address": {
            "depotAddress": updateData.depotAddress,
            "pinCode": updateData.pinCode,
            "cityName": updateData.cityName,
            "stateName": updateData.stateName,
            "countryName": updateData.countryName,
            "zoneName": updateData.zoneName
          }
        }
        this.master.updateDepot(data).subscribe(res => {
          this.depotInfo = res.msg;
          console.log(this.depotInfo);
        })
      }
  }
  
}
