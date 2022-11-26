import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //private baseURL: string = "https://localhost:7131"
  baseApiUrl: string = environment.baseApiUrl;
  
  constructor(private http : HttpClient, private router: Router) { } 

  signUp(userObj:any){ 
    return this.http.post<any>(this.baseApiUrl + '/api/User/register',userObj);
  }

  signOut(){
     localStorage.clear();
     this.router.navigate(['login']);
  }

  login(loginObj:any){
    return this.http.post<any>(this.baseApiUrl + '/api/User/authenticate',loginObj);
  }

  storeToken(tokenValue : string){
    localStorage.setItem('token',tokenValue)
  }

  getToken(){
    return localStorage.getItem('token')
  }

  isLoggedIn():boolean{
    return !!localStorage.getItem('token')
  }


}
