import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar, Upload, X } from "lucide-react";
import { ICampaignObjective, IAiAnalysisFormData } from '@/@types/integrations.type';
import { isDateInThePast } from '@/utils/help';

const formSchema = z.object({
  campaign_name: z.string().min(3, {
    message: "O nome da campanha deve ter pelo menos 3 caracteres",
  }),
  start_date: z.string().min(1, {
    message: "Por favor selecione uma data de início",
  }),
  end_date: z.string().min(1, {
    message: "Por favor selecione uma data de término",
  }),
  objective: z.string({
    required_error: "Por favor selecione um objetivo",
  }),
  data_source: z.enum(['csv', 'api']),
  file: z.instanceof(File).optional(),
}).refine((data) => {
  if (data.data_source === 'csv') {
    return !!data.file;
  }
  return true;
}, {
  message: "Por favor faça upload de um arquivo CSV",
  path: ["file"]
}).refine((data) => {
  const startDate = new Date(data.start_date);
  const endDate = new Date(data.end_date);
  return endDate >= startDate;
}, {
  message: "A data final deve ser igual ou posterior à data inicial",
  path: ["end_date"]
});

interface AnalysisFormProps {
  onSubmit: (data: IAiAnalysisFormData) => void;
  isSubmitting: boolean;
  objectives: ICampaignObjective[];
}

const AnalysisForm = ({ onSubmit, isSubmitting, objectives }: AnalysisFormProps) => {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      campaign_name: "",
      start_date: "",
      end_date: "",
      objective: "",
      data_source: "api",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      form.setValue("file", file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    form.setValue("file", undefined);
  };

  const dataSource = form.watch("data_source");

  const handleFormSubmit = (data: z.infer<typeof formSchema>) => {
    const formData: IAiAnalysisFormData = {
      campaign_name: data.campaign_name,
      start_date: data.start_date,
      end_date: data.end_date,
      objective: data.objective,
      data_source: data.data_source,
      file: data.file,
    };
    onSubmit(formData);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Nova Análise de Campanha</CardTitle>
        <CardDescription>
          Preencha os dados da campanha para realizar uma análise com inteligência artificial
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form id="analysis-form" onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="campaign_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da Campanha</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Campanha Verão 2023" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="start_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data de Início</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input type="date" className="pl-10" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="end_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data de Término</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input type="date" className="pl-10" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="objective"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Objetivo da Campanha</FormLabel>
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
              name="data_source"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fonte de Dados</FormLabel>
                  <div className="flex space-x-4">
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          id="api" 
                          value="api" 
                          checked={field.value === 'api'}
                          onChange={() => form.setValue('data_source', 'api')}
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                        />
                        <label htmlFor="api" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Meta Ads API
                        </label>
                      </div>
                    </FormControl>
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          id="csv" 
                          value="csv" 
                          checked={field.value === 'csv'}
                          onChange={() => form.setValue('data_source', 'csv')}
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                        />
                        <label htmlFor="csv" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Upload CSV
                        </label>
                      </div>
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {dataSource === 'csv' && (
              <FormField
                control={form.control}
                name="file"
                render={() => (
                  <FormItem>
                    <FormLabel>Arquivo CSV</FormLabel>
                    <FormControl>
                      {!selectedFile ? (
                        <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center">
                          <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground mb-2">
                            Arraste e solte seu arquivo CSV ou
                          </p>
                          <Button type="button" variant="outline" onClick={() => document.getElementById('file-upload')?.click()}>
                            Selecionar Arquivo
                          </Button>
                          <input
                            id="file-upload"
                            type="file"
                            accept=".csv"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                        </div>
                      ) : (
                        <div className="flex items-center justify-between p-3 border rounded-md">
                          <span className="text-sm truncate max-w-xs">{selectedFile.name}</span>
                          <Button type="button" variant="ghost" size="sm" onClick={handleRemoveFile}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </FormControl>
                    <FormDescription>
                      Faça upload de um arquivo CSV contendo os dados da campanha
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button form="analysis-form" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Processando..." : "Analisar com I.A."}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AnalysisForm;
