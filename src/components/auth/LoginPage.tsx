
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LogIn } from "lucide-react";

interface LoginPageProps {
  onLogin: (email: string, password: string) => string | null;
}

const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Simulate network delay
    setTimeout(() => {
      const errorMessage = onLogin(email, password);
      if (errorMessage) {
        setError(errorMessage);
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-bold text-blue-600">MEILLEURE SANTE CRM</CardTitle>
          <CardDescription>
            Connectez-vous pour accéder à votre espace de travail
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Mot de passe</Label>
                <a href="#" className="text-sm text-blue-600 hover:underline">
                  Mot de passe oublié?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <div className="text-sm text-red-600 mt-2">
                {error}
              </div>
            )}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                "Connexion en cours..."
              ) : (
                <>
                  <LogIn className="mr-2 h-4 w-4" />
                  Se connecter
                </>
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col text-center text-sm text-gray-500">
          <div className="w-full mb-4">
            <p>Pour une démonstration:</p>
            <p className="mt-1">Admin: admin@meilleure-sante.com / admin123</p>
            <p>Agent: agent@meilleure-sante.com / agent123</p>
          </div>
          <div className="w-full flex justify-center mt-2">
            <img 
              src="/lovable-uploads/08593941-c533-4f05-967c-12ea1ca99049.png" 
              alt="Assurancia Courtage" 
              className="h-16 object-contain"
            />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
