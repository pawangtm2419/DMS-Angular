import { Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(private toastr: ToastrService) { }

  showSuccess(title: string | undefined, msg: string | undefined) {
    this.toastr.success(title, msg);
  }

  showWarning(title: string | undefined, msg: string | undefined) {
    this.toastr.warning(msg, title);
  }

  showError(title: string | undefined, msg: string | undefined) {
    this.toastr.error(msg, title);
  }

  showInfo(title: string | undefined, msg: string | undefined) {
    this.toastr.info(msg, title);
  }
}
