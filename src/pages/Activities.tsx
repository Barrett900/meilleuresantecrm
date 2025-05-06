
import { useState } from "react";
import Header from "@/components/layout/Header";
import ActivitiesList from "@/components/activities/ActivitiesList";
import ActivityForm from "@/components/activities/ActivityForm";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Activities = () => {
  const [isAddingActivity, setIsAddingActivity] = useState(false);

  return (
    <div className="flex-1 overflow-y-auto">
      <Header title="Activités" />
      
      <main className="p-6">
        {isAddingActivity ? (
          <div className="mb-6">
            <Button 
              variant="outline" 
              onClick={() => setIsAddingActivity(false)}
              className="mb-4"
            >
              Retour à la liste
            </Button>
            <ActivityForm />
          </div>
        ) : (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Liste des activités</h2>
              <Button onClick={() => setIsAddingActivity(true)}>
                <Plus size={18} className="mr-2" />
                Ajouter une activité
              </Button>
            </div>
            <ActivitiesList />
          </div>
        )}
      </main>
    </div>
  );
};

export default Activities;
