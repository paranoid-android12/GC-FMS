import { createSelector, createFeatureSelector } from "@ngrx/store";
import { DeanState } from "./dean-state.reducer";

export const selectDeanState = createFeatureSelector<DeanState>('dean');

export const selectCollegeFaculty = createSelector(
  selectDeanState,
  (state: DeanState) => state.profile
);

export const selectAllCollegeEduc = createSelector(
    selectDeanState,
    (state: DeanState) => state.educs
);

export const selectAllExistCerts = createSelector(
    selectDeanState,
    (state: DeanState) => state.certs
);

export const selectCourseSched = createSelector(
    selectDeanState,
    (state: DeanState) => state.courses[0]
);

export const selectCourses = createSelector(
    selectDeanState,
    (state: DeanState) => state.courses[1]
);


export const selectAllExp = createSelector(
    selectDeanState,
    (state: DeanState) => state.exps
);

export const selectAllProj = createSelector(
    selectDeanState,
    (state: DeanState) => state.proj
);

export const selectAllExpertise = createSelector(
    selectDeanState,
    (state: DeanState) => state.expertises
);

export const selectAllEvaluation = createSelector(
    selectDeanState,
    (state: DeanState) => state.evals
);

export const selectCollegeCommex = createSelector(
    selectDeanState,
    (state: DeanState) => state.commex
);
          