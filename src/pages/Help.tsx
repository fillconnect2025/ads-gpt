
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Search, Book, HelpCircle, FileText, Video, MessageSquare, User, Users, BarChart, Settings, Facebook, Info } from "lucide-react";

const Help = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Artigos em destaque
  const featuredArticles = [
    {
      title: "Começando com o Ads-GPT",
      description: "Um guia completo para novos usuários da plataforma",
      icon: <Info className="h-5 w-5 text-primary" />,
      category: "Iniciando"
    },
    {
      title: "Criando sua primeira campanha",
      description: "Aprenda a configurar e lançar campanhas eficientes",
      icon: <Facebook className="h-5 w-5 text-blue-600" />,
      category: "Campanhas"
    },
    {
      title: "Entendendo relatórios e métricas",
      description: "Como interpretar os dados e métricas de suas campanhas",
      icon: <BarChart className="h-5 w-5 text-green-600" />,
      category: "Análise"
    },
    {
      title: "Configurações de conta e usuários",
      description: "Gerencie suas configurações e permissões de usuários",
      icon: <Settings className="h-5 w-5 text-purple-600" />,
      category: "Configurações"
    },
  ];
  
  // FAQs frequentes
  const faqs = [
    {
      question: "Como criar uma nova campanha?",
      answer: "Para criar uma nova campanha, acesse o menu 'Gerenciamento de Campanhas' e clique no botão 'Nova Campanha'. Preencha todos os campos necessários incluindo nome, objetivo, plataforma, orçamento e período da campanha. Após preencher todos os detalhes, clique em 'Criar Campanha'."
    },
    {
      question: "Como interpretar os resultados das minhas campanhas?",
      answer: "Na página 'Análise de Campanhas', você encontrará diversos gráficos e métricas que mostram o desempenho de suas campanhas. Os principais indicadores incluem alcance, engajamento, cliques, conversões e ROI. Você pode filtrar por período e campanha específica para análises mais detalhadas."
    },
    {
      question: "Como integrar minha conta do Facebook Ads?",
      answer: "Para integrar sua conta do Facebook Ads, vá até a página 'Integração' e clique no botão 'Conectar com Facebook'. Você será redirecionado para fazer login na sua conta do Facebook e autorizar o acesso. Após a autorização, suas contas e campanhas do Facebook Ads serão sincronizadas automaticamente."
    },
    {
      question: "É possível exportar relatórios?",
      answer: "Sim! Na página 'Relatórios', você pode personalizar os dados que deseja incluir e, em seguida, clicar no botão 'Exportar' no canto superior direito. Os relatórios podem ser exportados em formatos PDF, CSV ou Excel."
    },
    {
      question: "Como posso mudar as configurações de notificações?",
      answer: "Acesse a página 'Configurações' e selecione a aba 'Notificações'. Lá você poderá personalizar quais tipos de alertas deseja receber, a frequência e o método de entrega (e-mail, notificações no app, etc)."
    },
  ];

  // Categorias de documentação
  const docCategories = [
    { 
      name: "Guias Rápidos", 
      icon: <FileText className="h-5 w-5" />,
      count: 12
    },
    { 
      name: "Tutoriais em Vídeo", 
      icon: <Video className="h-5 w-5" />,
      count: 8
    },
    { 
      name: "FAQs", 
      icon: <HelpCircle className="h-5 w-5" />,
      count: 24
    },
    { 
      name: "Glossário", 
      icon: <Book className="h-5 w-5" />,
      count: 36
    },
  ];

  // Filtrar FAQs baseado na pesquisa
  const filteredFaqs = searchQuery 
    ? faqs.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqs;

  return (
    <div className="container py-6 space-y-6">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h1 className="text-3xl font-bold mb-4">Central de Ajuda</h1>
        <p className="text-muted-foreground mb-6">
          Encontre respostas, tutoriais e guias para utilizar o Ads-GPT da melhor forma possível
        </p>
        
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            type="search"
            placeholder="Buscar por artigos, tutoriais ou perguntas frequentes..."
            className="pl-10 h-12"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="documentation">
        <TabsList className="grid grid-cols-3 max-w-md mx-auto mb-6">
          <TabsTrigger value="documentation">Documentação</TabsTrigger>
          <TabsTrigger value="faq">Perguntas Frequentes</TabsTrigger>
          <TabsTrigger value="contact">Suporte</TabsTrigger>
        </TabsList>
        
        <TabsContent value="documentation" className="space-y-6">
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-6">Artigos em Destaque</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredArticles.map((article, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      {article.icon}
                      <span className="text-xs bg-muted px-2 py-1 rounded-full">
                        {article.category}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h3 className="font-medium mb-1">{article.title}</h3>
                    <p className="text-sm text-muted-foreground">{article.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-6">Explorar por Categoria</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {docCategories.map((category, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6 flex items-center space-x-4">
                    <div className="p-3 rounded-full bg-primary/10">
                      {category.icon}
                    </div>
                    <div>
                      <h3 className="font-medium">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">{category.count} artigos</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </TabsContent>

        <TabsContent value="faq">
          <Card>
            <CardHeader>
              <CardTitle>Perguntas Frequentes</CardTitle>
              <CardDescription>
                Respostas para as perguntas mais comuns sobre o Ads-GPT
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filteredFaqs.length === 0 ? (
                <div className="text-center py-8">
                  <HelpCircle className="mx-auto h-12 w-12 text-muted-foreground/60 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Nenhum resultado encontrado</h3>
                  <p className="text-muted-foreground">
                    Não encontramos respostas para sua pesquisa. Tente outros termos ou entre em contato com o suporte.
                  </p>
                </div>
              ) : (
                <Accordion type="single" collapsible className="w-full">
                  {filteredFaqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger>{faq.question}</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-center">Chat ao Vivo</CardTitle>
                <CardDescription className="text-center">
                  Converse com nossa equipe de suporte em tempo real
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Disponível de segunda a sexta, das 9h às 18h
                </p>
                <Button className="w-full">Iniciar Chat</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-center">Suporte por E-mail</CardTitle>
                <CardDescription className="text-center">
                  Envie sua dúvida e receba uma resposta em até 24h
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Nosso tempo médio de resposta é de 6 horas
                </p>
                <Button variant="outline" className="w-full">
                  Enviar E-mail
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-center">Comunidade</CardTitle>
                <CardDescription className="text-center">
                  Conecte-se com outros usuários do Ads-GPT
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Compartilhe experiências e aprenda com outros usuários
                </p>
                <Button variant="outline" className="w-full">
                  Acessar Fórum
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Help;
