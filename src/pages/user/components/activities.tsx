import { useState } from "react";
import { HistoryPageProps } from "../../../models";
import ListsHistoryPage from "../../lists_history_page";
import ListHistoryBHYT from "../../bhyt/list_history_bhyt_page";
import HistoryPage from "../../history_page";

const Activities: React.FunctionComponent<HistoryPageProps> = () => {
  const [currentPage, setCurrentPage] = useState("history");
  return (
    <div className="w-full">
      {currentPage === "collaborators" && (
        <ListsHistoryPage onBack={() => setCurrentPage("history")} />
      )}
      {currentPage === "bhyt" && (
        <ListHistoryBHYT onBack={() => setCurrentPage("history")} />
      )}
      {currentPage === "history" && (
        <HistoryPage
          onViewCollaborators={() => setCurrentPage("collaborators")}
          onViewBHYT={() => setCurrentPage("bhyt")}
        />
      )}
    </div>
  );
};

export default Activities;
