
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const RecentActivities = () => {
  const activities = [
    {
      type: "Appel",
      contact: "Sophie Martin",
      company: "Tech Solutions",
      date: "Aujourd'hui, 14:30",
      status: "À venir",
      statusColor: "bg-blue-50 text-blue-600 border-blue-200",
    },
    {
      type: "Réunion",
      contact: "Jean Dupont",
      company: "Marketing Pro",
      date: "Aujourd'hui, 16:00",
      status: "À venir",
      statusColor: "bg-blue-50 text-blue-600 border-blue-200",
    },
    {
      type: "Email",
      contact: "Marie Blanc",
      company: "Design Studio",
      date: "Hier, 11:20",
      status: "Terminé",
      statusColor: "bg-green-50 text-green-600 border-green-200",
    },
    {
      type: "Appel",
      contact: "Thomas Noir",
      company: "Finance Corp",
      date: "Hier, 09:45",
      status: "Manqué",
      statusColor: "bg-red-50 text-red-600 border-red-200",
    },
  ];

  return (
    <Card className="mt-6">
      <CardHeader className="pb-2">
        <CardTitle>Activités Récentes</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead className="hidden md:table-cell">Entreprise</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead>Statut</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activities.map((activity, index) => (
              <TableRow key={index}>
                <TableCell>{activity.type}</TableCell>
                <TableCell>{activity.contact}</TableCell>
                <TableCell className="hidden md:table-cell">{activity.company}</TableCell>
                <TableCell className="hidden md:table-cell">{activity.date}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={activity.statusColor}>
                    {activity.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentActivities;
