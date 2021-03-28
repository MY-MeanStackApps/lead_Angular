import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompaignService {

  baseUrl = environment.baseurl;

  constructor(private http:HttpClient) {}

  createCompaigns(data){
    return this.http.post(this.baseUrl + '/compaign/create',data);
  }

  getallCompaigns(){
    return this.http.get(this.baseUrl + '/compaign/getall');
  }

  singleCompaign(id){
    return this.http.get(this.baseUrl + '/compaign/'+id);
  }

  delete(id){
    return this.http.delete(this.baseUrl + '/compaign/'+id);
  }

  edit(data){
    return this.http.post(this.baseUrl + '/compaign/update/',data);
  }

}
