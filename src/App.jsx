import { useState } from "react";
import Layout from "./layout/Layout";
import OverviewPage from "./pages/OverviewPage";
import OrdersPage from "./pages/OrdersPage";
import BillsPage from "./pages/BillsPage";
import ReconciliationPage from "./pages/ReconciliationPage";
import RevenuePage from "./pages/RevenuePage";

function App() {
  const [activeMenu, setActiveMenu] = useState("overview");

  return (
    <Layout activeMenu={activeMenu} onMenuChange={setActiveMenu}>
      {activeMenu === "overview" && <OverviewPage />}
      {activeMenu === "orders" && <OrdersPage />}
      {activeMenu === "bills" && <BillsPage />}
      {activeMenu === "reconciliation" && <ReconciliationPage />}
      {activeMenu === "revenue" && <RevenuePage />}
    </Layout>
  );
}

export default App;
