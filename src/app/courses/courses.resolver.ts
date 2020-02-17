import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { select, Store } from "@ngrx/store";
import { AppState } from "../reducers";
import { filter, finalize, first, tap } from "rxjs/operators";
import { loadAllCourses } from "./courses.actions";
import { areCoursesLoaded } from "./courses.selectors";

@Injectable()
export class CoursesResolver implements Resolve<any> {
  constructor(private store: Store<AppState>) {}
  loading = false;
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.pipe(
      select(areCoursesLoaded),
      tap((coursesIsLoaded) => {
        if (this.loading && !coursesIsLoaded) {
          this.store.dispatch(loadAllCourses());
        } 
      }),
      filter((coursesIsLoaded) => coursesIsLoaded),
      first(),
      finalize(() => (this.loading = true))
    );
  }
}
