import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faEdit,
  faEye,
  faSearch,
  faFilter,
  faRectangleList,
  faX,
  faBars,
  faMoneyCheckDollar,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { ModalExcel } from "./modalExcel";
import { db } from "../../../../firebase/firebaseConfig";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { Tooltip } from "react-tooltip";
import { getAuth } from "firebase/auth";

interface Venda {
  id: string;
  cnpj: string;
  cpf: string;
  responsavel: string;
  email1: string;
  operador: string;
  data: string;
  dataVencimento: string;
  contrato: string;
  nomeMonitor: string;
  observacoes: string;

  monitoriaConcluidaYes: boolean;
  createdBy: string;
}

interface ListDashboardProps {
  setTotalVendas: (total: number) => void;
  setTotalRealizados: (total: number) => void;
}

export const ListDashboard: React.FC<ListDashboardProps> = ({
  setTotalVendas,
  setTotalRealizados,
}) => {
  const [vendas, setVendas] = useState<Venda[]>([]);
  const [selectedItems] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [modalExcel, setModalExcel] = useState(false);
  const itemsPerPage = 5;
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeSearchTerm, setActiveSearchTerm] = useState<string>("");
  const [userRole, setUserRole] = useState("");

  const auth = getAuth();
  const userId = auth.currentUser?.uid;
  useEffect(() => {
    const fetchUserRole = async () => {
      if (!userId) {
        console.error("User ID is undefined");
        return;
      }
      const userDoc = await getDoc(doc(db, "usuarios", userId));
      if (userDoc.exists()) {
        const data = userDoc.data();
        setUserRole(data.cargo); 
      }
    };

    if (userId) {
      fetchUserRole();
    }
  }, [userId]);

  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    dueDate: "",
    saleType: "",
    salesPerson: "",
  });

  const [showConcluidas, setShowConcluidas] = useState(false);

  useEffect(() => {
    const fetchMonitoriaFromVendas = async () => {
      setLoading(true);
      try {
        const q = query(
          collection(db, "vendas"),
          where("posVendaConcuida", "==", true)
        );
        const snapshot = await getDocs(q);
        console.log("Snapshot:", snapshot.docs);
  
        const vendasList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Venda[];
  
        const fullAccessRoles = ["adm", "monitoria", "supervisor", "posVenda", "cobranca"];
  
        const filteredVendas = fullAccessRoles.includes(userRole)
          ? vendasList
          : vendasList.filter((venda) => venda.createdBy === userId);
  
        setVendas(filteredVendas);
        setTotalVendas(filteredVendas.length);
        setTotalRealizados(filteredVendas.length);
      } catch (error) {
        console.error("Erro ao buscar vendas com pós-venda concluído:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchMonitoriaFromVendas();
  }, [setTotalRealizados, userRole, userId]);

  const applyFilters = () => {
    let filteredClients = vendas.filter((venda) => {
      const lowerCaseTerm = activeSearchTerm.toLowerCase();
      const matchesSearchTerm =
        (venda.cnpj && venda.cnpj.toLowerCase().includes(lowerCaseTerm)) ||
        (venda.cpf && venda.cpf.toLowerCase().includes(lowerCaseTerm)) ||
        (venda.responsavel &&
          venda.responsavel.toLowerCase().includes(lowerCaseTerm)) ||
        (venda.email1 && venda.email1.toLowerCase().includes(lowerCaseTerm)) ||
        (venda.operador &&
          venda.operador.toLowerCase().includes(lowerCaseTerm));

      const { startDate, endDate, dueDate, saleType, salesPerson } = filters;

      const vendaData = new Date(venda.data);
      const isStartDateValid = startDate
        ? vendaData.toDateString() === new Date(startDate).toDateString()
        : true;

      const isDateInRange =
        startDate && endDate
          ? vendaData >= new Date(startDate) && vendaData <= new Date(endDate)
          : isStartDateValid;

      const vendaDataVencimento = new Date(venda.dataVencimento);
      const isDueDateValid = dueDate
        ? vendaDataVencimento.toDateString() ===
          new Date(dueDate).toDateString()
        : true;

      const isSaleTypeValid = saleType ? venda.contrato === saleType : true;
      const isSalesPersonValid = salesPerson
        ? venda.operador === salesPerson
        : true;

      return (
        matchesSearchTerm &&
        isDateInRange &&
        isDueDateValid &&
        isSaleTypeValid &&
        isSalesPersonValid
      );
    });

    if (showConcluidas) {
      filteredClients = filteredClients.filter(
        (venda) => !venda.monitoriaConcluidaYes
      );
    }

    return filteredClients;
  };

  const handleSearchClick = () => {
    setActiveSearchTerm(searchTerm);
    setCurrentPage(1); // Resetar para a primeira página ao realizar nova pesquisa
  };

  const filteredClients = applyFilters();
  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
  const currentClients = filteredClients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const openModalExcel = () => setModalExcel(true);
  const closeModalExcel = () => setModalExcel(false);

  const handleApplyFilters = (newFilters: any) => {
    setFilters(newFilters);
    setModalExcel(false);
  };

  const toggleConcluido = () => {
    setShowConcluidas(!showConcluidas);
  };

  const formatCPF = (value: string): string => {
    return value
      .replace(/\D/g, "")
      .replace(/^(\d{3})(\d)/, "$1.$2")
      .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4")
      .substring(0, 14);
  };

  const formatCNPJ = (value: string): string => {
    return value
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3/$4")
      .replace(/(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d)/, "$1.$2.$3/$4-$5")
      .substring(0, 18);
  };

  return (
    <div className="list-dashboard">
      {modalExcel && (
        <ModalExcel
          onClose={closeModalExcel}
          onApplyFilters={handleApplyFilters}
        />
      )}

      <div className="header-list">
        <div className="header-content">
          <h2>Monitoria</h2>
          <div className="search-container">
            <button
              className="search-button"
              onClick={handleSearchClick}
              data-tooltip-id="search-tooltip"
              data-tooltip-content="Pesquisar"
            >
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
              <Tooltip
                id="search-tooltip"
                place="top"
                className="custom-tooltip"
              />
            </button>
            <input
              type="text"
              placeholder="Pesquisar..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearchClick()}
            />
          </div>
          <div className="selects-container">
            <button
              className="filtros-btn"
              onClick={openModalExcel}
              data-tooltip-id="tooltip-filter"
              data-tooltip-content="Aplicar filtros"
            >
              <FontAwesomeIcon icon={faFilter} color="#fff" />
            </button>

            {showConcluidas ? (
              <button
                className="remove-btn"
                onClick={toggleConcluido}
                data-tooltip-id="tooltip-remove"
                data-tooltip-content="Mostrar concluídas"
              >
                <FontAwesomeIcon icon={faX} color="#fff" />
              </button>
            ) : (
              <button
                className="concluido-btn"
                onClick={toggleConcluido}
                data-tooltip-id="tooltip-show"
                data-tooltip-content="Mostrar não concluídas"
              >
                <FontAwesomeIcon icon={faBars} color="#fff" />
              </button>
            )}

            <Tooltip
              id="tooltip-filter"
              place="top"
              className="custom-tooltip"
            />
            <Tooltip
              id="tooltip-remove"
              place="top"
              className="custom-tooltip"
            />
            <Tooltip id="tooltip-show" place="top" className="custom-tooltip" />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="loading">Carregando...</div>
      ) : filteredClients.length === 0 ? (
        <div className="no-clients">Não existem vendas a exibir.</div>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>CNPJ/CPF</th>
                <th>Observações</th>
                <th>Operador</th>
                <th>Monitor</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {currentClients.map((venda: Venda) => (
                <tr key={venda.id}>
                  <td></td>
                  <td
                    className={`${
                      selectedItems.has(venda.id) ? "selected" : ""
                    } ${venda.monitoriaConcluidaYes ? "concluida" : ""}`}
                  >
                    {venda.cnpj
                      ? formatCNPJ(venda.cnpj)
                      : venda.cpf
                      ? formatCPF(venda.cpf)
                      : venda.cnpj || venda.cpf}
                  </td>
                  <td
                    className={`${
                      selectedItems.has(venda.id) ? "selected" : ""
                    } ${venda.monitoriaConcluidaYes ? "concluida" : ""}`}
                  >
                    {venda.observacoes}
                  </td>
                  <td
                    className={`${
                      selectedItems.has(venda.id) ? "selected" : ""
                    } ${venda.monitoriaConcluidaYes ? "concluida" : ""}`}
                  >
                    {venda.operador.replace(/\./g, " ")}
                  </td>
                  <td
                    className={`${
                      selectedItems.has(venda.id) ? "selected" : ""
                    } ${venda.monitoriaConcluidaYes ? "concluida" : ""}`}
                  >
                    {venda.nomeMonitor}
                  </td>
                  <td className="icon-container">
                    <Link
                      to={`/fichamonitoria/${venda.id}`}
                      data-tooltip-id="tooltip-monitor"
                      data-tooltip-content="Ficha de monitoria"
                    >
                      <FontAwesomeIcon
                        icon={faRectangleList}
                        className="icon-spacing text-dark"
                      />
                    </Link>
                    {/* <Link to={`/fichaboleto/${venda.id}`}>
                      <FontAwesomeIcon
                        icon={faMoneyCheckDollar}
                        className="icon-spacing text-dark"
                        data-tooltip-id="tooltip-boleto"
                        data-tooltip-content="Ver ficha de boleto"
                      />
                      <Tooltip id="tooltip-boleto" place="top" className="custom-tooltip" />
                    </Link> */}

                    {/* Tooltips */}
                    <Tooltip
                      id="tooltip-view"
                      place="top"
                      className="custom-tooltip"
                    />
                    <Tooltip
                      id="tooltip-edit"
                      place="top"
                      className="custom-tooltip"
                    />
                    <Tooltip
                      id="tooltip-monitor"
                      place="top"
                      className="custom-tooltip"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <span>
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </>
      )}
    </div>
  );
};
