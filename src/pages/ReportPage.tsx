import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Header } from "../components/Header";
import { Menu } from "../components/Menu";
import { ReportFieldsTable } from "../components/ReportFieldsTable";
import { CustomiseFieldsModal } from "../components/CustomiseFieldsModal";
import {
  Report,
  AppState,
  setCurrentReportId,
  reportUpdateFields,
  reportUpdateName
} from "../redux/appState";

const ReportPage: React.FC = () => {
  const [isCustomiseModalOpen, setCustomiseModalOpen] = useState(false);
  const [reportName, setReportName] = useState("");
  const { id } = useParams();
  const reports = useSelector((state: AppState) => state.reports);
  const report = reports.find(report => report.id === id);
  const [fields, setFields] = useState(report?.fields);

  const dispatch = useDispatch();
  useEffect(() => {
    if (id) {
      dispatch(setCurrentReportId(id));
      const report = reports.find(
        (report: Report) => report.id.toString() === id?.toString()
      );
      setReportName(report?.name);
    }
  }, [id]);

  const toggleFieldVisibility = (fieldId: string) => {
    setFields(prevFields =>
      prevFields.map(field =>
        field.id === fieldId ? { ...field, visible: !field.visible } : field
      )
    );
  };

  const reorderFields = (newFields: object) => {
    setFields(newFields);
  };

  const currentReportId = useSelector(
    (state: AppState) => state.currentReportId
  );
  const handleSaveReport = () => {
    console.log("save");

    dispatch(reportUpdateFields(currentReportId, fields));
    dispatch(reportUpdateName(currentReportId, reportName));
  };

  const handleRunReport = () => {};

  return (
    <div>
      <Header />
      <div>
        <Menu />
        <div className="p-4">
          <h1 className="text-2xl font-bold">Spend Report</h1>
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

          <div className="mb-4">
            <div className="mb-4">
              <label className="block font-semibold">Report Name:</label>
              <input
                type="text"
                value={reportName}
                onChange={e => setReportName(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Enter report name"
              />
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
