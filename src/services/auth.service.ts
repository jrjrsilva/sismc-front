import { JwtHelper } from 'angular2-jwt';
import { API_CONFIG } from './../app/config/api.config';
import { CredenciaisDTO } from './../models/credenciais.dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { tokenKey } from '@angular/core/src/view';
import { LocalUser } from '../models/local_user';
import { StorageService } from './storage.service';
import { CartService } from './domain/cart.service';


@Injectable()
export class AuthService {

  JwtHelper : JwtHelper = new JwtHelper();
  constructor (
    public http: HttpClient,
    public storage: StorageService,
    public cartService: CartService){

  }

  authenticate(creds : CredenciaisDTO){
    return this.http.post(`${API_CONFIG.baseUrl}/login`,
          creds,
          {
          observe: 'response',
          responseType: 'text',
          });
  }

  sucessfullLogin (authorizationValue: string){
    let tok = authorizationValue.substring(7);
    let user : LocalUser ={
      token : tok,
      email : this.JwtHelper.decodeToken(tok).sub
    };
    this.storage.setLocalUser(user);
    this.cartService.createOrClearCart();
  }

  refreshToken(){
    return this.http.post(`${API_CONFIG.baseUrl}/auth/refresh_token`,
         {},
          {
            observe: 'response',
            responseType: 'text',
          });
  }

  logout(){
    this.storage.setLocalUser(null);
  }

}
