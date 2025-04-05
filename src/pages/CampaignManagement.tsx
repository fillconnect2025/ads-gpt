
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CheckCircle, PlusCircle, Edit, Trash2, Facebook, Instagram, Target, DollarSign, Calendar, BarChart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Esquema para validação do formulário de campanha
const campaignFormSchema = z.object({
  nome: z.string().min(3, {
    message: "O nome da campanha deve ter pelo menos 3 caracteres",
  }),
  objetivo: z.string({
    required_error: "Por favor selecione um objetivo para a campanha",
  }),
  plataforma: z.string({
    required_error: "Por favor selecione uma plataforma",
  }),
  orcamento: z.string().refine((val) => !isNaN(Number(val)), {
    message: "O orçamento deve ser um número",
  }),
  dataInicio: z.string().min(1, {
    message: "Por favor selecione uma data de início",
  }),
  dataFim: z.string().min(1, {
    message: "Por favor selecione uma data de término",
  }),
  descricao: z.string().optional(),
});

type Campaign = z.infer<typeof campaignFormSchema> & { id: string; status: string };

const CampaignManagement = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("todas");
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: "1",
      nome: "Campanha de Verão 2023",
      objetivo: "conversao",
      plataforma: "facebook",
      orcamento: "1000",
      dataInicio: "2023-12-01",
      dataFim: "2023-12-31",
      descricao: "Promoção de produtos para o verão com desconto especial",
      status: "ativa"
    },
    {
      id: "2",
      nome: "Black Friday - Produtos Eletrônicos",
      objetivo: "trafego",
      plataforma: "instagram",
      orcamento: "2500",
      dataInicio: "2023-11-20",
      dataFim: "2023-11-27",
      descricao: "Campanha especial para Black Friday focada em eletrônicos",
      status: "pausada"
    }
  ]);

  const form = useForm<z.infer<typeof campaignFormSchema>>({
    resolver: zodResolver(campaignFormSchema),
    defaultValues: {
      nome: "",
      objetivo: "",
      plataforma: "",
      orcamento: "",
      dataInicio: "",
      dataFim: "",
      descricao: "",
    },
  });

  const onSubmit = (values: z.infer<typeof campaignFormSchema>) => {
    if (isEditing) {
      // Editar campanha existente
      setCampaigns(campaigns.map(camp => 
        camp.id === isEditing 
          ? { ...camp, ...values }
          : camp
      ));
      
      toast({
        title: "Campanha atualizada",
        description: "As alterações foram salvas com sucesso",
      });
      
      setIsEditing(null);
    } else {
      // Criar nova campanha
      const newCampaign: Campaign = {
        id: Date.now().toString(),
        ...values,
        status: "ativa"
      };
      
      setCampaigns([...campaigns, newCampaign]);
      
      toast({
        title: "Campanha criada",
        description: "Sua nova campanha foi criada com sucesso",
      });
    }
    
    form.reset();
    setIsCreating(false);
  };

  const handleEditCampaign = (campaign: Campaign) => {
    form.reset(campaign);
    setIsEditing(campaign.id);
    setIsCreating(true);
  };

  const handleDeleteCampaign = (id: string) => {
    setCampaigns(campaigns.filter(camp => camp.id !== id));
    
    toast({
      title: "Campanha excluída",
      description: "A campanha foi removida com sucesso",
    });
  };

  const handleStatusChange = (id: string, status: string) => {
    setCampaigns(campaigns.map(camp => 
      camp.id === id 
        ? { ...camp, status }
        : camp
    ));
    
    toast({
      title: "Status atualizado",
      description: `A campanha agora está ${status}`,
    });
  };

  const handleCancelEdit = () => {
    setIsCreating(false);
    setIsEditing(null);
    form.reset();
  };

  // Filtragem de campanhas com base na aba ativa
  const filteredCampaigns = activeTab === "todas" 
    ? campaigns 
    : campaigns.filter(camp => camp.status === activeTab);

  // Plataformas disponíveis
  const platforms = [
    { value: "facebook", label: "Facebook", icon: Facebook },
    { value: "instagram", label: "Instagram", icon: Instagram },
  ];

  // Objetivos disponíveis
  const objectives = [
    { value: "conscientizacao", label: "Conscientização da marca" },
    { value: "trafego", label: "Tráfego" },
    { value: "engajamento", label: "Engajamento" },
    { value: "conversao", label: "Conversão" },
  ];

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gerenciamento de Campanhas</h1>
        {!isCreating && (
          <Button onClick={() => setIsCreating(true)} className="gap-2">
            <PlusCircle size={16} />
            Nova Campanha
          </Button>
        )}
      </div>

      {isCreating ? (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>{isEditing ? "Editar Campanha" : "Criar Nova Campanha"}</CardTitle>
            <CardDescription>
              {isEditing 
                ? "Atualize os detalhes da sua campanha existente" 
                : "Preencha os detalhes para criar uma nova campanha publicitária"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="nome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome da Campanha</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Promoção de Verão 2023" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="objetivo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Objetivo</FormLabel>
                        <FormControl>
                          <select 
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            {...field}
                          >
                            <option value="" disabled>Selecione um objetivo</option>
                            {objectives.map(objective => (
                              <option key={objective.value} value={objective.value}>
                                {objective.label}
                              </option>
                            ))}
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="plataforma"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Plataforma</FormLabel>
                        <FormControl>
                          <select 
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            {...field}
                          >
                            <option value="" disabled>Selecione uma plataforma</option>
                            {platforms.map(platform => (
                              <option key={platform.value} value={platform.value}>
                                {platform.label}
                              </option>
                            ))}
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="orcamento"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Orçamento (R$)</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <DollarSign className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <Input placeholder="Ex: 1000" className="pl-10" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="dataInicio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Data de Início</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="dataFim"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Data de Término</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="descricao"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição da Campanha</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Descreva os detalhes e objetivos da sua campanha..." 
                          className="min-h-[120px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Informações adicionais sobre sua campanha que ajudem a entender seus objetivos.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex gap-4 justify-end">
                  <Button type="button" variant="outline" onClick={handleCancelEdit}>
                    Cancelar
                  </Button>
                  <Button type="submit">
                    {isEditing ? "Salvar Alterações" : "Criar Campanha"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      ) : (
        <>
          <Tabs defaultValue="todas" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="todas">Todas</TabsTrigger>
              <TabsTrigger value="ativa">Ativas</TabsTrigger>
              <TabsTrigger value="pausada">Pausadas</TabsTrigger>
              <TabsTrigger value="concluida">Concluídas</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="m-0">
              {filteredCampaigns.length === 0 ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <Target className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Nenhuma campanha encontrada</h3>
                  <p className="text-muted-foreground mb-6">
                    {activeTab === "todas" 
                      ? "Você ainda não criou nenhuma campanha"
                      : `Você não tem campanhas ${activeTab === "ativa" ? "ativas" : activeTab === "pausada" ? "pausadas" : "concluídas"}`}
                  </p>
                  <Button onClick={() => setIsCreating(true)} className="gap-2">
                    <PlusCircle size={16} />
                    Criar Nova Campanha
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCampaigns.map((campaign) => (
                    <Card key={campaign.id} className="overflow-hidden">
                      <CardHeader className="bg-muted/50">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="line-clamp-1">{campaign.nome}</CardTitle>
                            <CardDescription>
                              {objectives.find(o => o.value === campaign.objetivo)?.label || campaign.objetivo}
                            </CardDescription>
                          </div>
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                            campaign.status === "ativa" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" :
                            campaign.status === "pausada" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" :
                            "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                          }`}>
                            {campaign.status === "ativa" ? "Ativa" : 
                             campaign.status === "pausada" ? "Pausada" : "Concluída"}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            {campaign.plataforma === "facebook" ? (
                              <Facebook className="h-5 w-5 text-blue-600" />
                            ) : (
                              <Instagram className="h-5 w-5 text-pink-600" />
                            )}
                            <span>{platforms.find(p => p.value === campaign.plataforma)?.label || campaign.plataforma}</span>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <DollarSign className="h-5 w-5 text-green-600" />
                            <span>R$ {Number(campaign.orcamento).toLocaleString('pt-BR')}</span>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <Calendar className="h-5 w-5 text-gray-600" />
                            <span>
                              {new Date(campaign.dataInicio).toLocaleDateString('pt-BR')} - {new Date(campaign.dataFim).toLocaleDateString('pt-BR')}
                            </span>
                          </div>
                          
                          {campaign.descricao && (
                            <p className="text-muted-foreground text-sm line-clamp-2 mt-2">
                              {campaign.descricao}
                            </p>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter className="bg-muted/30 border-t p-4">
                        <div className="flex justify-between w-full">
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => handleEditCampaign(campaign)}
                              className="h-9 px-3"
                            >
                              <Edit className="h-4 w-4 mr-1" /> Editar
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => handleDeleteCampaign(campaign.id)}
                              className="h-9 px-3 text-destructive hover:text-destructive-foreground hover:bg-destructive"
                            >
                              <Trash2 className="h-4 w-4 mr-1" /> Excluir
                            </Button>
                          </div>
                          
                          <div>
                            {campaign.status === "ativa" ? (
                              <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={() => handleStatusChange(campaign.id, "pausada")}
                                className="h-9"
                              >
                                Pausar
                              </Button>
                            ) : campaign.status === "pausada" ? (
                              <Button 
                                size="sm" 
                                onClick={() => handleStatusChange(campaign.id, "ativa")}
                                className="h-9"
                              >
                                Ativar
                              </Button>
                            ) : (
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="h-9"
                                disabled
                              >
                                Concluída
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default CampaignManagement;
