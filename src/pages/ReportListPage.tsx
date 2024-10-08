import { useSelector } from "react-redux";
import { Header } from "../components/Header";
import { Menu } from "../components/Menu";
import { ReportTemplateList } from "../components/ReportTemplateList";
import { ReportList } from "../components/ReportList";
import { AppState } from "../types";
import { IconArea } from "../components/IconArea";

export const ReportListPage = () => {
  const reportTemplates = useSelector(
    (state: AppState) => state.reportTemplates
  );

  const handleSelectReportTemplate = (reportId: string) => {
    console.log(`Selected report ID: ${reportId}`);
    // further actions...
  };

  return (
    <div>
      <Header />
      <Menu />
      <div className="flex">
        <IconArea />
        <div className="flex-1 p-8">
          <h1 className="text-2xl font-bold mb-4">Data Extractor</h1>
          <ReportTemplateList
            reportTemplates={reportTemplates}
            handleSelectReportTemplate={handleSelectReportTemplate}
          />
          <ReportList />
        </div>
      </div>
    </div>
  );
};

export default ReportListPage;
