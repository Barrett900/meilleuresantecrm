
import { Users, Briefcase, Calendar, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const DashboardCards = () => {
  const cards = [
    {
      title: "Total Contacts",
      value: "1,234",
      icon: Users,
      color: "bg-blue-50 text-blue-600",
      change: "+5.2%",
    },
    {
      title: "Affaires Actives",
      value: "42",
      icon: Briefcase,
      color: "bg-green-50 text-green-600",
      change: "+2.4%",
    },
    {
      title: "Activités à Venir",
      value: "8",
      icon: Calendar,
      color: "bg-purple-50 text-purple-600",
      change: "-1.5%",
    },
    {
      title: "Affaires Gagnées",
      value: "€86,400",
      icon: Star,
      color: "bg-amber-50 text-amber-600",
      change: "+12.3%",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">{card.title}</p>
                <h3 className="text-2xl font-bold mt-1 text-gray-800">{card.value}</h3>
                <p className={`text-sm mt-2 ${card.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {card.change} depuis le mois dernier
                </p>
              </div>
              <div className={`p-3 rounded-full ${card.color}`}>
                <card.icon size={22} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardCards;
