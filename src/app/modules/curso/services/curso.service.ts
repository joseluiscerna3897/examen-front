import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { AlertService } from "src/app/core/core.module";
import { CodeApi } from "src/app/core/enum/codestorage";
import { ResponseModel } from "src/app/core/models/response.model";
import { environment } from "src/environments/environment";
import { ICurso } from "../models/curso.model";

@Injectable({
    providedIn: 'root',
  })
export class CursoService {
    constructor(
        private _http: HttpClient,
        private _alert: AlertService,
      ) { }
    
      getAll(): Observable<ICurso[]> {
        return this._http.get(`${environment.url}curso/`).pipe(
          map((resp: ResponseModel) => {
            if (resp.Code === CodeApi.OK) {
              return resp.Data;
            }
          })
        );
      }
    
       
    
      create(request): Observable<void> {
        return this._http.post(`${environment.url}curso/`, request).pipe(
          map((resp: ResponseModel) => {
            if (resp.Code === CodeApi.OK) {
              this._alert.succes('Excelente', resp.Message);
            } else {
              this._alert.warn('Atencion', resp.Message);
            }
          })
        );
      }
    
      update(id: number, request): Observable<void> {
        return this._http.put(`${environment.url}curso/${id}`, request).pipe(
          map((resp: ResponseModel) => {
            if (resp.Code === CodeApi.OK) {
              this._alert.succes('Excelente', resp.Message);
            }
          })
        );
      }
    }