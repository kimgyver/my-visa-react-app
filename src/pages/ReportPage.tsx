import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Header } from "../components/Header";
import { Menu } from "../components/Menu";
import { Back } from "../components/back";
import { ReportFieldsTable } from "../components/ReportFieldsTable";
import { CustomiseFieldsModal } from "../components/CustomiseFieldsModal";
import { Report, AppState, Field } from "../types";
import {
  setCurrentReportId,
  reportUpdateFields,
  reportUpdateName,
  reportUpdateStatementCycle
} from "../redux/appState";
import { hasStateChanged } from "../redux/utils";
import { IconArea } from "../components/IconArea";

const ReportPage: React.FC = () => {
  const [isCustomiseModalOpen, setCustomiseModalOpen] = useState(false);
  const [reportName, setReportName] = useState("");
  const [statementCycle, setStatementCycle] = useState("yesterday");
  const { id } = useParams();
  const currentReportId = id || "";
  const reports = useSelector((state: AppState) => state.reports);
  const report = reports.find(report => report.id === id);
  const [fields, setFields] = useState(report?.fields || []);

  const dispatch = useDispatch();
  useEffect(() => {
    if (id) {
      dispatch(setCurrentReportId(id));
      const report = reports.find(
        (report: Report) => report.id.toString() === id?.toString()
      );
      if (report) {
        setReportName(report?.name);
        setStatementCycle(report?.statementCycle);
      }
    }
  }, [id]);

  const toggleFieldVisibility = (fieldId: string) => {
    setFields(prevFields =>
      prevFields.map(field =>
        field.id === fieldId ? { ...field, visible: !field.visible } : field
      )
    );
  };

  const reorderFields = (newFields: Field[]) => {
    setFields(newFields);
  };

  const handleSaveReport = () => {
    if (
      !hasStateChanged(report, {
        ...report,
        fields,
        name: reportName,
        statementCycle
      })
    ) {
      console.log("No changes");
    }

    if (hasStateChanged(report?.fields, fields)) {
      dispatch(reportUpdateFields(currentReportId, fields));
      console.log("fields change saved");
    }
    if (hasStateChanged(report?.name, reportName)) {
      dispatch(reportUpdateName(currentReportId, reportName));
      console.log("name change saved");
    }
    if (hasStateChanged(report?.statementCycle, statementCycle)) {
      dispatch(reportUpdateStatementCycle(currentReportId, statementCycle));
      console.log("statementCycle change saved");
    }
  };

  const handleRunReport = () => {};

  return (
    <div>
      <Header />
      <Menu />
      <div className="flex">
        <IconArea />
        <div>
          <Back />
          <div className="p-4">
            <h1 className="text-2xl font-bold">{reportName}</h1>
            <ReportFieldsTable fields={fields.filter(field => field.visible)} />
            <button
              onClick={() => setCustomiseModalOpen(true)}
              className="mt-4 p-2 bg-blue-500 text-white"
            >
              Customise fields
            </button>

            {isCustomiseModalOpen && (
              <CustomiseFieldsModal
                fields={fields}
                onClose={() => setCustomiseModalOpen(false)}
                onToggleField={toggleFieldVisibility}
                onReorderFields={reorderFields}
              />
            )}

            <div className="flex justify-start mt-8 mb-8">
              <div className="mr-8">
                <label className="block font-semibold">Report Name:</label>
                <input
                  type="text"
                  value={reportName}
                  onChange={e => setReportName(e.target.value)}
                  className="p-2 w-[400px] border rounded"
                  placeholder="Enter report name"
                />
              </div>

              <div>
                <label className="block font-semibold">Statement Cycle:</label>
                <select
                  value={statementCycle}
                  onChange={e => setStatementCycle(e.target.value)}
                  className="p-2 border rounded"
                >
                  <option value="yesterday">Yesterday</option>
                  <option value="last3days">Last 3 days</option>
                  <option value="lastweek">Last week</option>
                  <option value="last2weeks">Last 2 weeks</option>
                  <option value="lastStatement">Last statement period</option>
                </select>
              </div>
            </div>

            <div className="flex justify-between">
              <div className="space-x-4">
                <button
                  onClick={handleSaveReport}
                  className="p-2 bg-green-500 text-white rounded"
                >
                  Save Report
                </button>
                <button
                  onClick={handleRunReport}
                  className="p-2 bg-blue-500 text-white rounded"
                >
                  Run Report
                </button>
              </div>
              <button
                onClick={handleRunReport}
                className="p-2 bg-blue-500 text-white rounded"
              >
                Options
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
