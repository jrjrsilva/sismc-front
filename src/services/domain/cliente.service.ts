import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Injectable } from "@angular/core";
import { ClienteDTO } from '../../models/cliente.dto';
import { StorageService } from '../storage.service';
import { API_CONFIG } from '../../app/config/api.config';



@Injectable()
export class ClienteService{

  constructor(public http: HttpClient,public storage: StorageService){

  }

  findByEmail(email: string): Observable<ClienteDTO>{
     return this.http.get<ClienteDTO>(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
  }

  getiamgeFromBacket(id: string): Observable<any>{
    let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`;
    return this.http.get(url, {responseType: 'blob'});
  }
}
