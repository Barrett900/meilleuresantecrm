
import { useState } from "react";
import { Link } from "react-router-dom";
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
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, Search, MoreHorizontal, Edit, Trash, Mail, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContactsList = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  
  const contacts = [
    {
      id: 1,
      name: "Sophie Martin",
      email: "sophie@techsolutions.fr",
      phone: "+33 6 12 34 56 78",
      birthDate: "12/04/1988",
      title: "Directrice Marketing",
      type: "Client",
      mutuelle: "Harmonie Mutuelle",
      contribution: "120€/mois"
    },
    {
      id: 2,
      name: "Jean Dupont",
      email: "jean@marketingpro.fr",
      phone: "+33 6 23 45 67 89",
      birthDate: "23/09/1975",
      title: "PDG",
      type: "Prospect",
      mutuelle: "MGEN",
      contribution: "85€/mois"
    },
    {
      id: 3,
      name: "Marie Blanc",
      email: "marie@designstudio.fr",
      phone: "+33 6 34 56 78 90",
      birthDate: "05/11/1992",
      title: "Designer UI/UX",
      type: "Partenaire",
      mutuelle: "Malakoff Médéric",
      contribution: "95€/mois"
    },
    {
      id: 4,
      name: "Thomas Noir",
      email: "thomas@financecorp.fr",
      phone: "+33 6 45 67 89 01",
      birthDate: "17/06/1983",
      title: "Directeur Financier",
      type: "Lead",
      mutuelle: "AXA Santé",
      contribution: "150€/mois"
    },
  ];

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.birthDate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (id: number) => {
    toast({
      title: "Modification en cours",
      description: `Édition du contact #${id}`,
    });
  };

  const handleDelete = (id: number) => {
    toast({
      title: "Contact supprimé",
      description: `Le contact #${id} a été supprimé`,
      variant: "destructive",
    });
  };

  const handleRingoverCall = (phone: string, name: string) => {
    // Format phone number for Ringover (remove spaces and special characters)
    const cleanPhone = phone.replace(/\s+/g, '').replace(/[^\d+]/g, '');
    
    // Ringover click-to-call URL format
    const ringoverUrl = `ringover://call/${cleanPhone}`;
    
    try {
      // Try to open with Ringover app
      window.open(ringoverUrl, '_self');
      
      toast({
        title: "Appel Ringover",
        description: `Appel de ${name} en cours via Ringover`,
      });
    } catch (error) {
      // Fallback if Ringover app is not available
      toast({
        title: "Erreur d'appel",
        description: "Ringover n'est pas disponible. Vérifiez que l'application est installée.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              className="pl-10"
              placeholder="Rechercher un contact..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button className="w-full sm:w-auto">
            <Plus size={18} className="mr-2" />
            Ajouter un contact
          </Button>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead className="hidden md:table-cell">Email</TableHead>
                <TableHead className="hidden md:table-cell">Téléphone</TableHead>
                <TableHead className="hidden md:table-cell">Date de naissance</TableHead>
                <TableHead className="hidden lg:table-cell">Fonction</TableHead>
                <TableHead className="hidden lg:table-cell">Type</TableHead>
                <TableHead className="hidden lg:table-cell">Mutuelle</TableHead>
                <TableHead className="hidden lg:table-cell">Cotisation</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContacts.map((contact) => (
                <TableRow key={contact.id}>
                  <TableCell className="font-medium">
                    <Link 
                      to={`/contacts/${contact.id}`} 
                      className="hover:underline text-primary"
                    >
                      {contact.name}
                    </Link>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{contact.email}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <button
                      onClick={() => handleRingoverCall(contact.phone, contact.name)}
                      className="text-primary hover:underline cursor-pointer"
                      title={`Appeler ${contact.name} via Ringover`}
                    >
                      {contact.phone}
                    </button>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{contact.birthDate}</TableCell>
                  <TableCell className="hidden lg:table-cell">{contact.title}</TableCell>
                  <TableCell className="hidden lg:table-cell">{contact.type}</TableCell>
                  <TableCell className="hidden lg:table-cell">{contact.mutuelle}</TableCell>
                  <TableCell className="hidden lg:table-cell">{contact.contribution}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" title="Email">
                        <Mail size={18} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        title="Appeler via Ringover"
                        onClick={() => handleRingoverCall(contact.phone, contact.name)}
                      >
                        <Phone size={18} />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal size={18} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(contact.id)}>
                            <Edit size={16} className="mr-2" />
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-red-600" 
                            onClick={() => handleDelete(contact.id)}
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

export default ContactsList;
