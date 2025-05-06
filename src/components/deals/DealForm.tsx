
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

const DealForm = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Affaire enregistrée",
      description: "L'affaire a été enregistrée avec succès",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ajouter une affaire</CardTitle>
        <CardDescription>
          Créez une nouvelle opportunité commerciale
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Nom de l'affaire</Label>
            <Input id="name" placeholder="Nom de l'affaire" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="company">Entreprise</Label>
              <Select>
                <SelectTrigger id="company">
                  <SelectValue placeholder="Sélectionner une entreprise" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tech-solutions">Tech Solutions</SelectItem>
                  <SelectItem value="marketing-pro">Marketing Pro</SelectItem>
                  <SelectItem value="design-studio">Design Studio</SelectItem>
                  <SelectItem value="finance-corp">Finance Corp</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact">Contact principal</Label>
              <Select>
                <SelectTrigger id="contact">
                  <SelectValue placeholder="Sélectionner un contact" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sophie-martin">Sophie Martin</SelectItem>
                  <SelectItem value="jean-dupont">Jean Dupont</SelectItem>
                  <SelectItem value="marie-blanc">Marie Blanc</SelectItem>
                  <SelectItem value="thomas-noir">Thomas Noir</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="amount">Montant (€)</Label>
              <Input id="amount" type="number" placeholder="0.00" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stage">Étape</Label>
              <Select>
                <SelectTrigger id="stage">
                  <SelectValue placeholder="Sélectionner une étape" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="discovery">Découverte</SelectItem>
                  <SelectItem value="qualification">Qualification</SelectItem>
                  <SelectItem value="proposal">Proposition</SelectItem>
                  <SelectItem value="negotiation">Négociation</SelectItem>
                  <SelectItem value="closed-won">Gagnée</SelectItem>
                  <SelectItem value="closed-lost">Perdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="closingDate">Date de clôture prévue</Label>
              <Input id="closingDate" type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="owner">Responsable</Label>
              <Select>
                <SelectTrigger id="owner">
                  <SelectValue placeholder="Sélectionner un responsable" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sophie-martin">Sophie Martin</SelectItem>
                  <SelectItem value="jean-dupont">Jean Dupont</SelectItem>
                  <SelectItem value="marie-blanc">Marie Blanc</SelectItem>
                  <SelectItem value="thomas-noir">Thomas Noir</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Description de l'affaire..." />
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

export default DealForm;
