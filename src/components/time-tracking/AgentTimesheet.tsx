
import { useState } from "react";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

// Mock des données des agents
const agents = [
  { id: 1, name: "Jean Dupont" },
  { id: 2, name: "Marie Leroy" },
  { id: 3, name: "Pierre Martin" },
  { id: 4, name: "Sophie Bernard" },
  { id: 5, name: "Lucas Petit" }
];

// Mock des données d'heures
const mockTimesheet = [
  {
    date: "2025-05-07",
    entries: [
      { start: "08:30", end: "10:30", duration: "2:00", type: "work" },
      { start: "10:30", end: "10:45", duration: "0:15", type: "break" },
      { start: "10:45", end: "12:30", duration: "1:45", type: "work" },
      { start: "12:30", end: "13:30", duration: "1:00", type: "lunch" },
      { start: "13:30", end: "15:30", duration: "2:00", type: "work" },
      { start: "15:30", end: "15:45", duration: "0:15", type: "break" },
      { start: "15:45", end: "17:15", duration: "1:30", type: "work" },
    ]
  },
  {
    date: "2025-05-06",
    entries: [
      { start: "08:15", end: "10:15", duration: "2:00", type: "work" },
      { start: "10:15", end: "10:30", duration: "0:15", type: "break" },
      { start: "10:30", end: "12:00", duration: "1:30", type: "work" },
      { start: "12:00", end: "13:00", duration: "1:00", type: "lunch" },
      { start: "13:00", end: "15:15", duration: "2:15", type: "work" },
      { start: "15:15", end: "15:30", duration: "0:15", type: "break" },
      { start: "15:30", end: "17:00", duration: "1:30", type: "work" },
    ]
  }
];

const AgentTimesheet = () => {
  const [selectedAgent, setSelectedAgent] = useState<string>("1");
  const [date, setDate] = useState<Date>(new Date());
  
  const formattedDate = format(date, "yyyy-MM-dd");
  const timesheet = mockTimesheet.find(ts => ts.date === formattedDate) || { date: formattedDate, entries: [] };
  
  // Calculer le total des heures de travail
  const totalWorkMinutes = timesheet.entries
    .filter(entry => entry.type === "work")
    .reduce((total, entry) => {
      const [hours, minutes] = entry.duration.split(':').map(Number);
      return total + (hours * 60) + minutes;
    }, 0);
    
  const totalWorkHours = Math.floor(totalWorkMinutes / 60);
  const totalWorkRemainingMinutes = totalWorkMinutes % 60;
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Feuille de temps des agents</CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="w-full sm:w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Agent</label>
            <Select value={selectedAgent} onValueChange={setSelectedAgent}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un agent" />
              </SelectTrigger>
              <SelectContent>
                {agents.map(agent => (
                  <SelectItem key={agent.id} value={agent.id.toString()}>
                    {agent.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-full sm:w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(date, "dd MMMM yyyy", { locale: fr })}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => newDate && setDate(newDate)}
                  initialFocus
                  locale={fr}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Heure de début</TableHead>
              <TableHead>Heure de fin</TableHead>
              <TableHead>Durée</TableHead>
              <TableHead>Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {timesheet.entries.length > 0 ? (
              timesheet.entries.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell>{entry.start}</TableCell>
                  <TableCell>{entry.end}</TableCell>
                  <TableCell>{entry.duration}</TableCell>
                  <TableCell>
                    {entry.type === "work" && "Travail"}
                    {entry.type === "break" && "Pause"}
                    {entry.type === "lunch" && "Déjeuner"}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4">
                  Aucune donnée disponible pour cette date
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        
        {timesheet.entries.length > 0 && (
          <div className="mt-4 text-right">
            <strong className="text-sm">
              Total des heures travaillées: {totalWorkHours}h {totalWorkRemainingMinutes}m
            </strong>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AgentTimesheet;
