import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import store from "./redux/store";
import "./index.css";
import ReportListPage from "./pages/ReportListPage";
import ReportPage from "./pages/ReportPage";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <Router>
          <Routes>
            <Route path="/reportList" element={<ReportListPage />} />
            <Route path="/report/:id" element={<ReportPage />} />
          </Routes>
        </Router>
      </DndProvider>
    </Provider>
  </React.StrictMode>
);
