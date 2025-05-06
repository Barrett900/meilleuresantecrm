
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const ContactForm = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Contact enregistré",
      description: "Le contact a été enregistré avec succès",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ajouter un contact</CardTitle>
        <CardDescription>
          Créez un nouveau contact dans votre CRM
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName">Prénom</Label>
              <Input id="firstName" placeholder="Prénom" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Nom</Label>
              <Input id="lastName" placeholder="Nom" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="exemple@email.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Téléphone</Label>
              <Input id="phone" placeholder="+33 6 12 34 56 78" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="company">Entreprise</Label>
              <Input id="company" placeholder="Nom de l'entreprise" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Fonction</Label>
              <Input id="title" placeholder="Titre / Fonction" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Type de contact</Label>
            <Select>
              <SelectTrigger id="type">
                <SelectValue placeholder="Sélectionner un type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lead">Lead</SelectItem>
                <SelectItem value="prospect">Prospect</SelectItem>
                <SelectItem value="client">Client</SelectItem>
                <SelectItem value="partner">Partenaire</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" placeholder="Notes sur le contact..." />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Annuler</Button>
          <Button type="submit">Enregistrer</Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ContactForm;
