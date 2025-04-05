

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-zinc-950 dark:to-zinc-900 py-12 border-t">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 transition-transform hover:scale-105 duration-300">
              <img 
                src="/uploads/e73c30b4-497e-4698-8624-51e217934707.png" 
                alt="Ads-GPT Logo" 
                className="h-8" 
              />
              <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">Ads-GPT</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Análise inteligente de campanhas de Facebook Ads.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#recursos" className="text-muted-foreground hover:text-foreground transition-colors duration-200">Recursos</a></li>
              <li><a href="#beneficios" className="text-muted-foreground hover:text-foreground transition-colors duration-200">Benefícios</a></li>
              <li><a href="#planos" className="text-muted-foreground hover:text-foreground transition-colors duration-200">Planos</a></li>
              <li><a href="#contato" className="text-muted-foreground hover:text-foreground transition-colors duration-200">Contato</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Empresa</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200">Sobre Nós</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200">Blog</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200">Carreiras</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200">Termos de Serviço</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200">Política de Privacidade</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                contato@adsgpt.com
              </li>
              <li className="text-muted-foreground flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                +55 11 99999-9999
              </li>
              <li className="text-muted-foreground flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                São Paulo, SP - Brasil
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Ads-GPT. Todos os direitos reservados.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-200">Termos</a>
            <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-200">Privacidade</a>
            <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-200">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
