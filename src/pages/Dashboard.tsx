
import Header from "@/components/layout/Header";
import DashboardCards from "@/components/dashboard/DashboardCards";
import RecentActivities from "@/components/dashboard/RecentActivities";

const Dashboard = () => {
  return (
    <div className="flex-1 overflow-y-auto">
      <Header title="Tableau de bord" />
      
      <main className="p-6">
        <DashboardCards />
        <RecentActivities />
      </main>
    </div>
  );
};

export default Dashboard;
