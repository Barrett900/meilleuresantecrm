
import { useState } from "react";
import Header from "@/components/layout/Header";
import ContactsList from "@/components/contacts/ContactsList";
import ContactForm from "@/components/contacts/ContactForm";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Contacts = () => {
  const [isAddingContact, setIsAddingContact] = useState(false);

  return (
    <div className="flex-1 overflow-y-auto">
      <Header title="Contacts" />
      
      <main className="p-6">
        {isAddingContact ? (
          <div className="mb-6">
            <Button 
              variant="outline" 
              onClick={() => setIsAddingContact(false)}
              className="mb-4"
            >
              Retour à la liste
            </Button>
            <ContactForm />
          </div>
        ) : (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Liste des contacts</h2>
              <Button onClick={() => setIsAddingContact(true)}>
                <Plus size={18} className="mr-2" />
                Ajouter un contact
              </Button>
            </div>
            <ContactsList />
          </div>
        )}
      </main>
    </div>
  );
};

export default Contacts;
