import React from "react";
import { QRCodeSVG } from "qrcode.react";

interface InfoConfirmacao {
  monitoriaConcluidaYes: boolean;
  monitoriaConcluidaNo: boolean;
  nomeMonitor: string;
  linkGravacao: string;
  imagemUrl?: string;
}

interface InfoConfirmacaoProps {
  form: InfoConfirmacao | null;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const questions = [
  {
    label: "Confirma que realizou a auditoria?",
    yesId: "monitoriaConcluidaYes",
    noId: "monitoriaConcluidaNo",
    yesChecked: (form: InfoConfirmacao) => form.monitoriaConcluidaYes,
    noChecked: (form: InfoConfirmacao) => form.monitoriaConcluidaNo,
  },
];

export const FichaMonitoriaConfirmacao: React.FC<InfoConfirmacaoProps> = ({
  form,
  handleInputChange,
  handleImageUpload,
}) => {
  if (!form) return null;

  return (
    <>
      <h3 className="text-center">Auditoria</h3>
      <div className="row monitoria">
        {questions.map(({ label, yesId, noId, yesChecked, noChecked }) => (
          <div className="col-md-6 box-quest" key={yesId}>
            <label>{label}</label>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id={yesId}
                checked={yesChecked(form)}
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor={yesId}>
                Sim
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id={noId}
                checked={noChecked(form)}
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor={noId}>
                Não
              </label>
            </div>
          </div>
        ))}
        <div className="col-md-6 box-quest">
          <label>Informe seu nome:</label>
          <input
            className="form-control"
            id="nomeMonitor"
            name="nomeMonitor"
            value={form.nomeMonitor}
            onChange={handleInputChange}
            placeholder="Digite seu nome aqui"
          />
        </div>
        <div className="col-md-6 box-quest">
          <label>Informe o Link da Gravação:</label>
          <input
            className="form-control"
            id="linkGravacao"
            name="linkGravacao"
            value={form.linkGravacao}
            onChange={handleInputChange}
            placeholder="Insira o link da gravação"
          />
        {form.linkGravacao && (
          <div className="mt-3 justify-content-center d-flex flex-column align-items-center">
            <h5>QR Code da gravação:</h5>
            <QRCodeSVG value={form.linkGravacao} size={128} />
          </div>
        )}
        </div>
      </div>
    </>
  );
};
