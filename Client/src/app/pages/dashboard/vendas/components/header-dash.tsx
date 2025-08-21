import React from 'react';
import { useAuth } from '../../../../context/AuthContext';

interface HeaderDashProps {
  totalVendas: number; 
}

export const HeaderDash: React.FC<HeaderDashProps> = ({ totalVendas }) => {
  const { nome } = useAuth(); 
  return (
    <>
      <section>
        <div className="">
          <div className="header-dash">
            <div className="row">
              <div className="col-md-6 bemvindo-text">
                <h3>Olá, {nome.replace(/\./g, " ")}</h3>
              </div>

              <div className="header-info">
                <div className="col-md-6 info-item">
                  <h3>Total de Clientes</h3>
                  <p>{totalVendas}</p> 
                </div>
                <div className="col-md-6 info-item">
                  <h3>Nota Geral</h3>
                  <p>93.56</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
