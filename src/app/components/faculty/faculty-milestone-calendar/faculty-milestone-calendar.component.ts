import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { EducationalAttainment } from '../../../services/Interfaces/educational-attainment';
import { Certifications } from '../../../services/Interfaces/certifications';
import { IndustryExperience } from '../../../services/Interfaces/industry-experience';
import { Project } from '../../../services/Interfaces/project';
import { Expertise } from '../../../services/Interfaces/expertise';
import { CommunityExtension } from '../../../services/Interfaces/community-extension';
import { FacultyRequestService } from '../../../services/faculty/faculty-request.service';
import { forkJoin, map } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { selectAllCollegeEduc } from '../../../state/dean-state/dean-state.selector';
import { getCollegeCommex } from '../../../state/commex/commex.action';
import { parsedCollegeCommexSelector } from '../../../state/commex/commex.selector';

//Event object to display on hover
interface Event {
  eventType: string;
  eventName: string;
  eventPlace?: string;
}

@Component({
  selector: 'app-faculty-milestone-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faculty-milestone-calendar.component.html',
  styleUrl: './faculty-milestone-calendar.component.css'
})


export class FacultyMilestoneCalendarComponent implements OnInit{
  @Input() type: string = '';
  educAttainment!: EducationalAttainment[];
  certifications!: Certifications[];
  industryExp!: IndustryExperience[];
  projects!: Project[];
  commex!: CommunityExtension[];

  daysOfYear: (Date | any)[][] = [];
  startDate = new Date(2024, 0, 1)
  endDate = new Date(2024, 11, 31);
  delay = true;
  showCard = false;
  currentDate = new Date(this.startDate);
  commexCollegeStore: any;


  ngOnInit(): void {
    if(this.type === 'faculty'){

    }
    else{
        //         this.certifications.forEach((cert) => { this.addEvent(new Date(cert.accomplished_date), this.eventParser("Certification", cert.cert_name, cert.cert_corporation)) });
  //         this.educAttainment.forEach((educ) => { this.addEvent(new Date(educ.year_end), this.eventParser("Educational Attainment", educ.educ_title, educ.educ_school)) });
  //         this.projects.forEach((proj) => { this.addEvent(new Date(proj.project_date), this.eventParser("Project", proj.project_name, "")) });
  //         this.commex.forEach((comm) => { this.addEvent(new Date(comm.commex_date), this.eventParser("Community Extension", comm.commex_title, "")) });
      this.store.select(selectAllCollegeEduc).subscribe(data => {
        data.forEach(educ => 
          this.addEvent(new Date(educ.year_end), this.eventParser("Educational Attainment", educ.educ_title, educ.educ_school)))
      });
      let commexs$ = this.commexCollegeStore.pipe(select(parsedCollegeCommexSelector))
      commexs$.subscribe((data: any) => {
        console.log("LOL: " + data);
      })


      
      // .pipe(map((data: EducationalAttainment[]) => data.forEach(educ => this.addEvent(new Date(educ.year_end), this.eventParser("Educational Attainment", educ.educ_title, educ.educ_school)))))
    }
  }

  //Creates a 52-week formatted calendar of all dates in the current year.
  constructor(
    private facultyService: FacultyRequestService,
    public store: Store) {
    this.calendarBuild();
    // this.getMilestones();
  }

  eventParser(type: string, name: string, place: string) {
    const temp = {} as Event;

    temp.eventType = type;
    temp.eventName = name;
    temp.eventPlace = place;

    return temp;
  }

  //Add given event to calendar
  addEvent(givenDate: Date, eventData: Event) {
    let wIdx = 0;

    this.daysOfYear.forEach((week) => {
      let dIdx = 0;
      week.forEach((day) => {
        const dayG = new Date(givenDate).toLocaleDateString("en-US");
        const dayN = new Date(day).toLocaleDateString("en-US");
        if (dayG == dayN) {
          this.daysOfYear[wIdx][dIdx][1] = eventData;
          return;
        }
        dIdx++;
      })
      wIdx++;
    })
  }

  //Builds calendar
  calendarBuild() {
    //Iterates through each week
    while (this.currentDate <= this.endDate) {
      const week: (Date | any)[] = [];

      //Iterates through 7 days of current week
      for (let i = 0; i < 7; i++) {
        //Initial gate so each week always has first sunday
        if (this.delay == true && this.currentDate.getDay() != i) {
          week.push([new Date(""), ""]);
          continue;
        }
        else {
          this.delay = false;
        }

        //Push current week array to 2d array
        week.push([new Date(this.currentDate), ""]);

        //Replace current date to first day of next week (while loop now iterates each wek)
        this.currentDate.setDate(this.currentDate.getDate() + 1);
      }
      this.daysOfYear.push(week);
    }
    console.log(this.daysOfYear);
  }
}
