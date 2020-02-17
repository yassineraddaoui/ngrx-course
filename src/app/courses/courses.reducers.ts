import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { Course } from "./model/course";
import { initialAuthState } from "../auth/reducers";
import { CourseAction } from "./action-types";
import { createReducer, on } from "@ngrx/store";

export interface CoursesState extends EntityState<Course> {
  coursesIsLoaded: boolean;
}

export const adapter = createEntityAdapter<Course>();

export const initialCoursesState = adapter.getInitialState({
  coursesIsLoaded: false,
});

export const coursesReducer = createReducer(
  initialCoursesState,
  on(CourseAction.allCoursesLoaded, (state, action) =>
    adapter.addMany(action.courses, { ...state, coursesIsLoaded: true })
  )
);

export const { selectAll } = adapter.getSelectors();
