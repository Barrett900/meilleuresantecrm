
import { useState } from "react";
import Header from "@/components/layout/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AgentManagement from "@/components/admin/AgentManagement";
import AgentPerformance from "@/components/admin/AgentPerformance";
import ImportData from "@/components/admin/ImportData";

const Admin = () => {
  return (
    <div className="flex-1 overflow-y-auto">
      <Header title="Administration" />
      
      <main className="p-6">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Gestion Admin</h2>
          <p className="text-gray-600">
            Gérez vos agents, suivez leurs performances et importez des données.
          </p>
        </div>
        
        <Tabs defaultValue="agents" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="agents">Agents</TabsTrigger>
            <TabsTrigger value="performance">Performances</TabsTrigger>
            <TabsTrigger value="import">Importer des données</TabsTrigger>
          </TabsList>
          
          <TabsContent value="agents">
            <AgentManagement />
          </TabsContent>
          
          <TabsContent value="performance">
            <AgentPerformance />
          </TabsContent>
          
          <TabsContent value="import">
            <ImportData />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
