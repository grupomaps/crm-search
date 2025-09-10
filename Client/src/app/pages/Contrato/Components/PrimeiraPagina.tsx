import React from "react";
import TitleContrato from "./TitleContrato";
import {
  formatCelular,
  formatCEP,
  formatCNPJ,
  formatCPF,
  formatDateToBrazilian,
} from "../../../../utils/formatters";

interface EmpresaData {
  razaoSocial: string;
  cpf: string;
  cnpj: string;
  whatsapp: string;
  email1: string;
  enderecoComercial: string;
  bairro: string;
  cep: string;
  estado: string;
  numeroContrato: string;
  data: string;
  linkGoogle: string;
  horarios?: { [dia: string]: string };
  responsavel: string;
  cargo: string;
}

interface PrimeiraPaginaProps {
  empresaData: EmpresaData;
}

const PrimeiraPagina: React.FC<PrimeiraPaginaProps> = ({ empresaData }) => {
  return (
    <div className="primeiraPagina">
      <div className="faixa-roxa-bottom">
        <span>SAC@GOOADSGESTÃO.COM.BR</span>
        <span>11 5555-2086</span>
      </div>
      <div className="primeiraPaginaContent pt-2 px-5">
        <div className="header-primeira d-flex justify-content-between align-items-start">
          <div>
            <h1 className="m-0 fw-bold" style={{ fontSize: "2.2rem" }}>
              <span style={{ color: "#582c83" }}>GOO GESTÃO DE</span>
              <br />
              <span style={{ color: "#ec4b5b" }}>AN</span>
              <span style={{ color: "#F4B400" }}>Ú</span>
              <span style={{ color: "#0F9D58" }}>N</span>
              <span style={{ color: "#4285F4" }}>C</span>
              <span style={{ color: "#ff914d" }}>IO</span>
              <span style={{ color: "#0F9D58" }}>S</span>
              <br />
              <span style={{ color: "#4285F4", fontSize: "1.2rem" }}>
                PARA ADS
              </span>
            </h1>
          </div>
          <div className="text-end">
            <div style={{ fontSize: "12px" }}>AUTORIZAÇÃO DE DIVULGAÇÃO</div>
            <div style={{ fontSize: "12px" }}>PARA ASSESSORIA DE SERVIÇOS</div>
            <div className="mt-2 text-start" style={{ fontSize: "13.5px" }}>
              CONTRATO: {empresaData.numeroContrato}
            </div>
            <div className="mt-4 text-start" style={{ fontSize: "13.5px" }}>
              DATA: {formatDateToBrazilian(empresaData.data)}
            </div>
            <div className="mt-1 text-start" style={{ fontSize: "13.5px" }}>
              VIGÊNCIA: 25/26/27
            </div>
          </div>
        </div>

        <div className="w-100 mt-3">
          <TitleContrato text="DADOS DA EMPRESA" />

          <div className="linha-campo mt-2">
            <div className="campo-label">NOME/RAZÃO SOCIAL:</div>
            <div className="campo-linha">{empresaData.razaoSocial}</div>
          </div>
          <div className="linha-campo mt-2">
            <div className="campo-label">CPF/CNPJ:</div>
            <div className="campo-linha">
              {empresaData.cnpj
                ? formatCNPJ(empresaData.cnpj)
                : empresaData.cpf
                ? formatCPF(empresaData.cpf)
                : "—"}
            </div>
          </div>

          <div className="linha-campo mt-2">
            <div className="campo-label">TELEFONE:</div>
            <div className="campo-linha">
              {formatCelular(empresaData.whatsapp)}
            </div>
          </div>

          <div className="linha-campo mt-2">
            <div className="campo-label">E-MAIL:</div>
            <div className="campo-linha">{empresaData.email1}</div>
          </div>

          <div className="linha-campo mt-2">
            <div className="campo-label">ENDEREÇO:</div>
            <div className="campo-linha">{empresaData.enderecoComercial}</div>
          </div>

          <div className="linha-campo mt-2">
            <div className="campo-label">BAIRRO:</div>
            <div className="campo-linha">{empresaData.bairro}</div>
          </div>
          <div className="row mt-2">
            <div className="col-md-6">
              <div className="linha-campo">
                <div className="campo-label">CEP:</div>
                <div className="campo-linha">{formatCEP(empresaData.cep)}</div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="linha-campo">
                <div className="campo-label">ESTADO:</div>
                <div className="campo-linha">{empresaData.estado}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-100" style={{ marginTop: "20px" }}>
          <TitleContrato text="VISUALIZE SUA PÁGINA NO GOOGLE" />
          <div className="linha-campo mt-2 d-flex">
            <div className="campo-label">LINK DA PÁGINA:</div>
            <a className="campo-linha" href={empresaData.linkGoogle}>
              {empresaData.linkGoogle}
            </a>
          </div>
          <div className="linha-campo mt-2 d-flex">
            <div className="campo-label">E-MAIL:</div>
            <div className="campo-linha">{empresaData.email1}</div>
          </div>
          <div className="linha-campo mt-2">
            <small className="tipo-atualizacao-contrato">
              TIPO DE ATUALIZAÇÃO: CRIAR QR CODE AVALIATIVO, INCLUSÃO DE FOTOS E
              VIDEOS,CARTÃO DIGITAL INTERATIVO, ATUALIZAÇÃO DE FOTO DA FACHADA
              CONDIÇOES : NºDE PARCELAS (12) 399,00, TREZENTOS E NOVENTA E NOVE
              REAIS (BOLETO BANCÁRIO(MENSAL) OBSERVAÇÃO: FAZER A OTIMIZAÇÃO DA
              PAGINA, CLIENTE COM BAIXA VISIBILIDADE ,INCLUIR FOTOS E OTIMIZAR
              PERFIL.
            </small>
          </div>
        </div>
        <div className="w-100" style={{ marginTop: "20px" }}>
          <TitleContrato text="HORÁRIO DE FUNCIONAMENTO" />

          <div className="mt-3">
            {[
              "Domingo",
              "Segunda",
              "Terça",
              "Quarta",
              "Quinta",
              "Sexta",
              "Sábado",
            ].map((dia) => (
              <div key={dia} className="linha-campo mb-2 d-flex">
                <div className="campo-label me-2">{dia.toUpperCase()}:</div>
                <div>{empresaData.horarios?.[dia] ?? "—"}</div>
              </div>
            ))}
          </div>
        </div>
        <div
          className="w-100 autorizante-contrato"
          style={{ marginTop: "20px" }}
        >
          <TitleContrato text="DADOS DO AUTORIZANTE" />
          <div className="linha-campo mt-3 d-flex">
            <div className="campo-label">NOME COMPLETO:</div>
            <div>{empresaData.responsavel}</div>
          </div>
          <div className="linha-campo mt-3 d-flex">
            <div className="campo-label">CARGO:</div>
            <div>{empresaData.cargo}</div>
          </div>
          <div className="assinatura-prop-contrato">
            <div className="campo-linha">_______________________________</div>
            <p>ASSINATURA:</p>
          </div>
          <img
            src="/img/contrato-relogio.png"
            alt=""
            className="img-contrato-relogio"
          />
        </div>
      </div>
    </div>
  );
};

export default PrimeiraPagina;
