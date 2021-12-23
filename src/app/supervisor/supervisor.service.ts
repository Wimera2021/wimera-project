import { Injectable } from '@angular/core';
import { forkJoin, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SupervisorService {
  constructor(private http: HttpClient, public router: Router) {}
  private activity: any = [];
  private activitiesUpdated = new Subject<any[]>();
  public currentUser;

  getactivities() {
    console.log('Get activities called!');
    this.http
      .get<{ message: string; activities: any }>(
        'http://localhost:3000/api/supervisor/getactivities'
      )
      .pipe(
        map((data) => {
          console.log('Activity: ', data.activities);
          console.log('Data: ', data);
          return data.activities;
        })
      )
      .subscribe((data) => {
        this.activity = data;
        this.activitiesUpdated.next([...this.activity]);
      });
  }

  getActivitiesUpdatedListener() {
    return this.activitiesUpdated.asObservable();
  }

  updateStatus(id, val) {
    this.http
      .put('http://localhost:3000/api/supervisor/' + id, {
        status: val,
      })
      .subscribe((res) => {
        const updatedActivities = [...this.activity];
        const oldUpdateIndex = updatedActivities.findIndex((m) => id == m._id);
        updatedActivities[oldUpdateIndex].status = val;
        console.log('Updated Activities: ', updatedActivities);
        this.activity = updatedActivities;
        console.log('Before update :', this.activity);
        this.activitiesUpdated.next([...this.activity]);
        console.log(this.activitiesUpdated);
      });
  }
}
