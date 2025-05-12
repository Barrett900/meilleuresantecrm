
import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Clock, Coffee, Utensils, LogOut, Pause, Play } from "lucide-react";
import TimeTrackingHistory from "@/components/time-tracking/TimeTrackingHistory";

enum TrackingStatus {
  CHECKED_OUT = "CHECKED_OUT",
  WORKING = "WORKING",
  BREAK = "BREAK",
  LUNCH = "LUNCH"
}

interface TimeCounter {
  hours: number;
  minutes: number;
  seconds: number;
  total: number; // Total seconds
}

const TimeTracking = () => {
  const [status, setStatus] = useState<TrackingStatus>(TrackingStatus.CHECKED_OUT);
  const [workTime, setWorkTime] = useState<TimeCounter>({ hours: 0, minutes: 0, seconds: 0, total: 0 });
  const [breakTime, setBreakTime] = useState<TimeCounter>({ hours: 0, minutes: 0, seconds: 0, total: 0 });
  const [lunchTime, setLunchTime] = useState<TimeCounter>({ hours: 0, minutes: 0, seconds: 0, total: 0 });
  const [isPaused, setIsPaused] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    
    if (status !== TrackingStatus.CHECKED_OUT && !isPaused) {
      interval = setInterval(() => {
        // Increment the appropriate counter based on current status
        if (status === TrackingStatus.WORKING) {
          setWorkTime(prev => {
            const total = prev.total + 1;
            return {
              hours: Math.floor(total / 3600),
              minutes: Math.floor((total % 3600) / 60),
              seconds: total % 60,
              total
            };
          });
        } else if (status === TrackingStatus.BREAK) {
          setBreakTime(prev => {
            const total = prev.total + 1;
            return {
              hours: Math.floor(total / 3600),
              minutes: Math.floor((total % 3600) / 60),
              seconds: total % 60,
              total
            };
          });
        } else if (status === TrackingStatus.LUNCH) {
          setLunchTime(prev => {
            const total = prev.total + 1;
            return {
              hours: Math.floor(total / 3600),
              minutes: Math.floor((total % 3600) / 60),
              seconds: total % 60,
              total
            };
          });
        }
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [status, isPaused]);
  
  // Dans une application réelle, nous utiliserions un back-end pour stocker ces informations
  const handleStatusChange = (newStatus: TrackingStatus) => {
    // If we're changing from one status to another, make sure the timer isn't paused
    if (isPaused) setIsPaused(false);
    
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

  const togglePause = () => {
    setIsPaused(!isPaused);
    toast({
      title: isPaused ? "Compteur repris" : "Compteur en pause",
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

  // Format time display
  const formatTime = (time: TimeCounter) => {
    return `${time.hours.toString().padStart(2, '0')}:${time.minutes.toString().padStart(2, '0')}:${time.seconds.toString().padStart(2, '0')}`;
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
            {/* Time counters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardHeader className="py-2">
                  <CardTitle className="text-sm flex items-center">
                    <Clock size={18} className="mr-2" /> Temps de travail
                  </CardTitle>
                </CardHeader>
                <CardContent className="py-2">
                  <div className="text-2xl font-bold text-center">{formatTime(workTime)}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="py-2">
                  <CardTitle className="text-sm flex items-center">
                    <Coffee size={18} className="mr-2" /> Temps de pause
                  </CardTitle>
                </CardHeader>
                <CardContent className="py-2">
                  <div className="text-2xl font-bold text-center">{formatTime(breakTime)}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="py-2">
                  <CardTitle className="text-sm flex items-center">
                    <Utensils size={18} className="mr-2" /> Temps de déjeuner
                  </CardTitle>
                </CardHeader>
                <CardContent className="py-2">
                  <div className="text-2xl font-bold text-center">{formatTime(lunchTime)}</div>
                </CardContent>
              </Card>
            </div>
            
            {status !== TrackingStatus.CHECKED_OUT && (
              <div className="flex justify-center mb-6">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full md:w-auto"
                  onClick={togglePause}
                >
                  {isPaused ? <Play className="mr-2" size={20} /> : <Pause className="mr-2" size={20} />}
                  {isPaused ? "Reprendre le compteur" : "Mettre en pause le compteur"}
                </Button>
              </div>
            )}
            
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
