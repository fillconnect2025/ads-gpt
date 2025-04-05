
import {
  Benefits,
  Contact,
  Cta,
  Demo,
  Features,
  Footer,
  Header,
  Hero,
  Pricing
} from '@/components/landing';

const Landing = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 overflow-x-hidden">
      <Header />
      
      {/* Hero Section with Stats */}
      <Hero />


      {/* Features Section */}
      <Features />


      {/* Benefits Section with Waves */}
      <Benefits />


      {/* Pricing Section */}
      <Pricing />

      {/* Demo Section */}
      <Demo />


      {/* Contact Section */}
      <Contact />

      {/* CTA Section */}
      <Cta />

      {/* Footer */}
      <Footer />
    </div>
  );
};

// Helper functions needed for other components
export const getPlanMaxTokens = (plan: string) => {
  const planTokens = {
    free: 1000,
    starter: 5000,
    professional: 20000,
    enterprise: 100000
  };
  return planTokens[plan] || 1000;
};

export const planDisplayName = {
  free: 'Gratuito',
  starter: 'Iniciante',
  professional: 'Profissional',
  enterprise: 'Empresarial'
};

export const addMonthToToday = () => {
  const today = new Date();
  return new Date(today.setMonth(today.getMonth() + 1));
};

export default Landing;
