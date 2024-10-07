import { Header } from "../components/Header";
import { Menu } from "../components/Menu";
import { ReportTemplateList } from "../components/ReportTemplateList";
import { ReportList } from "../components/ReportList";
import { useSelector } from "react-redux";
import { AppState } from "../redux/appState";

export const ReportListPage = () => {
  const reportTemplates = useSelector(
    (state: AppState) => state.reportTemplates
  );

  const handleSelectReportTemplate = (reportId: number) => {
    console.log(`Selected report ID: ${reportId}`);
    // further actions...
  };

  return (
    <div>
      <Header />
      <div>
        <Menu />
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
