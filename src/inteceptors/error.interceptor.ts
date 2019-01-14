import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { Observable } from 'rxjs/Rx';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { StorageService } from '../services/storage.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{

  constructor(public storage: StorageService,public alertCtrl: AlertController){}

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

        case 401:
        this.handler401();
        break;

        case 403:
        this.handler403();
        break;

        default:
        this.handlerDefaultError(errorObj);
      }

      console.log(errorObj);
      return Observable.throw(errorObj);
    }) as any;
  }

  handler403(){
    this.storage.setLocalUser(null);
  }

  handler401(){
    let alert = this.alertCtrl.create({
      title: 'Erro 401: falha de autenticação!',
      message:'E-mal ou senha incorreta!',
      enableBackdropDismiss: false,
      buttons: [
        {text: 'Ok'}
      ]
    });
    alert.present();
  }

  handlerDefaultError(errorObj){
    let alert = this.alertCtrl.create({
      title: 'Erro '+ errorObj.status+ ': '+ errorObj.error,
      message: errorObj.message,
      enableBackdropDismiss: false,
      buttons: [
        {text: 'Ok'}
      ]
    });
    alert.present();
  }
}

export const ErrorInterceptProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true,
};
