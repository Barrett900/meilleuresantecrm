
import { useState } from "react";
import Header from "@/components/layout/Header";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Mail, User, Building, Lock } from "lucide-react";

const Settings = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simuler un délai de sauvegarde
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Profil mis à jour",
        description: "Vos informations ont été enregistrées avec succès",
      });
    }, 800);
  };

  const handleSaveEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simuler un délai de sauvegarde
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Paramètres email mis à jour",
        description: "Vos paramètres d'email ont été enregistrés avec succès",
      });
    }, 800);
  };
  
  return (
    <div className="flex-1 overflow-y-auto">
      <Header title="Paramètres" />
      
      <main className="p-6">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-3 md:grid-cols-4 mb-6">
            <TabsTrigger value="profile" className="flex items-center">
              <User size={16} className="mr-2 hidden md:inline" />
              <span>Profil</span>
            </TabsTrigger>
            <TabsTrigger value="email" className="flex items-center">
              <Mail size={16} className="mr-2 hidden md:inline" />
              <span>Email</span>
            </TabsTrigger>
            <TabsTrigger value="company" className="flex items-center">
              <Building size={16} className="mr-2 hidden md:inline" />
              <span>Entreprise</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="hidden md:flex items-center">
              <Lock size={16} className="mr-2" />
              <span>Sécurité</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Informations personnelles</CardTitle>
                <CardDescription>
                  Modifiez vos informations personnelles et vos préférences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSaveProfile} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <FormLabel htmlFor="firstName">Prénom</FormLabel>
                      <Input id="firstName" placeholder="Prénom" defaultValue="Jean" />
                    </div>
                    <div className="space-y-2">
                      <FormLabel htmlFor="lastName">Nom</FormLabel>
                      <Input id="lastName" placeholder="Nom" defaultValue="Dupont" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <Input id="email" type="email" placeholder="Email" defaultValue="jean.dupont@meilleuresante.fr" />
                    </div>
                    <div className="space-y-2">
                      <FormLabel htmlFor="phone">Téléphone</FormLabel>
                      <Input id="phone" placeholder="Téléphone" defaultValue="+33 6 12 34 56 78" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <FormLabel htmlFor="role">Rôle</FormLabel>
                    <Select defaultValue="admin">
                      <SelectTrigger id="role">
                        <SelectValue placeholder="Sélectionner un rôle" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Administrateur</SelectItem>
                        <SelectItem value="agent">Agent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <FormLabel htmlFor="bio">Bio</FormLabel>
                    <Textarea 
                      id="bio" 
                      placeholder="Quelques mots à propos de vous..." 
                      defaultValue="Directeur commercial pour Meilleure Santé CRM"
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Enregistrement..." : "Enregistrer les modifications"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="email">
            <Card>
              <CardHeader>
                <CardTitle>Paramètres d'email</CardTitle>
                <CardDescription>
                  Configurez vos paramètres d'email pour l'automatisation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSaveEmail} className="space-y-6">
                  <div className="space-y-2">
                    <FormLabel htmlFor="emailAddress">Adresse email d'envoi</FormLabel>
                    <Input id="emailAddress" type="email" placeholder="Email" defaultValue="jean.dupont@meilleuresante.fr" />
                  </div>
                  
                  <div className="space-y-2">
                    <FormLabel htmlFor="smtpServer">Serveur SMTP</FormLabel>
                    <Input id="smtpServer" placeholder="smtp.example.com" defaultValue="smtp.meilleuresante.fr" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <FormLabel htmlFor="smtpPort">Port SMTP</FormLabel>
                      <Input id="smtpPort" placeholder="587" defaultValue="587" />
                    </div>
                    <div className="space-y-2">
                      <FormLabel htmlFor="encryption">Encryption</FormLabel>
                      <Select defaultValue="tls">
                        <SelectTrigger id="encryption">
                          <SelectValue placeholder="Sélectionner une méthode" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tls">TLS</SelectItem>
                          <SelectItem value="ssl">SSL</SelectItem>
                          <SelectItem value="none">Aucune</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <FormLabel htmlFor="smtpUsername">Nom d'utilisateur</FormLabel>
                      <Input id="smtpUsername" placeholder="Username" defaultValue="jean.dupont" />
                    </div>
                    <div className="space-y-2">
                      <FormLabel htmlFor="smtpPassword">Mot de passe</FormLabel>
                      <Input id="smtpPassword" type="password" placeholder="Mot de passe" defaultValue="********" />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Enregistrement..." : "Enregistrer les paramètres"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="company">
            <Card>
              <CardHeader>
                <CardTitle>Informations de l'entreprise</CardTitle>
                <CardDescription>
                  Configurez les informations de votre entreprise
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="space-y-2">
                    <FormLabel htmlFor="companyName">Nom de l'entreprise</FormLabel>
                    <Input id="companyName" placeholder="Nom de l'entreprise" defaultValue="Meilleure Santé" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <FormLabel htmlFor="companyEmail">Email</FormLabel>
                      <Input id="companyEmail" type="email" placeholder="Email" defaultValue="contact@meilleuresante.fr" />
                    </div>
                    <div className="space-y-2">
                      <FormLabel htmlFor="companyPhone">Téléphone</FormLabel>
                      <Input id="companyPhone" placeholder="Téléphone" defaultValue="+33 1 23 45 67 89" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <FormLabel htmlFor="companyAddress">Adresse</FormLabel>
                    <Textarea 
                      id="companyAddress" 
                      placeholder="Adresse complète" 
                      defaultValue="12 Avenue de la Santé\n75000 Paris\nFrance"
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit">Enregistrer les modifications</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Sécurité</CardTitle>
                <CardDescription>
                  Gérez vos paramètres de sécurité et vos mots de passe
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="space-y-2">
                    <FormLabel htmlFor="currentPassword">Mot de passe actuel</FormLabel>
                    <Input id="currentPassword" type="password" placeholder="••••••••" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <FormLabel htmlFor="newPassword">Nouveau mot de passe</FormLabel>
                      <Input id="newPassword" type="password" placeholder="••••••••" />
                    </div>
                    <div className="space-y-2">
                      <FormLabel htmlFor="confirmPassword">Confirmer le mot de passe</FormLabel>
                      <Input id="confirmPassword" type="password" placeholder="••••••••" />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit">Mettre à jour le mot de passe</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Settings;
