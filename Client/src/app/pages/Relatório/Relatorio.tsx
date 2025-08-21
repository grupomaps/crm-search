// ... imports
import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  onSnapshot,
  getDocs,
} from "firebase/firestore";
import "./Relatorio.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong, faRightLong } from "@fortawesome/free-solid-svg-icons";
import { Ranking } from "./components/Ranking";

interface Venda {
  operador: string;
  data: string;
}

interface Usuario {
  avatar: string;
  nome: string;
}

export const Relatorio: React.FC = () => {
  const [vendasDiarias, setVendasDiarias] = useState<(Venda & { avatar?: string })[]>([]);
  const [usuariosMap, setUsuariosMap] = useState<Record<string, Usuario>>({});
  const [usuariosPorNome, setUsuariosPorNome] = useState<Record<string, string>>({});
  const [totalBase, setTotalBase] = useState(0);
  const [currentPageBase, setCurrentPageBase] = useState(1);
  const [vendasPorOperadorSemanal, setVendasPorOperadorSemanal] = useState<Record<string, number>>({});
  const [vendasPorOperadorMensal, setVendasPorOperadorMensal] = useState<Record<string, number>>({});
  const itemsPerPage = 4;

  const db = getFirestore();

  useEffect(() => {
    const fetchUsuarios = async () => {
      const usuariosSnapshot = await getDocs(collection(db, "usuarios"));
      const usuarios: Record<string, Usuario> = {};
      const nomeParaID: Record<string, string> = {};

      usuariosSnapshot.forEach((doc) => {
        const usuario = doc.data() as Usuario;
        usuarios[doc.id] = usuario;
        nomeParaID[usuario.nome.trim()] = doc.id;
      });

      setUsuariosMap(usuarios);
      setUsuariosPorNome(nomeParaID);
    };

    fetchUsuarios();
  }, [db]);

  useEffect(() => {
    const fetchVendas = () => {
  const vendasCollection = collection(db, "vendas");

  const unsubscribe = onSnapshot(vendasCollection, (querySnapshot) => {
    const vendasHoje: (Venda & { avatar?: string })[] = [];
    const vendasSemana: Record<string, number> = {};
    const vendasMes: Record<string, number> = {};

    const today = new Date();
    const todayString = today.toISOString().split("T")[0];
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay()); // domingo
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    let baseCount = 0;

    const vendasMapeadas = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as (Venda & { id: string })[];

    for (const venda of vendasMapeadas) {
      const usuarioID = usuariosPorNome[venda.operador] || venda.operador;
      const usuario = usuariosMap[usuarioID];
      const vendaComAvatar = { ...venda, avatar: usuario?.avatar };

      const dataVenda = new Date(venda.data);

      if (venda.data === todayString) {
        vendasHoje.push(vendaComAvatar);
        baseCount += 1;
      }

      if (dataVenda >= startOfWeek) {
        vendasSemana[venda.operador] = (vendasSemana[venda.operador] || 0) + 1;
      }

      if (dataVenda >= startOfMonth) {
        vendasMes[venda.operador] = (vendasMes[venda.operador] || 0) + 1;
      }
    }

    setTotalBase(baseCount);
    setVendasDiarias(vendasHoje);
    setVendasPorOperadorSemanal(vendasSemana);
    setVendasPorOperadorMensal(vendasMes);
  });

  return () => unsubscribe();
};


    if (Object.keys(usuariosMap).length > 0) {
      fetchVendas();
    }
  }, [db, usuariosMap, usuariosPorNome]);


  const rankingOperadores = Object.keys(vendasPorOperadorSemanal).map((operador) => {
    const usuarioID = usuariosPorNome[operador] || operador;
    const usuario = usuariosMap[usuarioID];

    return {
      operador: operador.replace(/\./g, " "),
      imgOperador: usuario?.avatar || "https://crm-tfgestao.vercel.app/img/logo.png",
      vendasSemanal: vendasPorOperadorSemanal[operador] || 0,
      vendasMensal: vendasPorOperadorMensal[operador] || 0,
    };
  });

  const vendasPorOperador = vendasDiarias.reduce<Record<string, number>>((acc, venda) => {
  acc[venda.operador] = (acc[venda.operador] || 0) + 1;
  return acc;
}, {});

  const getTopThreeBase = () => {
    return Object.keys(vendasPorOperador)
      .sort((a, b) => vendasPorOperador[b] - vendasPorOperador[a])
      .slice(0, 3);
  };

  const calculateTotalPages = () => {
    return Math.ceil(Object.keys(vendasPorOperador).length / itemsPerPage);
  };

  const getCurrentOperators = () => {
    const indexOfLast = currentPageBase * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    return Object.keys(vendasPorOperador)
      .sort((a, b) => vendasPorOperador[b] - vendasPorOperador[a])
      .slice(indexOfFirst, indexOfLast);
  };

  const topBase = getTopThreeBase();
  const currentBaseOperators = getCurrentOperators();
  const totalBasePages = calculateTotalPages();

  return (
    <section className="dashboard">
      <div className="bg-relatorio">
        <FontAwesomeIcon
          icon={faLeftLong}
          className="icon-back-relatorio"
          onClick={() => window.history.back()}
        />
        <div className="ranking base">
          <h4 className="total-contrato">Total Base: {totalBase}</h4>
          <div className="podio">
            {topBase.map((operador, index) => {
              const usuarioID = usuariosPorNome[operador] || operador;
              const avatar = usuariosMap[usuarioID]?.avatar || "https://crm-tfgestao.vercel.app/img/logo.png";
              return (
                <div key={operador} className={`colocacao${index + 1}`}>
                  <img
                    src={avatar}
                    alt={`${operador} Avatar`}
                    className="img-podio"
                  />
                  <span className="operador-podio">
                    {operador.replace(/\./g, " ")}
                  </span>
                  <span className="vendas-podio">
                    {vendasPorOperador[operador]}
                  </span>
                </div>
              );
            })}
          </div>
          <ul className="tabela-ranking text-center">
            {currentBaseOperators.map((operador) => {
              const usuarioID = usuariosPorNome[operador] || operador;
              const avatar = usuariosMap[usuarioID]?.avatar || "https://crm-tfgestao.vercel.app/img/logo.png";
              return (
                <li key={operador} style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={avatar}
                    alt={`${operador} Avatar`}
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      marginRight: "10px",
                    }}
                    className="foto-ranking"
                  />
                  <span className="nome-operador">
                    {operador.replace(/\./g, " ")}
                  </span>
                  <h2 className="vendas-operador">
                    {vendasPorOperador[operador]}
                  </h2>
                </li>
              );
            })}
          </ul>
          <div className="paginacao">
            <button
              onClick={() => setCurrentPageBase((prev) => Math.max(prev - 1, 1))}
              disabled={currentPageBase === 1}
            >
              <FontAwesomeIcon icon={faLeftLong} />
            </button>
            <span>
              {currentPageBase} / {totalBasePages}
            </span>
            <button
              onClick={() => setCurrentPageBase((prev) => Math.min(prev + 1, totalBasePages))}
              disabled={currentPageBase === totalBasePages}
            >
              <FontAwesomeIcon icon={faRightLong} />
            </button>
          </div>
        </div>
      </div>
      <div className="total-vendas">
        <h4>Total de vendas: {totalBase}</h4>
      </div>
      <Ranking operadores={rankingOperadores} />
    </section>
  );
};
