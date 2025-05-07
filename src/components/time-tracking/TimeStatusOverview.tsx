
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Mock data pour les agents
const agentStatuses = [
  { id: 1, name: "Jean Dupont", status: "working", statusText: "Au travail", since: "08:30", totalToday: "2h 15m" },
  { id: 2, name: "Marie Leroy", status: "break", statusText: "En pause", since: "10:45", totalToday: "2h 30m" },
  { id: 3, name: "Pierre Martin", status: "lunch", statusText: "Déjeuner", since: "12:30", totalToday: "3h 45m" },
  { id: 4, name: "Sophie Bernard", status: "working", statusText: "Au travail", since: "09:15", totalToday: "1h 45m" },
  { id: 5, name: "Lucas Petit", status: "checked_out", statusText: "Absent", since: "--:--", totalToday: "8h 00m" }
];

const TimeStatusOverview = () => {
  // Calculer les statistiques pour les badges
  const totalAgents = agentStatuses.length;
  const workingAgents = agentStatuses.filter(a => a.status === "working").length;
  const breakAgents = agentStatuses.filter(a => a.status === "break" || a.status === "lunch").length;
  const absentAgents = agentStatuses.filter(a => a.status === "checked_out").length;
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-lg flex justify-between items-center">
              Au travail
              <Badge className="ml-2 bg-green-500">{workingAgents}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="py-2">
            <div className="text-2xl font-bold">
              {Math.round((workingAgents / totalAgents) * 100)}%
            </div>
            <div className="text-sm text-gray-500">des agents</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-lg flex justify-between items-center">
              En pause
              <Badge className="ml-2 bg-amber-500">{breakAgents}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="py-2">
            <div className="text-2xl font-bold">
              {Math.round((breakAgents / totalAgents) * 100)}%
            </div>
            <div className="text-sm text-gray-500">des agents</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-lg flex justify-between items-center">
              Absents
              <Badge className="ml-2 bg-gray-500">{absentAgents}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="py-2">
            <div className="text-2xl font-bold">
              {Math.round((absentAgents / totalAgents) * 100)}%
            </div>
            <div className="text-sm text-gray-500">des agents</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Statut en temps réel des agents</CardTitle>
        </CardHeader>
        <CardContent className="pt-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agent</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Depuis</TableHead>
                <TableHead>Temps total aujourd'hui</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agentStatuses.map((agent) => (
                <TableRow key={agent.id}>
                  <TableCell className="font-medium">{agent.name}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`
                        ${agent.status === "working" ? "bg-green-100 text-green-800 border-green-300" : ""}
                        ${agent.status === "break" ? "bg-blue-100 text-blue-800 border-blue-300" : ""}
                        ${agent.status === "lunch" ? "bg-amber-100 text-amber-800 border-amber-300" : ""}
                        ${agent.status === "checked_out" ? "bg-gray-100 text-gray-800 border-gray-300" : ""}
                      `}
                    >
                      {agent.statusText}
                    </Badge>
                  </TableCell>
                  <TableCell>{agent.since}</TableCell>
                  <TableCell>{agent.totalToday}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default TimeStatusOverview;
