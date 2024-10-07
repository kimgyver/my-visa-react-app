import { ReportTemplate } from "./ReportTemplate";
import { ReportTemplateType } from "../redux/appState";

interface ReportTemplateProps {
  reportTemplates: readonly ReportTemplateType[];
  handleSelectReportTemplate: (reportId: string) => void;
}

export const ReportTemplateList: React.FC<ReportTemplateProps> = ({
  reportTemplates,
  handleSelectReportTemplate
}) => {
  return (
    <div className="flex space-x-8 mb-6 p-4 shadow-md border-2 border-gray-200">
      {reportTemplates.map(reportTemplate => (
        <ReportTemplate
          key={reportTemplate.id}
          reportTemplate={reportTemplate}
          onSelect={handleSelectReportTemplate}
        />
      ))}
    </div>
  );
};
