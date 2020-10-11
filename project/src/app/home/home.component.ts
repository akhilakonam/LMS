import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {MatExpansionModule} from '@angular/material/expansion';
export {MatExpansionModule}
declare var require: any
@Component({ templateUrl: 'home.component.html',
            styleUrls: ['home.css'] })
export class HomeComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router  ) {}

  hidden = true; ascending = false; descending = true;
  panelOpenState1 = false; panelOpenState2 = false; panelOpenState3 = false; panelOpenState4 = false;
  studentName = ""; classID = ""; total = ""; maxMarks = "";

  classRooms = []; data = []; timetables = []; assignments = [];
  tests = []; notices = []; weeklyTable = []; studentList = []; scores = {};

  ngOnInit(){
    let jsondata = require('./homeData.json');
    let studentMobile = "";

    this.data = jsondata.classRooms;
    this.classID = this.data[0].classRoomID;

    this.route.params.subscribe(event => {
        studentMobile = event.id;
     });

    this.studentName = jsondata.students.find((stu)=>{
        return stu.mobileNumber === studentMobile;
    }).name;

    this.studentList = jsondata.students.filter((stu)=>{
        return stu.mobileNumber != studentMobile;
    });

    this.scores = jsondata.scoreCard.scorebySubject;
    this.total = jsondata.scoreCard.scorebySubject.reduce(function (acc, obj){
      return acc + parseInt(obj.marks);
    }, 0);
    this.maxMarks = jsondata.scoreCard.totalMarks;

    //let currDay = new Date().toLocaleDateString("en-IN", {weekday: 'long'});
    //let currDate = new Date().toLocaleString();
    let currDay = 'Saturday';
    let currDate = '10/10/2020';

    this.data.forEach((classRoom)=>{
        classRoom.timetable.map((schedule)=>{
          if(schedule.dayOfTheWeek === currDay){
            this.timetables.push({"name":classRoom.name, "subject":classRoom.subject, "from":schedule.from, "to":schedule.to});
          }
        });
    });

    this.data.forEach((classRoom)=>{
      this.classRooms.push({"name": classRoom.name,
                            "classID": classRoom.classRoomID,
                            "subject": classRoom.subject,
                            "teacherName": classRoom.teacherName,
                            "noOfStudents": classRoom.students.length,
                            "noOfClassesPerWeek": classRoom.timetable.length
                          });
    });

    this.data.forEach((classRoom)=>{
      classRoom.assignment.map((test)=>{
          if(test.testDate.includes(currDate)){
            this.assignments.push({
              "subject": classRoom.subject,
              "topic": test.topic,
              "start": test.testDate.slice(currDate.length + 1),
              "end": test.testSubmissionDate.slice(currDate.length + 1),
              "duration": test.testDuration,
              "description": test.description,
              "maxMarks": test.Maxmarks
            });
          }
      });
    });

    this.data.forEach((classRoom)=>{
      classRoom.test.map((t)=>{
          if(t.testDate.includes(currDate)){
            this.tests.push({
              "subject": classRoom.subject,
              "topic": t.topic,
              "start": t.testDate.slice(currDate.length + 1),
              "end": t.testSubmissionDate.slice(currDate.length + 1),
              "duration": t.testDuration,
              "description": t.description,
              "maxMarks": t.Maxmarks
            });
          }
      });
    });
    if(this.tests.length === 0){
      this.hidden = false;
    }

    this.notices = this.data[0].noticeBoard;
    this.weeklyTable = this.data[0].timetable;
  }

  onLogout(e){
    setTimeout(()=>{
      this.router.navigate(['/login']);
    }, 2000)
  }

  getSortedClassRooms(order){
    if(order == "ascend"){
      this.classRooms.sort(function(o1, o2){
        return (o1.subject.localeCompare(o2.subject));
      });
      this.ascending = !this.ascending;
      this.descending = !this.descending;
    }
    else{
      this.classRooms.sort(function(o1, o2){
        return (o2.subject.localeCompare(o1.subject));
      });
      this.descending = !this.descending;
      this.ascending = !this.ascending;
    }
  }

  getClassRoomDetails(classRoomId){
    let classRoom = this.data.filter((c)=>{
      return(c.classRoomID === classRoomId );
    });
    this.notices = classRoom[0].noticeBoard;
    this.weeklyTable = classRoom[0].timetable;
  }
}
