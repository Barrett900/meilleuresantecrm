
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

const ActivityForm = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Activité enregistrée",
      description: "L'activité a été enregistrée avec succès",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ajouter une activité</CardTitle>
        <CardDescription>
          Planifiez une nouvelle activité dans votre CRM
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="type">Type d'activité</Label>
              <Select>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Sélectionner un type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="call">Appel</SelectItem>
                  <SelectItem value="meeting">Réunion</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="task">Tâche</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Sujet</Label>
              <Input id="subject" placeholder="Sujet de l'activité" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="contact">Contact</Label>
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
            <div className="space-y-2">
              <Label htmlFor="deal">Affaire liée (optionnel)</Label>
              <Select>
                <SelectTrigger id="deal">
                  <SelectValue placeholder="Sélectionner une affaire" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="website">Mise à jour du site web</SelectItem>
                  <SelectItem value="campaign">Campagne publicitaire Q2</SelectItem>
                  <SelectItem value="design">Refonte de l'identité visuelle</SelectItem>
                  <SelectItem value="audit">Audit financier</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Heure</Label>
              <Input id="time" type="time" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="duration">Durée (minutes)</Label>
              <Input id="duration" type="number" placeholder="30" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Statut</Label>
              <Select>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Sélectionner un statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="planned">À venir</SelectItem>
                  <SelectItem value="completed">Terminé</SelectItem>
                  <SelectItem value="cancelled">Annulé</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" placeholder="Notes sur l'activité..." />
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

export default ActivityForm;
