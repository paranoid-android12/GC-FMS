import { Component, OnInit } from '@angular/core';
import { CommunityExtension } from '../../services/Interfaces/community-extension';
import { OtherCommexComponent } from './other-commex/other-commex.component';
import { CommonModule, NgFor, SlicePipe } from '@angular/common';
import { FacultyFetcherService } from '../../services/faculty/faculty-fetcher.service';
import { mainPort } from '../../app.component';

@Component({
  selector: 'app-community-extensions',
  standalone: true,
  imports: [OtherCommexComponent, NgFor, SlicePipe, CommonModule],
  templateUrl: './community-extensions.component.html',
  styleUrl: './community-extensions.component.css'
})
export class CommunityExtensionsComponent{
  tempPort = mainPort;
  commexs: CommunityExtension[] = [];
  min: number = 100;
  max: number = 250;

  constructor(private facultyService: FacultyFetcherService){
    this.getCommex();
  }

  getCommex():void {
    this.facultyService.fetchCommex().subscribe((next) => {
      this.commexs = next;
      this.dateSorter();
      this.commexs.forEach(this.parseImageLink);
    }, (error) => {
      console.log(error);
    });
  }

  //Adds mainPort to all header image links.
  parseImageLink(i: CommunityExtension){
    i.commex_header_img = mainPort + i.commex_header_img;
  }

  dateSorter(){
    this.commexs.sort(function(a, b){
      return new Date(b.commex_date).valueOf() - new Date(a.commex_date).valueOf();
    })
    console.log(this.commexs);
  }
}
