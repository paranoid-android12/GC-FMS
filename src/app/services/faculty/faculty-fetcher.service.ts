import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { CommunityExtension } from '../Interfaces/community-extension';
import { mainPort } from '../../app.component';
import { Profile } from '../Interfaces/profile';
import { schedule } from '../admin/schedule';

@Injectable({
  providedIn: 'root'
})
export class FacultyFetcherService {
  constructor(private http: HttpClient, private auth: AuthService) { }

  //Fetches cookie tokem
  getHeader(){
    return  new HttpHeaders().set("Authorization", "Bearer " + this.auth.getToken());
  }

  //All fetch commands for faculty
  fetchCommex(){
    return this.http.get<CommunityExtension[]>(mainPort + '/GC-FaMS-API/API/getcommex/fetchCommex', {headers:this.getHeader()});
  }

  fetchSchedDay(){
    return this.http.get<schedule[]>(mainPort + '/GC-FaMS-API/API/getschedules/fetchFaculty', {headers:this.getHeader()});
  }

  fetchProfile(){
    return this.http.get<Profile>(mainPort + '/GC-FaMS-API/API/getprofile/fetchProfile', {headers:this.getHeader()});
  }
}