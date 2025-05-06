
import Header from "@/components/layout/Header";
import DashboardCards from "@/components/dashboard/DashboardCards";
import RecentActivities from "@/components/dashboard/RecentActivities";

const Dashboard = () => {
  return (
    <div className="flex-1 overflow-y-auto">
      <Header title="Tableau de bord" />
      
      <main className="p-6">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Bienvenue sur MEILLEURE SANTE CRM</h2>
          <p className="text-gray-600">
            Gérez vos prospects, suivez vos performances et boostez vos ventes dans le secteur de la santé.
          </p>
        </div>
        
        <DashboardCards />
        <RecentActivities />
      </main>
    </div>
  );
};

export default Dashboard;
