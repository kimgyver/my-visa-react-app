import { useSelector } from "react-redux";
import { AppState } from "../redux/appState";

interface ReportTableProps {
  fields: { id: string; label: string }[];
}

export const ReportFieldsTable: React.FC<ReportTableProps> = ({ fields }) => {
  const currentReportId = useSelector(
    (state: AppState) => state.currentReportId
  );
  const reports = useSelector((state: AppState) => state.reports);
  const report = reports.find(report => report.id === currentReportId);

  return (
    <table className="table-auto w-full mt-4">
      <thead>
        <tr>
          {fields.map(field => (
            <th key={field.id} className="px-4 py-2 border">
              {field.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {report &&
          report.reportData &&
          report.reportData.map((row, index) => (
            <tr key={index}>
              {fields.map(field => (
                <td key={field.id} className="px-4 py-2 border">
                  {row[field.id as keyof typeof row]}
                </td>
              ))}
            </tr>
          ))}
      </tbody>
    </table>
  );
};
