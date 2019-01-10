import { CategoriaDTO } from './../../models/categoria.dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { API_CONFIG } from '../../app/config/api.config';


@Injectable()
export class CategoriaService{

  constructor(public http: HttpClient){

  }

  findAll(): Observable<CategoriaDTO[]>{
    return this.http.get<CategoriaDTO[]>(`${API_CONFIG.baseUrl}/categorias`);
  }
}
