
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Keyboard } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ShortcutGroup {
  name: string;
  shortcuts: {
    key: string;
    description: string;
  }[];
}

const shortcutGroups: ShortcutGroup[] = [
  {
    name: "Navegação",
    shortcuts: [
      { key: "g + d", description: "Ir para Dashboard" },
      { key: "g + c", description: "Ir para Gerenciar Campanhas" },
      { key: "g + a", description: "Ir para Análise de Campanhas" },
      { key: "g + r", description: "Ir para Relatórios" },
      { key: "g + i", description: "Ir para Integração" },
      { key: "g + p", description: "Ir para Planos" },
      { key: "g + h", description: "Ir para Ajuda" },
      { key: "g + s", description: "Ir para Configurações" },
    ]
  },
  {
    name: "Ações",
    shortcuts: [
      { key: "n + c", description: "Nova campanha" },
      { key: "n + r", description: "Novo relatório" },
      { key: "Ctrl + s", description: "Salvar" },
      { key: "e", description: "Editar item selecionado" },
      { key: "Esc", description: "Fechar/Cancelar" },
      { key: "/", description: "Abrir pesquisa" },
      { key: "?", description: "Mostrar atalhos de teclado" },
    ]
  },
  {
    name: "Interface",
    shortcuts: [
      { key: "b", description: "Alternar barra lateral" },
      { key: "t", description: "Alternar tema claro/escuro" },
      { key: "f", description: "Ativar modo de tela cheia" },
      { key: "m", description: "Silenciar notificações" },
    ]
  }
];

const KeyboardShortcuts = () => {
  const [open, setOpen] = useState(false);
  
  useEffect(() => {
    // Adicionar event listener para a tecla ?
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === '?' && !event.ctrlKey && !event.metaKey && !event.altKey) {
        setOpen(true);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2"
          aria-label="Atalhos de teclado"
        >
          <Keyboard className="h-4 w-4" />
          <span className="hidden sm:inline">Atalhos</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Atalhos de Teclado</DialogTitle>
          <DialogDescription>
            Use estes atalhos para navegar rapidamente pelo sistema.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 py-4 max-h-[60vh] overflow-y-auto pr-2">
          {shortcutGroups.map((group) => (
            <div key={group.name}>
              <h4 className="font-medium text-sm mb-2">{group.name}</h4>
              <div className="space-y-2">
                {group.shortcuts.map((shortcut) => (
                  <div 
                    key={shortcut.key} 
                    className="flex justify-between items-center hover:bg-muted/50 p-2 rounded-md -mx-2"
                  >
                    <span className="text-sm">{shortcut.description}</span>
                    <div className="flex gap-1">
                      {shortcut.key.split(' + ').map((part, index) => (
                        <span key={index} data-lov-id={`shortcut-part-${index}`}>
                          {index > 0 && <span className="text-muted-foreground mx-1">+</span>}
                          <kbd className="px-2 py-1 text-xs font-semibold text-muted-foreground bg-secondary rounded border border-border shadow-sm">
                            {part}
                          </kbd>
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center border-t pt-4 text-xs text-muted-foreground">
          Pressione <kbd className="px-2 py-1 mx-1 text-xs font-semibold text-muted-foreground bg-secondary rounded border border-border shadow-sm">?</kbd> a qualquer momento para mostrar esta ajuda
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default KeyboardShortcuts;
