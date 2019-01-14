import { Observable } from 'rxjs/Rx';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { StorageService } from '../services/storage.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{

  constructor(public storage: StorageService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    //console.log("passou");
    return next.handle(req)
    .catch((error, caught)=> {

      let errorObj = error;
      if(errorObj.error){
        errorObj = errorObj.error;
      }
      if(!errorObj.status){
        errorObj = JSON.parse(errorObj);
      }

      console.log("Erro detectado pelo interceptor! ");
      console.log(errorObj);

      switch(errorObj.status){
        case 403:
        this.handler403();
        break;
      }

      console.log(errorObj);
      return Observable.throw(errorObj);
    }) as any;
  }

  handler403(){
    this.storage.setLocalUser(null);
  }
}

export const ErrorInterceptProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true,
};
