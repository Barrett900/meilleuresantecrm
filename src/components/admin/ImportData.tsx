
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { FileSpreadsheet, Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Mock agents for the dropdown - in a real app, this would come from your backend
const agents = [
  { id: 1, name: "Jean Dupont" },
  { id: 2, name: "Marie Leroy" },
  { id: 3, name: "Pierre Martin" },
  { id: 4, name: "Sophie Bernard" },
];

const ImportData = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Check if file is an Excel file
      if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        setSelectedFile(file);
      } else {
        toast({
          title: "Format de fichier invalide",
          description: "Veuillez sélectionner un fichier Excel (.xlsx ou .xls)",
          variant: "destructive",
        });
        e.target.value = '';
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !selectedAgent) {
      toast({
        title: "Information manquante",
        description: "Veuillez sélectionner un agent et un fichier",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    // Simulate file upload - In a real app, you would send this to your backend
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: "Importation réussie",
      description: `Les données ont été importées avec succès pour ${selectedAgent}`,
    });

    setIsUploading(false);
    setSelectedFile(null);
    setSelectedAgent("");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Importer des leads pour un agent</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="agent">Sélectionner un agent</Label>
              <Select
                value={selectedAgent}
                onValueChange={setSelectedAgent}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choisir un agent" />
                </SelectTrigger>
                <SelectContent>
                  {agents.map((agent) => (
                    <SelectItem key={agent.id} value={agent.name}>
                      {agent.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="file">Fichier Excel (.xlsx)</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="file"
                  type="file"
                  onChange={handleFileChange}
                  accept=".xlsx,.xls"
                  className="flex-1"
                />
              </div>
              {selectedFile && (
                <p className="text-sm text-gray-500 flex items-center mt-2">
                  <FileSpreadsheet size={16} className="mr-2" />
                  {selectedFile.name} ({Math.round(selectedFile.size / 1024)} Ko)
                </p>
              )}
            </div>

            <Button 
              onClick={handleUpload} 
              disabled={!selectedFile || !selectedAgent || isUploading}
              className="w-full mt-4"
            >
              {isUploading ? (
                "Importation en cours..."
              ) : (
                <>
                  <Upload size={16} className="mr-2" />
                  Importer les données
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Instructions d'importation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>Pour importer des leads depuis un fichier Excel, veuillez suivre les instructions suivantes :</p>
            
            <ol className="list-decimal list-inside space-y-2">
              <li>Préparez votre fichier Excel avec les colonnes suivantes :
                <ul className="list-disc list-inside ml-6 mt-1">
                  <li>Nom</li>
                  <li>Prénom</li>
                  <li>Téléphone</li>
                  <li>Email</li>
                  <li>Notes (optionnel)</li>
                </ul>
              </li>
              <li>Sélectionnez l'agent pour lequel vous souhaitez importer les leads.</li>
              <li>Téléchargez votre fichier Excel (.xlsx).</li>
              <li>Cliquez sur le bouton "Importer les données".</li>
            </ol>
            
            <p className="text-sm text-gray-500 mt-4">
              Note : Les fichiers volumineux peuvent prendre plus de temps à être traités.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImportData;
