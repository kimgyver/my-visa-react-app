import { AppState } from "../types";

const initialState: AppState = {
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
      ],
      statementCycle: "yesterday"
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
      ],
      statementCycle: "last2weeks"
    }
  ]
};

export default initialState;
