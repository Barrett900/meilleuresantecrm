
import { useParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import ContactDetail from "@/components/contacts/ContactDetail";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ContactDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const contactId = parseInt(id || "0", 10);

  if (!contactId) {
    return (
      <div className="flex-1 overflow-y-auto">
        <Header title="Contact non trouvé" />
        <main className="p-6">
          <div className="flex flex-col items-center justify-center py-12">
            <p className="mb-4">Le contact demandé n'existe pas.</p>
            <Link to="/contacts">
              <Button>
                <ChevronLeft size={18} className="mr-2" />
                Retour à la liste des contacts
              </Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <Header title="Détails du contact" />
      
      <main className="p-6">
        <div className="mb-6">
          <Link to="/contacts">
            <Button variant="outline">
              <ChevronLeft size={18} className="mr-2" />
              Retour à la liste
            </Button>
          </Link>
        </div>
        
        <ContactDetail id={contactId} />
      </main>
    </div>
  );
};

export default ContactDetailPage;
