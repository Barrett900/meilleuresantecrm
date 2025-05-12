
import { useState } from "react";
import Header from "@/components/layout/Header";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Appointments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock data - in a real app, this would come from an API
  const appointments = [
    {
      id: 1,
      name: "Sophie Martin",
      date: "25/05/2025",
      time: "14:00",
      type: "Présentation produit",
      location: "Bureau principal",
    },
    {
      id: 2,
      name: "Jean Dupont",
      date: "27/05/2025",
      time: "10:30",
      type: "Signature contrat",
      location: "Domicile client",
    }
  ];

  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 overflow-y-auto">
      <Header title="Rendez-vous confirmés" />
      
      <main className="p-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  className="pl-10"
                  placeholder="Rechercher un rendez-vous..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Contact</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Heure</TableHead>
                    <TableHead className="hidden md:table-cell">Type</TableHead>
                    <TableHead className="hidden lg:table-cell">Lieu</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAppointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell className="font-medium">
                        <Link 
                          to={`/contacts/${appointment.id}`} 
                          className="hover:underline text-primary"
                        >
                          {appointment.name}
                        </Link>
                      </TableCell>
                      <TableCell>{appointment.date}</TableCell>
                      <TableCell>{appointment.time}</TableCell>
                      <TableCell className="hidden md:table-cell">{appointment.type}</TableCell>
                      <TableCell className="hidden lg:table-cell">{appointment.location}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            <Calendar size={16} className="mr-2" />
                            Détails
                          </Button>
                          <Link to={`/contacts/${appointment.id}`}>
                            <Button variant="outline" size="icon">
                              <ArrowRight size={16} />
                            </Button>
                          </Link>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Appointments;
