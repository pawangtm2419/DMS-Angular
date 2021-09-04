import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PlantService, ToasterService } from 'src/app/shared/services';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';

type AOA = any[][];
@Component({
  selector: 'app-plant-stock',
  templateUrl: './plant-stock.component.html',
  styleUrls: ['./plant-stock.component.css']
})
export class PlantStockComponent implements OnInit {
  plantStock: any;
  searchData: any;
  limits = [{ key: '50', value: 50 }, { key: '100', value: 100 }, { key: '250', value: 250 }, { key: '500', value: 500 }];
  pageData = 1;
  limit: any = 50;
  localStrg: any = localStorage.getItem("user") || {};
  isExcelDownload: boolean = false;

  data: AOA = [];
  constructor(private service: PlantService, public toaster: ToasterService, private http: HttpClient) { }

  ngOnInit(): void {
    this.plantStockData();
  }
  plantStockData() {
    let stock = {type: 'PLANTSTOCK'};
    this.service.plantStock(stock).subscribe(res => {
      this.plantStock = res.data;
      if (this.plantStock.length > 0) {
        this.isExcelDownload = true;
        this.toaster.showSuccess('Data', 'Report successfully Open.');
        this.limits.push({ key: 'ALL', value: this.plantStock.length });
      } else {
        this.toaster.showInfo('Data', 'No record found.');
      }
    }, (error) => {
      this.toaster.showError('Error', error);
    });
  }

  dataLimit() {
    this.limit = ( document.getElementById('limit') as HTMLInputElement).value;
  }

  goCapitalizeStock(pStock: any) {
    const data = {
      chassisNo: pStock.chassisNo,
      createdBy: JSON.parse(this.localStrg).data.empID,
      market: "DEALER"
    }
    this.service.moveToCapital(data).subscribe(res => {
      if (res.status) {
        this.toaster.showSuccess('Success', 'Moved in Capitalize Stock.');
        this.plantStockData();
      }
    }, (error) => {
      this.toaster.showError('Error', error);
    });
  }
  removeChassis(pStock: any) {
    console.log([pStock]);
  }

  form22(pStock: any) {
    console.log([pStock]);
  }

  editDepotIndo(pStock: any) {
    console.log([pStock]);
  }
  download(): void {
    let wb = XLSX.utils.table_to_book(document.getElementById('export'), { display: false, raw: true });
    XLSX.writeFile(wb, "plantStockReport.xlsx");
  }

  onFileChange(evt: any) {
    debugger;
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    var formData = new FormData();
    Array.from(target.files).forEach(f => formData.append('file', f));
    this.service.depotStockUpload(formData).subscribe((event: any) => {
      console.log(event);
    })
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      // read workbook
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      // grab first sheet
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      // save data
      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
      console.log(this.data);
    };
    reader.readAsBinaryString(target.files[0]);
  }
}
