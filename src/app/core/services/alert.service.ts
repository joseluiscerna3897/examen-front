import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  succes(title: string, message: string) {
    Swal.fire({
      title: title,
      text: message,
      icon: 'success',
    });
  }

  warn(title: string, message: string) {
    Swal.fire({
      title: title,
      text: message,
      icon: 'warning',
    });
  }

  error(title: string, message: string) {
    Swal.fire({
      title: title,
      text: message,
      icon: 'error',
    });
  }
}