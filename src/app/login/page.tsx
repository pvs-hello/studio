import { mockLogin } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LogIn } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-headline">Welcome Back</CardTitle>
          <CardDescription>
            This is a placeholder login page. Click below to simulate signing in.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={mockLogin}>
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
              <LogIn className="mr-2 h-4 w-4" />
              Sign In as Mock
            </Button>
          </form>
           <p className="px-8 mt-4 text-center text-sm text-muted-foreground">
            In a real app, this page would contain Firebase Google Sign-In and email/password forms.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
