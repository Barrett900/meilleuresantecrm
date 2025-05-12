
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";
import { 
  Calendar as CalendarIcon, 
  Phone, 
  Mail, 
  Bell, 
  Check, 
  X, 
  FileText, 
  Clock,
  Save,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// Define contact status options
const STATUS_OPTIONS = [
  { id: "busy", label: "Occupé(e)", icon: Clock },
  { id: "callback", label: "Rappel", icon: Bell },
  { id: "quote_sent", label: "Devis envoyé", icon: FileText },
  { id: "appointment", label: "RDV pris", icon: Check },
  { id: "out_of_target", label: "Hors cible", icon: X },
  { id: "signed", label: "Signée", icon: Check },
];

interface ContactDetailProps {
  id: number;
}

const ContactDetail = ({ id }: ContactDetailProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Mock data - in a real application, this would come from an API call
  const [contact, setContact] = useState({
    id,
    name: id === 1 ? "Sophie Martin" : id === 2 ? "Jean Dupont" : id === 3 ? "Marie Blanc" : "Thomas Noir",
    email: id === 1 ? "sophie@techsolutions.fr" : id === 2 ? "jean@marketingpro.fr" : id === 3 ? "marie@designstudio.fr" : "thomas@financecorp.fr",
    phone: id === 1 ? "+33 6 12 34 56 78" : id === 2 ? "+33 6 23 45 67 89" : id === 3 ? "+33 6 34 56 78 90" : "+33 6 45 67 89 01",
    birthDate: id === 1 ? "12/04/1988" : id === 2 ? "23/09/1975" : id === 3 ? "05/11/1992" : "17/06/1983",
    title: id === 1 ? "Directrice Marketing" : id === 2 ? "PDG" : id === 3 ? "Designer UI/UX" : "Directeur Financier",
    type: id === 1 ? "Client" : id === 2 ? "Prospect" : id === 3 ? "Partenaire" : "Lead",
    mutuelle: id === 1 ? "Harmonie Mutuelle" : id === 2 ? "MGEN" : id === 3 ? "Malakoff Médéric" : "AXA Santé",
    contribution: id === 1 ? "120€/mois" : id === 2 ? "85€/mois" : id === 3 ? "95€/mois" : "150€/mois",
    notes: "",
    guarantees: "",
    status: "",
  });

  const [reminderDate, setReminderDate] = useState<Date | undefined>(undefined);
  const [isReminderDialogOpen, setIsReminderDialogOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContact(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    toast({
      title: "Contact mis à jour",
      description: `Les détails de ${contact.name} ont été mis à jour.`,
    });
  };

  const handleStatusChange = (status: string) => {
    setContact(prev => ({ ...prev, status }));
    
    // If status is appointment, show confirmation toast
    if (status === "appointment") {
      toast({
        title: "RDV enregistré",
        description: `${contact.name} a été ajouté(e) à la liste des RDV.`,
      });
    } else {
      toast({
        description: `Statut mis à jour : ${STATUS_OPTIONS.find(opt => opt.id === status)?.label}`,
      });
    }
  };

  const handleSetReminder = () => {
    if (reminderDate) {
      toast({
        title: "Rappel programmé",
        description: `Rappel pour ${contact.name} programmé pour le ${format(reminderDate, "dd/MM/yyyy à HH:mm")}`,
      });
      setIsReminderDialogOpen(false);
    }
  };

  const handleContactAction = (action: string) => {
    switch (action) {
      case "email":
        toast({
          description: `Envoi d'email à ${contact.email}`,
        });
        break;
      case "call":
        toast({
          description: `Appel de ${contact.name} au ${contact.phone}`,
        });
        break;
      default:
        break;
    }
  };

  return (
    <div className="space-y-6">
      {/* Contact Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{contact.name}</h1>
          <p className="text-muted-foreground">{contact.title} - {contact.type}</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => handleContactAction("email")}
            title="Envoyer un email"
          >
            <Mail size={18} />
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => handleContactAction("call")}
            title="Appeler"
          >
            <Phone size={18} />
          </Button>
          <Button onClick={handleSave}>
            <Save size={18} className="mr-2" />
            Enregistrer
          </Button>
        </div>
      </div>

      {/* Contact Status Buttons */}
      <Card>
        <CardHeader>
          <CardTitle>Statut du contact</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {STATUS_OPTIONS.map((option) => (
              <Button 
                key={option.id}
                variant={contact.status === option.id ? "default" : "outline"}
                onClick={() => handleStatusChange(option.id)}
                className="flex items-center"
              >
                <option.icon size={16} className="mr-2" />
                {option.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Reminder Dialog */}
      <Dialog open={isReminderDialogOpen} onOpenChange={setIsReminderDialogOpen}>
        <DialogTrigger asChild>
          <Button className="w-full">
            <Bell size={18} className="mr-2" />
            Programmer un rappel
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Programmer un rappel</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="reminder-date">Date et heure</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !reminderDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {reminderDate ? format(reminderDate, "PPP HH:mm") : <span>Sélectionner une date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={reminderDate}
                    onSelect={setReminderDate}
                    initialFocus
                    className="pointer-events-auto"
                  />
                  <div className="p-3 border-t">
                    <Label htmlFor="reminder-time">Heure</Label>
                    <Input 
                      type="time" 
                      id="reminder-time"
                      className="mt-2"
                      onChange={(e) => {
                        if (reminderDate && e.target.value) {
                          const [hours, minutes] = e.target.value.split(':').map(Number);
                          const newDate = new Date(reminderDate);
                          newDate.setHours(hours, minutes);
                          setReminderDate(newDate);
                        }
                      }}
                    />
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <Button className="w-full" onClick={handleSetReminder}>Programmer le rappel</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Contact Details */}
      <Card>
        <CardHeader>
          <CardTitle>Informations personnelles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nom complet</Label>
              <Input id="name" name="name" value={contact.name} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="birthDate">Date de naissance</Label>
              <Input id="birthDate" name="birthDate" value={contact.birthDate} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" value={contact.email} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Téléphone</Label>
              <Input id="phone" name="phone" value={contact.phone} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Fonction</Label>
              <Input id="title" name="title" value={contact.title} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Input id="type" name="type" value={contact.type} onChange={handleChange} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mutuelle Information */}
      <Card>
        <CardHeader>
          <CardTitle>Informations Mutuelle</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="mutuelle">Nom de la mutuelle</Label>
              <Input id="mutuelle" name="mutuelle" value={contact.mutuelle} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contribution">Montant de la cotisation</Label>
              <Input id="contribution" name="contribution" value={contact.contribution} onChange={handleChange} />
            </div>
          </div>
          <div className="mt-6">
            <Label htmlFor="guarantees">Garanties</Label>
            <Textarea
              className="mt-2"
              id="guarantees"
              name="guarantees"
              value={contact.guarantees}
              onChange={handleChange}
              placeholder="Détails des garanties de la mutuelle..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Notes Section */}
      <Card>
        <CardHeader>
          <CardTitle>Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            id="notes"
            name="notes"
            value={contact.notes}
            onChange={handleChange}
            placeholder="Ajouter des notes sur ce contact..."
            rows={4}
          />
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleSave}>Enregistrer les notes</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ContactDetail;
