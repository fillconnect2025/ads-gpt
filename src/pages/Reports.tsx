import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Download, Filter, RefreshCw } from "lucide-react";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { toast } from "sonner";
import { useTokens } from '@/context/TokenContext';
import { trackTokenUsage } from '@/services/tokenService';

const Reports = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<string>("todas");
  const [reportGenerated, setReportGenerated] = useState(false);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [dateRange, setDateRange] = useState({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  });
  
  const { tokens, consumeToken } = useTokens();

  useEffect(() => {
    const mockCampaigns = [
      { id: '1', name: 'Campanha de Verão' },
      { id: '2', name: 'Lançamento de Produto' },
      { id: '3', name: 'Promoção Black Friday' },
      { id: '4', name: 'Campanha de Natal' },
      { id: '5', name: 'Remarketing Carrinho Abandonado' },
    ];
    
    setCampaigns(mockCampaigns);
  }, []);

  const handleGenerateReport = () => {
    if (tokens <= 0) {
      toast.error("Você não tem tokens suficientes. Por favor, atualize seu plano.");
      return;
    }
    
    setIsLoading(true);
    
    setTimeout(() => {
      consumeToken();
      trackTokenUsage('report', selectedCampaign);
      setIsLoading(false);
      setReportGenerated(true);
      toast.success("Relatório gerado com sucesso!");
    }, 2000);
  };

  const handleDownload = () => {
    toast.success("Relatório baixado com sucesso!");
  };

  const handleDateRangeChange = (range: { from: Date; to?: Date }) => {
    setDateRange({
      from: range.from,
      to: range.to || range.from
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Relatórios</h1>
          <p className="text-muted-foreground">
            Gere e baixe relatórios detalhados sobre suas campanhas
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="md:col-span-1 lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filtros do Relatório
            </CardTitle>
            <CardDescription>
              Selecione os filtros para gerar seu relatório
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="campaign">Campanha</Label>
              <Select 
                value={selectedCampaign} 
                onValueChange={setSelectedCampaign}
              >
                <SelectTrigger id="campaign">
                  <SelectValue placeholder="Selecione a campanha" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas as campanhas</SelectItem>
                  {campaigns.map(campaign => (
                    <SelectItem key={campaign.id} value={campaign.id}>
                      {campaign.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Período</Label>
              <DateRangePicker
                dateRange={dateRange}
                onDateRangeChange={handleDateRangeChange}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full" 
              onClick={handleGenerateReport}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Gerando...
                </>
              ) : (
                "Gerar Relatório"
              )}
            </Button>
          </CardFooter>
        </Card>

        <Card className="md:col-span-1 lg:col-span-1">
          <CardHeader>
            <CardTitle>Tokens Disponíveis</CardTitle>
            <CardDescription>
              Cada relatório gerado consome 1 token
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center py-6">
              <div className="text-5xl font-bold">{tokens}</div>
              <div className="text-sm text-muted-foreground mt-2">
                tokens restantes
              </div>
            </div>
            <div className="text-center text-sm">
              <a href="/plans" className="text-primary hover:underline">
                Adquirir mais tokens →
              </a>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle>Status do Relatório</CardTitle>
            <CardDescription>
              {reportGenerated 
                ? "Seu relatório foi gerado e está pronto para download"
                : "Nenhum relatório gerado ainda"
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {reportGenerated ? (
              <div className="text-center py-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 mb-4">
                  <svg
                    className="w-6 h-6 text-green-600 dark:text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-1">Relatório Completo</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {selectedCampaign === "todas" 
                    ? "Todas as campanhas" 
                    : campaigns.find(c => c.id === selectedCampaign)?.name
                  }
                </p>
                <Button 
                  variant="outline" 
                  className="gap-2" 
                  onClick={handleDownload}
                >
                  <Download className="h-4 w-4" />
                  Baixar Relatório
                </Button>
              </div>
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                Gere um relatório para visualizar as estatísticas
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Relatórios Recentes</CardTitle>
          <CardDescription>
            Histórico dos últimos relatórios gerados
          </CardDescription>
        </CardHeader>
        <CardContent>
          {reportGenerated ? (
            <div className="divide-y">
              <div className="py-3 flex items-center justify-between">
                <div>
                  <div className="font-medium">
                    {selectedCampaign === "todas" 
                      ? "Todas as campanhas" 
                      : campaigns.find(c => c.id === selectedCampaign)?.name
                    }
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {dateRange.from.toLocaleDateString('pt-BR')} até {dateRange.to.toLocaleDateString('pt-BR')}
                  </div>
                </div>
                <Button size="sm" variant="outline" className="gap-1" onClick={handleDownload}>
                  <Download className="h-3 w-3" />
                  Baixar
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              Nenhum relatório gerado ainda
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
