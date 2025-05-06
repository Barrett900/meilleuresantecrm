
import { useState } from "react";
import Header from "@/components/layout/Header";
import DealsList from "@/components/deals/DealsList";
import DealForm from "@/components/deals/DealForm";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Deals = () => {
  const [isAddingDeal, setIsAddingDeal] = useState(false);

  return (
    <div className="flex-1 overflow-y-auto">
      <Header title="Affaires" />
      
      <main className="p-6">
        {isAddingDeal ? (
          <div className="mb-6">
            <Button 
              variant="outline" 
              onClick={() => setIsAddingDeal(false)}
              className="mb-4"
            >
              Retour à la liste
            </Button>
            <DealForm />
          </div>
        ) : (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Liste des affaires</h2>
              <Button onClick={() => setIsAddingDeal(true)}>
                <Plus size={18} className="mr-2" />
                Ajouter une affaire
              </Button>
            </div>
            <DealsList />
          </div>
        )}
      </main>
    </div>
  );
};

export default Deals;
