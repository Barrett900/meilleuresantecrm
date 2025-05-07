
import { useState } from "react";
import Header from "@/components/layout/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TimeStatusOverview from "@/components/time-tracking/TimeStatusOverview";
import AgentTimesheet from "@/components/time-tracking/AgentTimesheet";
import TimeReports from "@/components/time-tracking/TimeReports";

const TimeManagement = () => {
  return (
    <div className="flex-1 overflow-y-auto">
      <Header title="Gestion du temps" />
      
      <main className="p-6">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Suivi du temps de travail des agents</h2>
          <p className="text-gray-600">
            Visualisez et gérez les heures de travail, les pauses et les analyses de temps.
          </p>
        </div>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="timesheets">Feuilles de temps</TabsTrigger>
            <TabsTrigger value="reports">Rapports</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <TimeStatusOverview />
          </TabsContent>
          
          <TabsContent value="timesheets">
            <AgentTimesheet />
          </TabsContent>
          
          <TabsContent value="reports">
            <TimeReports />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default TimeManagement;
