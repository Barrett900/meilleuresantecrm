
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Dans une application réelle, ces données viendraient d'un backend
const mockHistory = [
  {
    id: 1,
    date: "2025-05-07",
    startTime: "08:30",
    endTime: "17:15",
    breaks: [
      { type: "break", start: "10:30", end: "10:45" },
      { type: "lunch", start: "12:30", end: "13:30" },
      { type: "break", start: "15:30", end: "15:45" }
    ],
    totalHours: "7:45"
  },
  {
    id: 2,
    date: "2025-05-06",
    startTime: "08:15",
    endTime: "17:00",
    breaks: [
      { type: "break", start: "10:15", end: "10:30" },
      { type: "lunch", start: "12:00", end: "13:00" },
      { type: "break", start: "15:15", end: "15:30" }
    ],
    totalHours: "7:45"
  },
  {
    id: 3,
    date: "2025-05-05",
    startTime: "08:45",
    endTime: "17:30",
    breaks: [
      { type: "break", start: "10:45", end: "11:00" },
      { type: "lunch", start: "12:45", end: "13:45" },
      { type: "break", start: "15:45", end: "16:00" }
    ],
    totalHours: "7:45"
  }
];

const TimeTrackingHistory = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Historique de pointage</CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Début</TableHead>
              <TableHead>Fin</TableHead>
              <TableHead className="hidden md:table-cell">Pauses</TableHead>
              <TableHead>Total d'heures</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockHistory.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell>{new Date(entry.date).toLocaleDateString('fr-FR')}</TableCell>
                <TableCell>{entry.startTime}</TableCell>
                <TableCell>{entry.endTime}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {entry.breaks.map((breakItem, index) => (
                    <div key={index} className="text-xs">
                      {breakItem.type === "lunch" ? "Déjeuner" : "Pause"}: {breakItem.start} - {breakItem.end}
                    </div>
                  ))}
                </TableCell>
                <TableCell>{entry.totalHours}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TimeTrackingHistory;
