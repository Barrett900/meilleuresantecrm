
import { useState } from "react";
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
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, Search, MoreHorizontal, Edit, Trash, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ActivitiesList = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  
  const activities = [
    {
      id: 1,
      type: "Appel",
      subject: "Suivi de proposition",
      contact: "Sophie Martin",
      company: "Tech Solutions",
      date: "05/05/2025 14:30",
      status: "À venir",
      statusColor: "bg-blue-50 text-blue-600 border-blue-200",
    },
    {
      id: 2,
      type: "Réunion",
      subject: "Présentation de produit",
      contact: "Jean Dupont",
      company: "Marketing Pro",
      date: "07/05/2025 16:00",
      status: "À venir",
      statusColor: "bg-blue-50 text-blue-600 border-blue-200",
    },
    {
      id: 3,
      type: "Email",
      subject: "Demande de devis",
      contact: "Marie Blanc",
      company: "Design Studio",
      date: "02/05/2025 11:20",
      status: "Terminé",
      statusColor: "bg-green-50 text-green-600 border-green-200",
    },
    {
      id: 4,
      type: "Appel",
      subject: "Discussion sur les tarifs",
      contact: "Thomas Noir",
      company: "Finance Corp",
      date: "01/05/2025 09:45",
      status: "Manqué",
      statusColor: "bg-red-50 text-red-600 border-red-200",
    },
  ];

  const filteredActivities = activities.filter(
    (activity) =>
      activity.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleComplete = (id: number) => {
    toast({
      title: "Activité terminée",
      description: `L'activité #${id} a été marquée comme terminée`,
    });
  };

  const handleEdit = (id: number) => {
    toast({
      title: "Modification en cours",
      description: `Édition de l'activité #${id}`,
    });
  };

  const handleDelete = (id: number) => {
    toast({
      title: "Activité supprimée",
      description: `L'activité #${id} a été supprimée`,
      variant: "destructive",
    });
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              className="pl-10"
              placeholder="Rechercher une activité..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button className="w-full sm:w-auto">
            <Plus size={18} className="mr-2" />
            Ajouter une activité
          </Button>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Sujet</TableHead>
                <TableHead className="hidden md:table-cell">Contact</TableHead>
                <TableHead className="hidden lg:table-cell">Entreprise</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredActivities.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell>{activity.type}</TableCell>
                  <TableCell className="font-medium">{activity.subject}</TableCell>
                  <TableCell className="hidden md:table-cell">{activity.contact}</TableCell>
                  <TableCell className="hidden lg:table-cell">{activity.company}</TableCell>
                  <TableCell className="hidden md:table-cell">{activity.date}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={activity.statusColor}>
                      {activity.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {activity.status !== "Terminé" && (
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleComplete(activity.id)}
                          title="Marquer comme terminé"
                        >
                          <Check size={18} />
                        </Button>
                      )}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal size={18} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(activity.id)}>
                            <Edit size={16} className="mr-2" />
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-red-600" 
                            onClick={() => handleDelete(activity.id)}
                          >
                            <Trash size={16} className="mr-2" />
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivitiesList;
