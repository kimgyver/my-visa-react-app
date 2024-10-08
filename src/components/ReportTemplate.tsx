import { ReportTemplateType } from "../types";

interface ReportTemplateProps {
  reportTemplate: ReportTemplateType;
  onSelect: (reportId: string) => void;
}

export const ReportTemplate: React.FC<ReportTemplateProps> = ({
  reportTemplate,
  onSelect
}) => {
  return (
    <div
      className="p-4 shadow-md border-2 border-gray-200 flex flex-col"
      style={{ width: "250px" }}
    >
      <h2 className="text-xl font-bold mb-2 text-center">
        {reportTemplate.name}
      </h2>
      <p className="text-gray-500 mb-4 text-center">
        {reportTemplate.description}
      </p>
      <div className="flex justify-center w-full">
        <button
          onClick={() => onSelect(reportTemplate.id)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Use it
        </button>
      </div>
    </div>
  );
};
