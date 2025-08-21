import { faHandshake, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

// Definir os tipos de props para garantir que a estrutura de dados esteja correta
type FooterProps = {
  empresa: {
    responsavel: string;
    cargo: string;
    cpf: string;
    cnpj: string;
  };
};

const Footer: React.FC<FooterProps> = ({ empresa }) => {
  const formatCPF = (cpf: string) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  };
  const formatCNPJ = (cnpj: string) => {
  return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
};


  return (
    <section className="footer">
      <div className="row">
        <div className="col-md-6">
          <div className="container-title-footer-contrato">
            <div className="title-footer-contrato">
              <FontAwesomeIcon icon={faUser} color="green" size="lg" />
              <p>AUTORIZADO POR: </p>
            </div>
            <FontAwesomeIcon icon={faHandshake} size="lg" />
          </div>
          <div className="ms-4 mt-1">
            <h4 className="fw-bold">Nome: </h4>
            <p className="fw-semibold">
              <u>{empresa.responsavel}</u>
            </p>
            <h4 className="fw-bold">Cargo: </h4>
            <p className="fw-semibold">
              <u>{empresa.cargo}</u>
            </p>
            {empresa.cpf ? (
              <>
                <h4 className="fw-bold">CPF: </h4>
                <p className="fw-semibold">
                  <u>{formatCPF(empresa.cpf)}</u>
                </p>
              </>
            ) : (
              <>
                <h4 className="fw-bold">CNPJ: </h4>
                <p className="fw-semibold">
                  <u>{formatCNPJ(empresa.cnpj)}</u>
                </p>
              </>
            )}
          </div>
        </div>
        <div className="col-md-6">
          <div className="container-title-footer-contrato-right">
            <div className="title-footer-contrato">
              <FontAwesomeIcon icon={faUser} color="#2F3A79" size="lg" />
              <p style={{ color: "#2F3A79" }}>TF INTERMEDIAÇÕES </p>
            </div>
            <p className="fs-5">55.158.835/0001-66</p>
            <p className="fs-5 fw-bolder">www.tfgestaodetrafego.com.br</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
