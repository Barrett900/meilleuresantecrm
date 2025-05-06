
import { useState } from "react";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { User, Edit, UserPlus } from "lucide-react";
import AgentProfileEdit from "./AgentProfileEdit";

// Mock data - in a real app, this would come from your backend
const mockAgents = [
  { id: 1, name: "Jean Dupont", email: "jean.dupont@example.com", role: "Senior", status: "En ligne", leadsCount: 45 },
  { id: 2, name: "Marie Leroy", email: "marie.leroy@example.com", role: "Junior", status: "Hors ligne", leadsCount: 23 },
  { id: 3, name: "Pierre Martin", email: "pierre.martin@example.com", role: "Senior", status: "En ligne", leadsCount: 67 },
  { id: 4, name: "Sophie Bernard", email: "sophie.bernard@example.com", role: "Junior", status: "Hors ligne", leadsCount: 12 },
];

const AgentManagement = () => {
  const [agents, setAgents] = useState(mockAgents);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isNewDialogOpen, setIsNewDialogOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<typeof mockAgents[0] | null>(null);

  const handleEditClick = (agent: typeof mockAgents[0]) => {
    setSelectedAgent(agent);
    setIsEditDialogOpen(true);
  };

  const handleNewAgent = () => {
    setSelectedAgent(null);
    setIsNewDialogOpen(true);
  };

  const handleSaveChanges = (updatedAgent: typeof mockAgents[0]) => {
    if (selectedAgent) {
      // Update existing agent
      setAgents(agents.map(agent => 
        agent.id === updatedAgent.id ? updatedAgent : agent
      ));
    } else {
      // Add new agent
      setAgents([...agents, { ...updatedAgent, id: agents.length + 1 }]);
    }
    setIsEditDialogOpen(false);
    setIsNewDialogOpen(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">Liste des Agents</h3>
        <Button onClick={handleNewAgent}>
          <UserPlus className="mr-2 h-4 w-4" />
          Nouvel Agent
        </Button>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Agent</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Rôle</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Leads</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {agents.map((agent) => (
              <TableRow key={agent.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
                      <User size={16} />
                    </div>
                    {agent.name}
                  </div>
                </TableCell>
                <TableCell>{agent.email}</TableCell>
                <TableCell>{agent.role}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    agent.status === 'En ligne' 
                      ? 'bg-green-50 text-green-600' 
                      : 'bg-gray-50 text-gray-600'
                  }`}>
                    {agent.status}
                  </span>
                </TableCell>
                <TableCell>{agent.leadsCount}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" onClick={() => handleEditClick(agent)}>
                    <Edit size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Edit Agent Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Modifier l'agent</DialogTitle>
          </DialogHeader>
          {selectedAgent && (
            <AgentProfileEdit 
              agent={selectedAgent} 
              onSave={handleSaveChanges} 
              onCancel={() => setIsEditDialogOpen(false)} 
            />
          )}
        </DialogContent>
      </Dialog>

      {/* New Agent Dialog */}
      <Dialog open={isNewDialogOpen} onOpenChange={setIsNewDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Ajouter un nouvel agent</DialogTitle>
          </DialogHeader>
          <AgentProfileEdit 
            agent={{ id: 0, name: "", email: "", role: "Junior", status: "Hors ligne", leadsCount: 0 }} 
            onSave={handleSaveChanges}
            onCancel={() => setIsNewDialogOpen(false)}
            isNewAgent={true}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AgentManagement;
