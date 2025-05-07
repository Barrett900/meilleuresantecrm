
import { useState } from "react";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Clock, Coffee, Utensils, LogOut } from "lucide-react";
import TimeTrackingHistory from "@/components/time-tracking/TimeTrackingHistory";

enum TrackingStatus {
  CHECKED_OUT = "CHECKED_OUT",
  WORKING = "WORKING",
  BREAK = "BREAK",
  LUNCH = "LUNCH"
}

const TimeTracking = () => {
  const [status, setStatus] = useState<TrackingStatus>(TrackingStatus.CHECKED_OUT);
  const { toast } = useToast();
  
  // Dans une application réelle, nous utiliserions un back-end pour stocker ces informations
  const handleStatusChange = (newStatus: TrackingStatus) => {
    setStatus(newStatus);
    
    const statusMessages = {
      [TrackingStatus.WORKING]: "Début de journée enregistré",
      [TrackingStatus.BREAK]: "Pause débutée",
      [TrackingStatus.LUNCH]: "Pause déjeuner débutée",
      [TrackingStatus.CHECKED_OUT]: "Fin de journée enregistrée",
    };
    
    toast({
      title: statusMessages[newStatus],
      description: `${new Date().toLocaleTimeString()}`,
    });
  };

  const getButtonState = (buttonStatus: TrackingStatus) => {
    return {
      variant: status === buttonStatus ? "default" : "outline",
      disabled: 
        (buttonStatus === TrackingStatus.WORKING && status !== TrackingStatus.CHECKED_OUT && status !== TrackingStatus.BREAK && status !== TrackingStatus.LUNCH) ||
        (buttonStatus === TrackingStatus.BREAK && status !== TrackingStatus.WORKING) ||
        (buttonStatus === TrackingStatus.LUNCH && status !== TrackingStatus.WORKING) ||
        (buttonStatus === TrackingStatus.CHECKED_OUT && status === TrackingStatus.CHECKED_OUT)
    } as const;
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <Header title="Pointage" />
      
      <main className="p-6">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Gestion de votre temps de travail</h2>
          <p className="text-gray-600">
            Enregistrez vos heures de travail et vos pauses.
          </p>
        </div>
        
        <Card className="mb-8">
          <CardHeader className="pb-2">
            <CardTitle>Statut actuel: {
              {
                [TrackingStatus.CHECKED_OUT]: "Non pointé",
                [TrackingStatus.WORKING]: "Au travail",
                [TrackingStatus.BREAK]: "En pause",
                [TrackingStatus.LUNCH]: "En pause déjeuner"
              }[status]
            }</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <Button 
                className="flex flex-col items-center gap-2 h-24" 
                {...getButtonState(TrackingStatus.WORKING)}
                onClick={() => handleStatusChange(TrackingStatus.WORKING)}
              >
                <Clock size={24} />
                <div>Début de journée</div>
              </Button>
              
              <Button 
                className="flex flex-col items-center gap-2 h-24"
                {...getButtonState(TrackingStatus.BREAK)}
                onClick={() => handleStatusChange(TrackingStatus.BREAK)}
              >
                <Coffee size={24} />
                <div>Début de pause</div>
              </Button>
              
              <Button 
                className="flex flex-col items-center gap-2 h-24"
                {...getButtonState(TrackingStatus.LUNCH)}
                onClick={() => handleStatusChange(TrackingStatus.LUNCH)}
              >
                <Utensils size={24} />
                <div>Pause déjeuner</div>
              </Button>
              
              <Button 
                className="flex flex-col items-center gap-2 h-24"
                variant="outline"
                {...getButtonState(TrackingStatus.CHECKED_OUT)}
                onClick={() => handleStatusChange(TrackingStatus.CHECKED_OUT)}
              >
                <LogOut size={24} />
                <div>Fin de journée</div>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <TimeTrackingHistory />
      </main>
    </div>
  );
};

export default TimeTracking;
