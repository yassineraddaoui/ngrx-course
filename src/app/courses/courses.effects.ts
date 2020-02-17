import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CourseAction } from "./action-types";
import { CoursesHttpService } from "./services/courses-http.service";
import { concatMap, map } from "rxjs/operators";
import { allCoursesLoaded } from "./courses.actions";
import { courseUpdated } from "./courses.actions";
@Injectable()
export class CoursesEffect {
  constructor(
    private actions$: Actions,
    private coursesHttp: CoursesHttpService
  ) {}

  loadCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseAction.loadAllCourses),
      concatMap((action) => this.coursesHttp.findAllCourses()),
      map((courses) => allCoursesLoaded({ courses }))
    )
  );
  saveCourse$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(courseUpdated),
        concatMap((action) =>
          this.coursesHttp.saveCourse(action.id, action.changes)
        )
      ),
    { dispatch: false }
  );
}
