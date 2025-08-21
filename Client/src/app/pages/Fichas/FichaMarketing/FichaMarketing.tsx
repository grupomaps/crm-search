import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MarketingForm } from "./Components/MarketingForm";
import "./Styles/FichaMarketing.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf, faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import axios from "axios";
import { jsPDF } from "jspdf";
import ConfirmModal from "../components/ConfirmModal";

export const FichaMarketing: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [clientData, setClientData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [pendingData, setPendingData] = useState<any>(null);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        if (id) {
          const docRef = doc(db, "marketings", id);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setClientData(docSnap.data());
          } else {
            console.log("Não encontrado");
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

  const handleMarketingSubmit = async (data: any) => {
  try {
    if (id) {
      const docRef = doc(db, "marketings", id);
      await updateDoc(docRef, data);
      setClientData(data);
      console.log("Dados atualizados com sucesso!");

      if (data.servicosConcluidos === true) {
        const financeirosRef = doc(db, "financeiros", id);
        const financeirosSnap = await getDoc(financeirosRef);

        if (!financeirosSnap.exists()) {
          await setDoc(financeirosRef, {
            ...data,
            dataAdicionado: new Date().toISOString(),
          });
          console.log("Cliente adicionado à coleção **financeiros**!");
        } else {
          await updateDoc(financeirosRef, {
            ...data,
            dataAtualizado: new Date().toISOString(),
          });
          console.log("Dados atualizados na coleção **financeiros**!");
        }

        navigate("/marketing");
      } else {
        navigate("/marketing");
      }
    }
  } catch (error) {
    console.error("Erro ao atualizar os dados de marketing: ", error);
  }
};


  const handleConfirmDuplicate = async () => {
    if (!pendingData || !pendingId) return;

    try {
      const querySnapshot = await getDocs(
        query(
          collection(db, "posVendas"),
          where("__name__", ">=", `${pendingId}_copia`),
          where("__name__", "<", `${pendingId}_copia~`)
        )
      );

      const copiaCount = querySnapshot.size;
      const newId = `${pendingId}_copia${copiaCount + 1}`;

      await setDoc(doc(db, "posVendas", newId), {
        ...pendingData,
        dataAdicionado: new Date().toISOString(),
        idOriginal: pendingId,
      });

      console.log(`Cópia criada com ID: ${newId}`);
      setShowModalConfirm(false);
      setPendingData(null);
      setPendingId(null);
      navigate("/marketing");
    } catch (error) {
      console.error("Erro ao criar cópia na coleção posVendas:", error);
    }
  };

  const formatMoney = (valor: any) => {
    if (!valor) return "R$ 0,00";
    const numero = Number(valor) / 100; // se estiver armazenado em centavos
    return numero.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const formatCNPJ = (cnpj: any) => {
    if (!cnpj) return "";
    const raw = cnpj.replace(/\D/g, ""); // Remove tudo que não for número
    if (raw.length === 14) {
      return `${raw.slice(0, 2)}.${raw.slice(2, 5)}.${raw.slice(
        5,
        8
      )}/${raw.slice(8, 12)}-${raw.slice(12, 14)}`;
    }
    return cnpj; // Se o CNPJ não tiver 14 dígitos, retorna sem formatação
  };

  const formatCPF = (cpf: any) => {
    if (!cpf) return "";
    const raw = cpf.replace(/\D/g, ""); // Remove tudo que não for número
    if (raw.length === 11) {
      return `${raw.slice(0, 3)}.${raw.slice(3, 6)}.${raw.slice(
        6,
        9
      )}-${raw.slice(9, 11)}`;
    }
    return cpf; // Se o CPF não tiver 11 dígitos, retorna sem formatação
  };

  const sairFicha = () => {
    window.history.back();
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    clientData && (
      <div className="fichaMarketing">
        <div className="container">
          <button
            className="btn btn-danger btn-sair-marketing"
            onClick={sairFicha}
          >
            <FontAwesomeIcon icon={faLeftLong} />
          </button>
          <div className="row">
            <div className="col-md-3">
              <div className="card mb-4 p-4">
                <h2 className="text-center">Informações do Cliente</h2>
                <p>
                  <strong>CNPJ:</strong>{" "}
                  {formatCNPJ(clientData.cnpj) || "Não informado"}
                </p>
                <p>
                  <strong>CPF:</strong>{" "}
                  {formatCPF(clientData.cpf) || "Não informado"}
                </p>
                <p>
                  <strong>Razão Social:</strong> {clientData.razaoSocial}
                </p>
                <p>
                  <strong>Nome Fantasia:</strong> {clientData.nomeFantasia}
                </p>
                <p>
                  <strong>Operador:</strong> {clientData.operador}
                </p>
                <p>
                  <strong>Telefone:</strong>{" "}
                  {clientData.telefone || clientData.celular}
                </p>
                <p>
                  <strong>Whatsapp:</strong> {clientData.whatsapp}
                </p>
                <p>
                  <strong>Valor da Venda:</strong>{" "}
                  {formatMoney(clientData.valorVenda)}
                </p>
                <p>
                  <strong>Vencimento:</strong> {clientData.dataVencimento}
                </p>
                <p>
                  <strong>Observações:</strong> {clientData.observacoes}
                </p>
              </div>
            </div>
            <div className="col-md-9">
              <MarketingForm
                form={clientData}
                onSubmit={handleMarketingSubmit}
              />
            </div>
          </div>
        </div>
        <ConfirmModal
          show={showModalConfirm}
          title="Duplicar cliente"
          message="Este cliente já está na lista de pós-vendas. Deseja fazer uma cópia dele?"
          onCancel={() => setShowModalConfirm(false)}
          onConfirm={handleConfirmDuplicate}
        />
      </div>
    )
  );
};
