import React, { useEffect, useState } from "react";
import "./Assinatura.css";
import { useParams } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import numeroPorExtenso from "numero-por-extenso";

interface AssinaturaData {
  nomeFantasia: string;
  data: string;
  cnpj: string;
  responsavel: string;
  dataVencimento: string;
  cargo: string;
  validade: string;
  valorVenda: string;
}

const Assinatura = () => {
  const { id } = useParams<{ id: string }>();
  const [dados, setDados] = useState<AssinaturaData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      const ref = doc(db, "vendas", id);
      const snapshot = await getDoc(ref);
      if (snapshot.exists()) {
        setDados(snapshot.data() as AssinaturaData);
      }
    };

    fetchData();
  }, [id]);

  const handleDownloadPDF = async () => {
    const element = document.querySelector(".assinatura");
    if (!element) return;

    const canvas = await html2canvas(element as HTMLElement);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`assinatura-${id || "documento"}.pdf`);
  };

  function formatarCNPJ(cnpj: string): string {
    const cnpjLimpo = cnpj.replace(/\D/g, "");

    return cnpjLimpo.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
      "$1.$2.$3/$4-$5"
    );
  }

  const valorEmReais = Number(dados?.valorVenda) / 100;

  const valorFormatado = valorEmReais.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  function valorPorExtensoCompleto(valor: number): string {
    const inteiro = Math.floor(valor);
    const centavos = Math.round((valor - inteiro) * 100);

    const inteiroExtenso = numeroPorExtenso.porExtenso(inteiro);
    const centavosExtenso =
      centavos > 0 ? numeroPorExtenso.porExtenso(centavos) : "";

    let resultado = "";

    if (inteiro > 0) {
      resultado += `${inteiroExtenso} ${inteiro === 1 ? "real" : "reais"}`;
    }

    if (centavos > 0) {
      if (resultado.length > 0) resultado += " e ";
      resultado += `${centavosExtenso} ${
        centavos === 1 ? "centavo" : "centavos"
      }`;
    }

    return resultado || "zero reais";
  }
  const valorPorExtenso = valorPorExtensoCompleto(valorEmReais);

  if (!dados) return <p>Carregando...</p>;

  return (
    <section className="container-assinatura">
      <button onClick={handleDownloadPDF} className="btn btn-danger">
        Baixar em PDF
      </button>
      <div className="assinatura">
        <div className="termo-consentimento">
          <h2>TF Gestão de Tráfego</h2>
          <h3 className="mb-3" style={{ fontWeight: "bold" }}>
            <span style={{ color: "#4285F4" }}>G</span>
            <span style={{ color: "#EA4335" }}>O</span>
            <span style={{ color: "#FBBC05" }}>O</span>
            <span style={{ color: "#4285F4" }}>G</span>
            <span style={{ color: "#34A853" }}>L</span>
            <span style={{ color: "#EA4335" }}>E</span> <span>ADS</span>
          </h3>

          <h5 className="mt-5">
            TERMO DE CONSENTIMENTO E AUTORIZAÇÃO PARA USO DE IMAGENS E
            ASSESSORIA EM GOOGLE ADS.
          </h5>
          <div className="d-flex flex-column gap-3">
            <h6 className="mt-4">
              Declaro estar ciente de todas as informações que me foram
              transmitidas por telefone e concordo com a prestação de serviços
              que será realizada para a minha empresa na plataforma Google Ads.
              Autorizo o uso do nome e da imagem da minha empresa para fins de
              divulgação do meu próprio comércio, responsabilizando a empresa TF
              Gestão de Tráfego pela criação, gestão e otimização das campanhas
              e anúncios. Concordo com o valor {dados.validade} da assessoria de
              serviços de R$ {valorFormatado} ({valorPorExtenso}) através de
              boleto bancário, enviado por email e telefone cadastrados mediante
              ligação telefônica.
            </h6>
            <img src="/img/stars-assinatura.png" alt="" />
            <h2>
              DEIXANDO SUA EMPRESA NAS PRIMEIRAS PÁGINAS DO{" "}
              <span>
                <span style={{ color: "#4285F4" }}>G</span>
                <span style={{ color: "#EA4335" }}>O</span>
                <span style={{ color: "#FBBC05" }}>O</span>
                <span style={{ color: "#4285F4" }}>G</span>
                <span style={{ color: "#34A853" }}>L</span>
                <span style={{ color: "#EA4335" }}>E</span>
              </span>
            </h2>
          </div>
        </div>
        <img src="/img/assinatura2.jpg" alt="" className="img-assinatura" />
        <div className="slogan-assinatura"></div>
        <div className="assinatura-form">
          <div className="linha">
            <label>EMPRESA</label>
            <span className="campo">{dados.nomeFantasia}</span>
          </div>
          <div className="linha">
            <div className="grupo">
              <label>DATA</label>
              <span className="campo">
                {dados.data.split("-").reverse().join("/")}
              </span>
            </div>
            <div className="grupo">
              <label>CNPJ</label>
              <span className="campo">{formatarCNPJ(dados.cnpj)}</span>
            </div>
            <div className="grupo assinatura-box">
              <label>ASSINATURA:</label>
              <div className="assinatura-espaco" />
            </div>
          </div>
          <div className="linha">
            <label>AUTORIZANTE</label>
            <span className="campo">{dados.responsavel}</span>
            <label>VENCIMENTO</label>
            <span className="campo">
              {dados.dataVencimento.split("-").reverse().join("/")}
            </span>
          </div>
          <div className="linha">
            <label>CARGO</label>
            <span className="campo">{dados.cargo}</span>
          </div>
          <div className="rodape">
            <span>WWW.TFGESTAODETRAFEGO.COM.BR</span>
            <span>(11) 3042-2025</span>
            <span>CNPJ:55.158.835/0001-66</span>
            <span>SAC@TFGESTAODETRAFEGO.COM.BR</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Assinatura;
