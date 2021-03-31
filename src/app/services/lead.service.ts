import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LeadService {

  baseUrl = environment.baseurl;

  constructor(private http:HttpClient) {}

  createLeads(data){
    return this.http.post(this.baseUrl + '/lead/create',data);
  }

  createLeadsBycsv(data){
    return this.http.post(this.baseUrl + '/lead/create/csv',data);
  }


  getall(){
    return this.http.get(this.baseUrl + '/lead/getall');
  }

  singleLeads(id){
    return this.http.get(this.baseUrl + '/lead/'+id);
  }

  edit(data){
    return this.http.post(this.baseUrl + '/lead/update/',data);
  }

  delete(id){
    return this.http.delete(this.baseUrl + '/lead/'+id);
  }

}
