import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { AppState } from "../redux/appState";

export const ReportList = () => {
  const reports = useSelector((state: AppState) => state.reports);
  const navigate = useNavigate();

  const handleNavigate = (id: string) => {
    navigate(`/report/${id}`);
  };

  return (
    <div className="p-4 shadow-md border-2 border-gray-200">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="text-left">Report name</th>
            <th className="text-left">Report Schedule</th>
            <th className="text-left">Last edited date</th>
            <th className="text-left">Status</th>
            <th className="text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report, index) => (
            <tr key={index} className="border-t">
              <td>{report.name}</td>
              <td>{report.schedule}</td>
              <td>{report.lastEdited}</td>
              <td className={report.status === "Expired" ? "text-red-500" : ""}>
                {report.status}
              </td>
              <td>
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                  onClick={() => handleNavigate(report.id.toString())}
                >
                  {" "}
                  &gt;
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
