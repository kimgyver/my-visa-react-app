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
  fields: object;
  reportData: object[];
}

export interface AppState {
  counter: number;
  items: string[];
  reportTemplates: ReportTemplateType[];
  currentReportId: string;
  reports: Report[];
}

interface Field {
  id: string;
  label: string;
  visible: boolean;
}

const initialState: AppState = {
  counter: 0,
  items: [],
  reportTemplates: [
    {
      id: "1",
      name: "Spend Report",
      description:
        "This report is designed to analyze your company’s transactions."
    },
    {
      id: "2",
      name: "Monthly Transactions",
      description: "Detailed report of all transactions for the month."
    },
    {
      id: "3",
      name: "Employee Details",
      description: "Information about all employees in company unit 1409."
    }
  ],
  currentReportId: "1",
  reports: [
    {
      id: "1",
      name: "Employees transactions monthly report",
      schedule: "Daily",
      lastEdited: "Apr 20, 2024",
      status: "Expired",
      fields: [
        { id: "supplierName", label: "Supplier name", visible: true },
        { id: "sourceAmount", label: "Source Amount", visible: true },
        {
          id: "sourceCurrencyCode",
          label: "Source Currency Code",
          visible: true
        },
        { id: "billingAmount", label: "Billing Amount", visible: true },
        { id: "cardholderName", label: "Cardholder name", visible: true },
        { id: "postingDate", label: "Posting date", visible: true }
      ],
      reportData: [
        {
          supplierName: "Supplier A",
          sourceAmount: "999.00 USD",
          sourceCurrencyCode: "ISO 4217",
          billingAmount: "999.00 USD",
          cardholderName: "Matthew Lina",
          postingDate: "11/25/2022"
        },
        {
          supplierName: "Supplier B",
          sourceAmount: "999.00 USD",
          sourceCurrencyCode: "ISO 4217",
          billingAmount: "999.00 USD",
          cardholderName: "Matthew Lina",
          postingDate: "11/25/2022"
        }
      ]
    },
    {
      id: "2",
      name: "Employee details for company unit: 1409",
      schedule: "Weekly",
      lastEdited: "May 1, 2024",
      status: "",
      fields: [
        { id: "postingDate", label: "Posting date", visible: true },
        { id: "supplierName", label: "Supplier name", visible: true },
        { id: "sourceAmount", label: "Source Amount", visible: true },
        {
          id: "sourceCurrencyCode",
          label: "Source Currency Code",
          visible: true
        },
        { id: "billingAmount", label: "Billing Amount", visible: true },
        { id: "cardholderName", label: "Cardholder name", visible: true }
      ],
      reportData: [
        {
          supplierName: "Supplier C",
          sourceAmount: "999.00 USD",
          sourceCurrencyCode: "ISO 4217",
          billingAmount: "999.00 USD",
          cardholderName: "Matthew Lina",
          postingDate: "11/25/2022"
        },
        {
          supplierName: "Supplier D",
          sourceAmount: "999.00 USD",
          sourceCurrencyCode: "ISO 4217",
          billingAmount: "999.00 USD",
          cardholderName: "Matthew Lina",
          postingDate: "11/25/2022"
        }
      ]
    }
  ]
};

// Action types
const REPORTS_SET_REPORT_CURRENT_ID = "REPORTS/SET_CURRENT_REPORT_ID";
const REPORTS_UPDATE_NAME = "REPORTS/UPDATE_NAME";
const REPORTS_UPDATE_FIELDS = "REPORTS/UPDATE_FIELDS";
const INCREMENT = "counter/increment";
const ADD_ITEM = "items/addItem";
const RESET = "counter/reset";

export const appReducer = (
  state: AppState = initialState,
  action: {
    type: string;
    payload: { reportId: string; fields: Field[]; name: string };
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
    case INCREMENT:
      return { ...state, counter: state.counter + 1 };
    case ADD_ITEM:
      return { ...state, items: [...state.items, action.payload || ""] };
    case RESET:
      return initialState;
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

export const reportUpdateFields = (reportId: string, fields: Field[]) => ({
  type: REPORTS_UPDATE_FIELDS,
  payload: { reportId, fields }
});

export const increment = () => ({ type: INCREMENT });
export const addItem = (item: string) => ({ type: ADD_ITEM, payload: item });
export const reset = () => ({ type: RESET });
