
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

// Mock data pour les graphiques
const weeklyData = [
  { day: 'Lundi', heuresTravaillées: 37.5, objectif: 40 },
  { day: 'Mardi', heuresTravaillées: 39.2, objectif: 40 },
  { day: 'Mercredi', heuresTravaillées: 36.8, objectif: 40 },
  { day: 'Jeudi', heuresTravaillées: 40.5, objectif: 40 },
  { day: 'Vendredi', heuresTravaillées: 35.9, objectif: 40 },
];

const agentData = [
  { name: 'Jean D.', heuresTravaillées: 37.5, pauses: 2.5 },
  { name: 'Marie L.', heuresTravaillées: 39.2, pauses: 1.8 },
  { name: 'Pierre M.', heuresTravaillées: 36.8, pauses: 3.2 },
  { name: 'Sophie B.', heuresTravaillées: 40.5, pauses: 1.5 },
  { name: 'Lucas P.', heuresTravaillées: 35.9, pauses: 4.1 },
];

const TimeReports = () => {
  const [reportType, setReportType] = useState("weekly");
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h3 className="text-lg font-semibold">Rapports de temps</h3>
        
        <div className="w-full sm:w-64">
          <Select value={reportType} onValueChange={setReportType}>
            <SelectTrigger>
              <SelectValue placeholder="Type de rapport" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Rapport hebdomadaire</SelectItem>
              <SelectItem value="agent">Par agent</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {reportType === "weekly" && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Heures travaillées cette semaine</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={weeklyData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="heuresTravaillées" name="Heures travaillées" fill="#8884d8" />
                  <Bar dataKey="objectif" name="Objectif" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}
      
      {reportType === "agent" && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Temps de travail par agent</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={agentData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="heuresTravaillées" name="Heures travaillées" fill="#8884d8" />
                  <Bar dataKey="pauses" name="Pauses" fill="#ff8042" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TimeReports;
