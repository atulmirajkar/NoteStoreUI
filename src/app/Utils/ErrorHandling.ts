// tslint:disable-next-line: quotemark
import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";

export class ErrorHandler {


  public static handle(httpError: HttpErrorResponse) {

    if (httpError.error instanceof ErrorEvent) {
      console.log('Client side error', httpError.error.message);
      return throwError('A client side error occurred');
    } else {
      console.log('Server side error', httpError.message);
      return throwError('There was a problem with the server. Please try again later');
    }

  }
}
