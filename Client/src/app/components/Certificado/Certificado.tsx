import React, { useEffect } from "react";
import { db } from "../../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface CertificadoData {
  nomeFantasia: string;
}

export const Certificado = () => {
  const { id } = useParams<{ id: string }>();
  const [dados, setDados] = React.useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      const ref = doc(db, "vendas", id);
      const snapshot = await getDoc(ref);
      if (snapshot.exists()) {
        setDados(snapshot.data() as CertificadoData);
      }
    };

    fetchData();
  }, [id]);

  const handleDownloadPDF = async () => {
    const element = document.querySelector(".assinatura");
    if (!element) return;

    const canvas = await html2canvas(element as HTMLElement);
    const imgData = canvas.toDataURL("image/png");

    // Define pdf em modo retrato (portrait) e formato A4
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // Ajusta imagem para caber proporcionalmente na página
    const imgProps = pdf.getImageProperties(imgData);
    const imgWidth = pdfWidth;
    const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

    // Centraliza verticalmente se a imagem for menor que a altura da página
    const positionY = imgHeight < pdfHeight ? (pdfHeight - imgHeight) / 2 : 0;

    pdf.addImage(imgData, "PNG", 0, positionY, imgWidth, imgHeight);
    pdf.save(`certificado-${id || "documento"}.pdf`);
  };

  return (
    <section className="container-assinatura">
      <button onClick={handleDownloadPDF} className="btn btn-danger">
        Baixar em PDF
      </button>
      <div className="assinatura">
        <div className="termo-consentimento text-center">
          <h2 style={{ fontWeight: "bold" }}>CERTIFICADO</h2>
          <h3 style={{ fontWeight: "bold" }}>
            TF GESTÃO DE ANÚNCIOS <span style={{ color: "#4285F4" }}>G</span>
            <span style={{ color: "#EA4335" }}>O</span>
            <span style={{ color: "#FBBC05" }}>O</span>
            <span style={{ color: "#4285F4" }}>G</span>
            <span style={{ color: "#34A853" }}>L</span>
            <span style={{ color: "#EA4335" }}>E</span> ADS
          </h3>

          <h1
            className="mt-4"
            style={{
              fontFamily: "'Brush Script MT', cursive",
              fontWeight: "bold",
            }}
          >
            {dados ? dados.nomeFantasia : "Nome do Estabelecimento"}
          </h1>

          <p className="mt-3 mx-auto" style={{ maxWidth: "600px", fontSize: "1rem", fontWeight: "bold" }}>
            Certificamos que este estabelecimento encontra-se com sua página
            devidamente atualizada no Google Maps para o ano de 2025, garantindo
            informações corretas e acessíveis ao público.
          </p>

          <div className="row mt-5 justify-content-between">
            <div className="col-md-4 text-center border-1 border-top border-black">
              <p className="fw-bold">TF GESTÃO DE ANÚNCIOS GOOGLE ADS</p>
              <small>Agência de Tráfego Pago</small>
            </div>
            <div className="col-md-4 text-center border-1 border-top border-black">
              <p className="fw-bold">{dados ? dados.nomeFantasia : "Nome do Estabelecimento"}</p>
              <small>Estabelecimento</small>
            </div>
          </div>
        </div>
        <img src="/img/certificado.jpg" alt="" className="img-assinatura" />
      </div>
    </section>
  );
};
