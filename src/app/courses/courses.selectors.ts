import { Inject, Injectable } from "@angular/core";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CoursesState } from "./courses.reducers";

import * as fromCourses from "./courses.reducers";

export const selectCoursesState =
  createFeatureSelector<CoursesState>("courses");

export const selectAllCourses = createSelector(
  selectCoursesState,
  fromCourses.selectAll
);

export const selectBeginnerCourses = createSelector(
  selectAllCourses,
  (courses) => courses.filter((c) => c.category === "ADVANCED")
);

export const selectAdvanceCourses = createSelector(
  selectAllCourses,
  (courses) => courses.filter((c) => c.category === "ADVANCED")
);

export const selectPromoTotal = createSelector(
  selectAllCourses,
  (courses) => courses.filter((c) => c.promo).length
);


export const areCoursesLoaded = createSelector(
  selectCoursesState,
  (state) => state.coursesIsLoaded
)