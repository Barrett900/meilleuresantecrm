
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
import { Plus, Search, MoreHorizontal, Edit, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DealsList = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  
  const deals = [
    {
      id: 1,
      name: "Mise à jour du site web",
      company: "Tech Solutions",
      amount: "€8,500",
      stage: "Proposition",
      stageColor: "bg-blue-50 text-blue-600 border-blue-200",
      closingDate: "15/06/2025",
      owner: "Sophie Martin",
    },
    {
      id: 2,
      name: "Campagne publicitaire Q2",
      company: "Marketing Pro",
      amount: "€12,000",
      stage: "Négociation",
      stageColor: "bg-amber-50 text-amber-600 border-amber-200",
      closingDate: "30/05/2025",
      owner: "Jean Dupont",
    },
    {
      id: 3,
      name: "Refonte de l'identité visuelle",
      company: "Design Studio",
      amount: "€5,200",
      stage: "Gagnée",
      stageColor: "bg-green-50 text-green-600 border-green-200",
      closingDate: "01/05/2025",
      owner: "Marie Blanc",
    },
    {
      id: 4,
      name: "Audit financier",
      company: "Finance Corp",
      amount: "€15,000",
      stage: "Découverte",
      stageColor: "bg-purple-50 text-purple-600 border-purple-200",
      closingDate: "20/06/2025",
      owner: "Thomas Noir",
    },
  ];

  const filteredDeals = deals.filter(
    (deal) =>
      deal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deal.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deal.owner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (id: number) => {
    toast({
      title: "Modification en cours",
      description: `Édition de l'affaire #${id}`,
    });
  };

  const handleDelete = (id: number) => {
    toast({
      title: "Affaire supprimée",
      description: `L'affaire #${id} a été supprimée`,
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
              placeholder="Rechercher une affaire..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button className="w-full sm:w-auto">
            <Plus size={18} className="mr-2" />
            Ajouter une affaire
          </Button>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead className="hidden md:table-cell">Entreprise</TableHead>
                <TableHead className="hidden lg:table-cell">Montant</TableHead>
                <TableHead>Étape</TableHead>
                <TableHead className="hidden md:table-cell">Date de clôture</TableHead>
                <TableHead className="hidden lg:table-cell">Responsable</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDeals.map((deal) => (
                <TableRow key={deal.id}>
                  <TableCell className="font-medium">{deal.name}</TableCell>
                  <TableCell className="hidden md:table-cell">{deal.company}</TableCell>
                  <TableCell className="hidden lg:table-cell">{deal.amount}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={deal.stageColor}>
                      {deal.stage}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{deal.closingDate}</TableCell>
                  <TableCell className="hidden lg:table-cell">{deal.owner}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal size={18} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(deal.id)}>
                          <Edit size={16} className="mr-2" />
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-red-600" 
                          onClick={() => handleDelete(deal.id)}
                        >
                          <Trash size={16} className="mr-2" />
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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

export default DealsList;
