import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppState } from "../types";

export const ReportList = () => {
  const reports = useSelector((state: AppState) => state.reports);
  const navigate = useNavigate();

  const handleNavigate = (id: string) => {
    navigate(`/report/${id}`);
  };

  return (
    <table className="mt-4 min-w-full">
      <thead>
        <tr>
          <th className="text-left px-4 py-2 border">Report name</th>
          <th className="text-left px-4 py-2 border">Report Schedule</th>
          <th className="text-left px-4 py-2 border">Last edited date</th>
          <th className="text-left px-4 py-2 border">Status</th>
          <th className="text-left px-4 py-2 border">Action</th>
        </tr>
      </thead>
      <tbody>
        {reports.map((report, index) => (
          <tr key={index} className="border-t">
            <td className="px-4 py-2 border">{report.name}</td>
            <td className="px-4 py-2 border">{report.schedule}</td>
            <td className="px-4 py-2 border">{report.lastEdited}</td>
            <td
              className={`px-4 py-2 border ${
                report.status === "Expired" ? "text-red-500" : ""
              }`}
            >
              {report.status}
            </td>
            <td className="px-4 py-2 border">
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded"
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
  );
};
