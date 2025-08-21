import React, { useEffect, useState } from "react";
import "./Styles/FichaFinanceiro.css";
import { ComprovantesForm } from "./Components/ComprovantesForm";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { useNavigate, useParams } from "react-router-dom";

export const Comprovantes: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [clientData, setClientData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        if (id) {
          const docRef = doc(db, "vendas", id);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setClientData(docSnap.data());
          } else {
            console.log("Documento não encontrado");
          }
        }
      } catch (error) {
        console.error("Erro ao buscar os dados do cliente: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClientData();
  }, [id]);

  const limparNumero = (valor: any) => valor?.replace(/\D/g, "");

  const formatCPF = (cpf: any) => {
    const num = limparNumero(cpf);
    return num?.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4") || cpf;
  };

  const formatCNPJ = (cnpj: any) => {
    const num = limparNumero(cnpj);
    return (
      num?.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5") ||
      cnpj
    );
  };

  const formatPhone = (telefone: any) => {
    return telefone?.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
  };

  const formatMoney = (valor: any) => {
    if (!valor) return "R$ 0,00";
    const numero = Number(valor) / 100; // se estiver armazenado em centavos
    return numero.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const handleFianceiroSubmit = async (data: any) => {
    try {
      if (id) {
        const docRef = doc(db, "vendas", id);
        await updateDoc(docRef, data);
        setClientData(data);
        console.log("Dados atualizados com sucesso!");
        navigate(-1);
      }
    } catch (error) {
      console.error("Erro ao atualizar os dados de financeiro: ", error);
    }
  };

  if (loading) {
    return <div>Carregando dados...</div>;
  }

  if (!clientData) {
    return <div>Dados não encontrados.</div>;
  }

  return (
    <div className="financeiro">
      <div className="container">
        <div className="row align-items-center gap-3">
          <div className="col-md-6">
            <div className="card card-cob p-4">
              <h2 className="text-center">Informações Gerais</h2>

              <p>
                <strong>CNPJ/CPF:</strong>{" "}
                {clientData.cpf
                  ? formatCPF(clientData.cpf)
                  : formatCNPJ(clientData.cnpj)}
              </p>

              <p>
                <strong>Telefone:</strong>{" "}
                {clientData.telefone
                  ? formatPhone(clientData.telefone)
                  : formatPhone(clientData.celular)}
              </p>

              <p>
                <strong>Vencimento:</strong>{" "}
                {clientData.dataVencimento || "Não informado"}
              </p>

              <p>
                <strong>Valor original da venda:</strong>{" "}
                {clientData.valorVenda
                  ? formatMoney(clientData.valorVenda)
                  : "Não informado"}
              </p>

              <p>
                <strong>Valor Pago:</strong>{" "}
                {clientData.valorPago
                  ? formatMoney(clientData.valorPago)
                  : "Não informado"}
              </p>

              {clientData.operadorSelecionado && clientData.acordo && (
                <>
                  <p>
                    <strong>Possui acordo com a cobrança:</strong>{" "}
                    {clientData.acordo}
                  </p>
                  <p>
                    <strong>Cobrador:</strong>{" "}
                    {clientData.operadorSelecionado.label}
                  </p>
                </>
              )}
            </div>
          </div>
          <div className="col-md-5">
            <ComprovantesForm
              form={clientData}
              onSubmit={handleFianceiroSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
