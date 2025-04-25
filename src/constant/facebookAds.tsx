import { Badge } from "@/components/ui/badge";

export const adAccountStatusBadge = (status: number) => {
  switch (status) {
    case 1: // ACTIVE
      return <Badge className="bg-green-500 hover:bg-green-600">Ativa</Badge>;
    case 2: // DISABLED
      return (
        <Badge className="bg-gray-500 hover:bg-gray-600">Desativada</Badge>
      );
    case 3: // UNSETTLED
      return (
        <Badge className="bg-yellow-500 hover:bg-yellow-600 text-black">
          Pagamento Pendente
        </Badge>
      );
    case 7: // PENDING_RISK_REVIEW
      return (
        <Badge className="bg-orange-500 hover:bg-orange-600">
          Em Análise de Risco
        </Badge>
      );
    case 8: // PENDING_SETTLEMENT
      return (
        <Badge className="bg-orange-400 hover:bg-orange-600 text-black">
          Aguardando Liquidação
        </Badge>
      );
    case 9: // IN_GRACE_PERIOD
      return (
        <Badge className="bg-blue-400 hover:bg-blue-600">
          Período de Carência
        </Badge>
      );
    case 100: // PENDING_CLOSURE
      return (
        <Badge className="bg-red-400 hover:bg-red-600">
          Aguardando Encerramento
        </Badge>
      );
    case 101: // CLOSED
      return <Badge className="bg-red-600 hover:bg-red-600">Encerrada</Badge>;
    case 201: // ANY_ACTIVE
      return (
        <Badge className="bg-green-400 hover:bg-green-600">
          Qualquer Conta Ativa
        </Badge>
      );
    case 202: // ANY_CLOSED
      return (
        <Badge className="bg-gray-400 hover:bg-gray-600">
          Qualquer Conta Encerrada
        </Badge>
      );

    default:
      return <Badge variant="secondary">Status: {status}</Badge>;
  }
};