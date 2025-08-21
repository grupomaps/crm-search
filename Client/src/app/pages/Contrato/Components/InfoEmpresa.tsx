import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface EmpresaProps {
  empresa: {
    nomeFantasia?: string;
    razaoSocial?: string;
    cnpj?: string;
    cpf?: string;
    fixo?: string;
    celular?: string;
    whatsapp?: string;
    enderecoComercial?: string;
    numeroResidencial?: string;
    bairro?: string;
    cidade?: string;
    estado?: string;
    cep?: string;
    email1?: string;
    linkGoogle?: string;
    horarioFuncionamento?: string;
    observacoes?: string;
    responsavel?: string;
    cargo?: string;
    validade?: string;
    valorVenda?: string;
    dataVencimento: string;
  };
}

const InfoEmpresa: React.FC<EmpresaProps> = ({ empresa }) => {
  // Move format helpers above usage
  const formatCNPJ = (cnpj?: string) => {
    if (!cnpj) return "Não Informado";
    const digits = cnpj.replace(/\D/g, "");
    return digits.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
      "$1.$2.$3/$4-$5"
    );
  };

  const formatCPF = (cpf?: string) => {
    if (!cpf) return "Não Informado";
    const digits = cpf.replace(/\D/g, "");
    return digits.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
  };

  const formatTelefone = (telefone?: string) => {
    if (!telefone) return "Não Informado";
    const digits = telefone.replace(/\D/g, "");
    if (digits.length === 11) {
      return digits.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
    } else if (digits.length === 10) {
      return digits.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3");
    }
    return telefone;
  };

  const formatCEP = (cep?: string) => {
    if (!cep) return "Não Informado";
    const digits = cep.replace(/\D/g, "");
    return digits.replace(/^(\d{5})(\d{3})$/, "$1-$2");
  };

  const camposEmpresa = [
    { label: "Nome Fantasia", value: empresa.nomeFantasia  },
    { label: "Razão Social", value: empresa.razaoSocial },
    { label: "CNPJ", value: empresa.cnpj, formatar: formatCNPJ  },
    { label: "CPF", value: empresa.cpf, formatar: formatCPF },
    { label: "Telefone", value: empresa.whatsapp, formatar: formatTelefone },
    { label: "Whatsapp", value: empresa.celular, formatar: formatTelefone },
    { label: "Endereço", value: empresa.enderecoComercial },
    { label: "Número Residencial", value: empresa.numeroResidencial },
    { label: "Bairro", value: empresa.bairro },
    { label: "Cidade", value: empresa.cidade },
    { label: "Estado", value: empresa.estado },
    { label: "CEP", value: empresa.cep, formatar: formatCEP },
    { label: "E-mail", value: empresa.email1 },
  ];

  const camposAdicionais = [
    { label: "Link da Página do Google", value: empresa.linkGoogle },
    { label: "Alcance da Campanha", value: "Não Definido" },
    { label: "Horário de Atendimento", value: empresa.horarioFuncionamento },
    { label: "Observações", value: empresa.observacoes },
  ];

  const metade = Math.ceil(camposEmpresa.length / 2);
  const primeiraColuna = camposEmpresa.slice(0, metade);
  const segundaColuna = camposEmpresa.slice(metade);

  const formatValor = (value: string | number | undefined): string => {
    if (!value) return "0,00"; // Retorna um valor padrão caso seja undefined ou null
    const num =
      typeof value === "number" ? value.toFixed(2) : value.replace(/\D/g, "");
    return num.replace(/(\d)(\d{2})$/, "$1,$2");
  };

  const formatarData = (dataVencimento: string) => {
    const [ano, mes, dia] = dataVencimento.split("-");
    return `${dia}/${mes}/${ano}`;
  };

  return (
    <section>
      <div className="info-empresa-contrato mt-2 colunas-duplas">
        <div>
          {primeiraColuna.map((campo, index) => {
            const valorFormatado = campo.formatar
              ? campo.formatar(campo.value)
              : campo.value || "Não Informado";
            return (
              <p key={index}>
                {campo.label}: <strong>{valorFormatado}</strong>
              </p>
            );
          })}
        </div>
        <div>
          {segundaColuna.map((campo, index) => {
            const valorFormatado = campo.formatar
              ? campo.formatar(campo.value)
              : campo.value || "Não Informado";
            return (
              <p key={index}>
                {campo.label}: <strong>{valorFormatado}</strong>
              </p>
            );
          })}
        </div>
      </div>

      <div className="info-empresa-contrato mt-2">
        <div className="icon-header-container my-2 mb-4">
          <FontAwesomeIcon
            icon={faUser}
            className="icon-header"
            color="#FCD658"
          />
          <p>Dados Adicionais</p>
        </div>
        {camposAdicionais.map((campo, index) => (
          <p key={index}>
            {campo.label}: <strong>{campo.value || "-"}</strong>
          </p>
        ))}
      </div>

      <div className="info-valor-contrato">
        <div className="col-md-4">
          <img src="/img/mao_ads.png" alt="" className="img-mao" />
        </div>
        <div className="col-md-8">
          <p>
            Tipo de Plano: <strong>{empresa.validade || "-"}</strong>
          </p>
          <p>
            Valor:{" "}
            <strong>
              R$ {formatValor(empresa.valorVenda)} através de Boleto Bancário
            </strong>
          </p>
          <p>
            Data de Vencimento:{" "}
            <strong>{formatarData(empresa.dataVencimento)}</strong>
          </p>
        </div>
      </div>
    </section>
  );
};

export default InfoEmpresa;
