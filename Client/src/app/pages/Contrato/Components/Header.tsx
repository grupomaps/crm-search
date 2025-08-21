import { faUser, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface EmpresaProps {
  operador: string;
  numeroContrato: string;
  data: string;
}

const Header: React.FC<{ empresa: EmpresaProps }> = ({ empresa }) => {
  const formatarData = (data: string) => {
  const [ano, mes, dia] = data.split("-");
  return `${dia}/${mes}/${ano}`;
};

  return (
    <section className="header">
      <div className="svg-roxo">
        <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M42 8C35 4 28 6 23 13C18 20 18 30 23 38C28 46 38 50 45 44C52 38 55 28 52 20C49 12 47 10 42 8Z"
            fill="#8151E5"
          />
        </svg>
      </div>
      <div className="header-contrato">
        <div className="row">
          <div className="col-md-4 text-end">
            <img src="/img/mao_ads.png" alt="" className="img-mao" />

            <span className="text-danger">T</span>
            <span className="text-warning">F</span>
          </div>
          <div className="col-md-5">
            <p className="fw-bold text-center">
              AUTORIZAÇÃO PARA DIVULGAÇÃO E ASSESSORIA DE SERVIÇOS
            </p>
          </div>
          <div className="col-md-3">
            <p className="fw-bold">CONTRATO Nº: {empresa.numeroContrato}</p>
            <p className="fw-bold">
             <p className="fw-bold">
  DATA DA VENDA: {formatarData(empresa.data)}
</p>
            </p>
          </div>
        </div>
      </div>
      <div className="frase-header-container">
        <div className="frase-header">
          <span className="text-primary">GESTÃO</span>
          <span className="text-danger">DE</span>
          <span className="text-laranja">TRÁFEGO</span>
        </div>
        <div className="frase-header">
          <span className="text-warning">ANÚNCIO</span>
          <span className="text-success">PATROCINADOS</span>
        </div>
      </div>
      <div className="mt-5">
        <div className="row">
          <div className="col-md-4">
            <div className="icon-header-container">
              {" "}
              <FontAwesomeIcon
                icon={faUser}
                className="icon-header"
                color="red"
              />
              <p>DADOS COMERCIAIS</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="icon-header-container">
              <FontAwesomeIcon
                icon={faUser}
                className="icon-header"
                color="red"
              />
              <p className="text-capitalize">REPRES: {empresa.operador} </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="icon-header-container">
              <FontAwesomeIcon
                icon={faUser}
                className="icon-header"
                color="#FCD658"
              />
              <p>VIGÊNCIA: 12 MESES</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
