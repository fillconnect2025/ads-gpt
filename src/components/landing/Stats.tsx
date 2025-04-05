
import { Card, CardContent } from '@/components/ui/card';
import { BarChart3, Clock, LineChart, Users } from 'lucide-react';

const Stats = () => {
  const stats = [
    { icon: <BarChart3 className="h-5 w-5" />, value: "95%", label: "Aumento na eficiência", delay: 100, gradient: "from-blue-700 to-blue-900" },
    { icon: <LineChart className="h-5 w-5" />, value: "+30%", label: "ROI em campanhas", delay: 200, gradient: "from-blue-700 to-blue-900" },
    { icon: <Users className="h-5 w-5" />, value: "1.000+", label: "Clientes ativos", delay: 300, gradient: "from-blue-700 to-blue-900" },
    { icon: <Clock className="h-5 w-5" />, value: "24/7", label: "Suporte técnico", delay: 400, gradient: "from-blue-700 to-blue-900" }
  ];

  return (
    <div className="container mt-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
        {stats.map((stat, index) => (
          <Card key={index} className={`border-0 bg-gradient-to-br ${stat.gradient} text-white backdrop-blur-sm transition-all duration-500 hover:shadow-lg hover:-translate-y-1 animate-fade-in overflow-hidden group hover:bg-gradient-to-tl`} style={{animationDelay: `${stat.delay}ms`}}>
            <CardContent className="p-6 text-center">
              <div className="rounded-full mx-auto mb-2 bg-white/20 p-2 w-10 h-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-bold">{stat.value}</h3>
              <p className="text-sm text-white/80">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Stats;
