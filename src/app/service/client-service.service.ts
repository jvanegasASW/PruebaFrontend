import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { ClientDto } from '../models/client-dto';

@Injectable({
  providedIn: 'root'
})
export class ClientServiceService {

  private baseEndPoint = "http://localhost:8080/client";
  private cabeceras:HttpHeaders = new HttpHeaders({"Content-type":"application/json"});
  constructor(private http:HttpClient) { }

  public findAll():Observable<ClientDto[]>{
    return this.http.get(this.baseEndPoint).pipe(
        map(usuarios => usuarios as ClientDto[])
    );
  }

  public findbySharedKey(sharedKey:string):Observable<ClientDto>{
    return this.http.get<ClientDto>(`${this.baseEndPoint}/${sharedKey}`);
  }

  public create(client:ClientDto):Observable<ClientDto>{
    return this.http.post<ClientDto>(this.baseEndPoint, client, {headers:this.cabeceras});
  }

  public export(clients:ClientDto[]):Observable<any>{
    return this.http.post(`${this.baseEndPoint}/export`, clients, {observe: 'body', responseType: 'text' as 'json'});
  }
}
