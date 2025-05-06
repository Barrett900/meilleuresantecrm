
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

// Mock performance data - in a real app, this would come from your backend
const performanceData = [
  { name: 'Jean Dupont', leads: 45, calls: 87, quotes: 32, sales: 18, conversion: 40 },
  { name: 'Marie Leroy', leads: 23, calls: 51, quotes: 19, sales: 8, conversion: 35 },
  { name: 'Pierre Martin', leads: 67, calls: 102, quotes: 48, sales: 29, conversion: 43 },
  { name: 'Sophie Bernard', leads: 12, calls: 28, quotes: 10, sales: 3, conversion: 25 },
];

const chartData = performanceData.map(agent => ({
  name: agent.name.split(' ')[0],
  Leads: agent.leads,
  Appels: agent.calls,
  Devis: agent.quotes,
  Ventes: agent.sales,
}));

const AgentPerformance = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Performance des ventes</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Leads" fill="#8884d8" />
                  <Bar dataKey="Devis" fill="#82ca9d" />
                  <Bar dataKey="Ventes" fill="#ffc658" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Activité des appels</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Appels" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Tableau de performances</CardTitle>
        </CardHeader>
        <CardContent className="pt-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agent</TableHead>
                <TableHead>Leads</TableHead>
                <TableHead>Appels</TableHead>
                <TableHead>Devis</TableHead>
                <TableHead>Ventes</TableHead>
                <TableHead>Taux de conversion</TableHead>
                <TableHead>Tendance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {performanceData.map((agent, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{agent.name}</TableCell>
                  <TableCell>{agent.leads}</TableCell>
                  <TableCell>{agent.calls}</TableCell>
                  <TableCell>{agent.quotes}</TableCell>
                  <TableCell>{agent.sales}</TableCell>
                  <TableCell>{agent.conversion}%</TableCell>
                  <TableCell>
                    {agent.conversion > 30 ? (
                      <div className="flex items-center text-green-600">
                        <TrendingUp size={16} className="mr-1" /> 
                        En hausse
                      </div>
                    ) : (
                      <div className="flex items-center text-red-600">
                        <TrendingDown size={16} className="mr-1" /> 
                        En baisse
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentPerformance;
