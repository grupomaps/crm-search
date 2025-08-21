import React, { FC, useEffect, useState } from "react";
import "./Styles/Contrato.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import html2pdf from "html2pdf.js";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { useParams } from "react-router-dom";
import Header from "./Components/Header";
import InfoEmpresa from "./Components/InfoEmpresa";
import Termos from "./Components/Termos";
import Footer from "./Components/Footer";

export const Contrato: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [clientData, setClientData] = useState<any>(null);

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        if (id) {
          const docRef = doc(db, "vendas", id);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setClientData(docSnap.data());
          } else {
            console.log("Não encontrado");
          }
        }
      } catch (error) {
        console.error("Erro ao buscar os dados do cliente: ", error);
      }
    };

    fetchClientData();
  }, [id]);

  const downloadPDF = () => {
    const contratoElement = document.getElementById("contrato");

    if (!contratoElement) {
      alert("Erro: Elemento do contrato não encontrado.");
      return;
    }

    // Configurações do PDF
    const opt = {
      margin: 0,
      filename: `${clientData?.razaoSocial || "contrato"}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
      },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };

    // Geração
    html2pdf()
      .set(opt)
      .from(contratoElement)
      .save()
      .catch((error: unknown) => {
        console.error("Erro ao gerar PDF:", error);
        alert("Erro ao gerar o PDF.");
      });
  };

  return (
    <div className="bg-contrato">
      <div className="bg-infos-contrato" id="contrato">
        {clientData && (
          <>
            <div className="page">
              <Header empresa={clientData} />
              <img src="/img/ads_logo.png" alt="" className="img-ads-full" />
              <InfoEmpresa empresa={clientData} />
            </div>
            <div className="page-break" />
            <div className="termos-contrato">
              <div className="page">
                <Termos empresa={clientData} />
                <Footer empresa={clientData} />
              </div>
            </div>
          </>
        )}
            
      </div>
      <button className="btn btn-danger mt-4" onClick={downloadPDF}>
        <FontAwesomeIcon icon={faFilePdf} /> Baixar PDF
      </button>
    </div>
  );
};
