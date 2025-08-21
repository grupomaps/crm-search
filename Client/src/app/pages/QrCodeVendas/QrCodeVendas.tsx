import React, { useEffect, useRef, useState } from "react";
import "./QrCodeVendas.css";
import { useNavigate, useParams } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import QRCode from "qrcode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";

interface QrCodeData {
  nomeFantasia: string;
  linkGoogle: string;
}

export const QrCodeVendas = () => {
  const { id } = useParams<{ id: string }>();
  const printRef = useRef<HTMLDivElement>(null);
  const [dados, setDados] = useState<QrCodeData | null>(null);
  const [qrImage, setQrImage] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      const ref = doc(db, "vendas", id);
      const snapshot = await getDoc(ref);
      if (snapshot.exists()) {
        const data = snapshot.data() as QrCodeData;
        setDados(data);

        if (data.linkGoogle) {
          QRCode.toDataURL(data.linkGoogle, { width: 270 }, (err, url) => {
            if (!err) setQrImage(url);
          });
        }
      }
    };

    fetchData();
  }, [id]);

  const handleDownloadPDF = async () => {
    if (!printRef.current) return;

    const canvas = await html2canvas(printRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdfWidth = 210;
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: [pdfWidth, pdfHeight],
    });

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`qrcode-${id}.pdf`);
  };

  const navigation = useNavigate();

  return (
    <section className="qrcode-container">
      <button
        className="btn btn-danger btn-voltar"
        onClick={() => navigation(-1)}
      >
        <FontAwesomeIcon icon={faLeftLong} />
      </button>
      <button onClick={handleDownloadPDF} className="btn-baixar">
        Baixar PDF
      </button>
      <div className="qrcode-content">
        <h2 className="empresa-nome">
          QrCode gerado para empresa {dados?.nomeFantasia ?? "Carregando..."}
        </h2>
        <div ref={printRef}>
          <div
            className="img-wrapper"
            style={{ position: "relative", display: "inline-block" }}
          >
            <img
              src={require("../../Assets/qrCode.jpg")}
              alt="Decorativo"
              className="img-qrcode"
            />
            {qrImage && <img src={qrImage} alt="QR Code" className="qrcode" />}
          </div>
        </div>
      </div>
    </section>
  );
};
