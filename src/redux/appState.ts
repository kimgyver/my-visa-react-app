import initialState from "./initialState";
import { AppState, Field } from "../types";

// Action types
const REPORTS_SET_REPORT_CURRENT_ID = "REPORTS/SET_CURRENT_REPORT_ID";
const REPORTS_UPDATE_NAME = "REPORTS/UPDATE_NAME";
const REPORTS_UPDATE_FIELDS = "REPORTS/UPDATE_FIELDS";
const REPORTS_UPDATE_STATEMENT_CYCLE = "REPORTS/UPDATE_STATEMENT_CYCLE";

export const appReducer = (
  state: AppState = initialState,
  action: {
    type: string;
    payload: {
      reportId: string;
      fields: Field[];
      name: string;
      statementCycle: string;
    };
  }
) => {
  switch (action.type) {
    case REPORTS_SET_REPORT_CURRENT_ID:
      return { ...state, currentReportId: action.payload.reportId };
    case REPORTS_UPDATE_NAME:
      return {
        ...state,
        reports: state.reports.map(report =>
          report.id === action.payload.reportId
            ? {
                ...report,
                name: action.payload.name
              }
            : report
        )
      };
    case REPORTS_UPDATE_STATEMENT_CYCLE:
      return {
        ...state,
        reports: state.reports.map(report =>
          report.id === action.payload.reportId
            ? {
                ...report,
                statementCycle: action.payload.statementCycle
              }
            : report
        )
      };
    case REPORTS_UPDATE_FIELDS:
      return {
        ...state,
        reports: state.reports.map(report =>
          report.id === action.payload.reportId
            ? {
                ...report,
                fields: action.payload.fields
              }
            : report
        )
      };
    default:
      return state;
  }
};

// Action creators
export const setCurrentReportId = (reportId: string) => ({
  type: REPORTS_SET_REPORT_CURRENT_ID,
  payload: { reportId }
});

export const reportUpdateName = (reportId: string, name: string) => ({
  type: REPORTS_UPDATE_NAME,
  payload: { reportId, name }
});

export const reportUpdateStatementCycle = (
  reportId: string,
  statementCycle: string
) => ({
  type: REPORTS_UPDATE_STATEMENT_CYCLE,
  payload: { reportId, statementCycle }
});

export const reportUpdateFields = (reportId: string, fields: Field[]) => ({
  type: REPORTS_UPDATE_FIELDS,
  payload: { reportId, fields }
});
