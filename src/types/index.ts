export interface AppState {
  reportTemplates: ReportTemplateType[];
  currentReportId: string;
  reports: Report[];
}

export interface ReportTemplateType {
  id: string;
  name: string;
  description: string;
}

export interface Report {
  id: string;
  name: string;
  schedule: string;
  lastEdited: string;
  status: string;
  fields: Field[];
  reportData: object[];
  statementCycle: string;
}

export interface Field {
  id: string;
  label: string;
  visible: boolean;
}
