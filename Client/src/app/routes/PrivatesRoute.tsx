import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { CircularProgress } from "@mui/material";
import { ModalRoutes } from "./components/ModalRoutes";

interface PrivateRouteProps {
  element: JSX.Element;
  requiredCargo?: string | string[]; // Agora aceita um ou mais cargos
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, requiredCargo }) => {
  const { user, loading, cargo } = useAuth();
  const [modalOpen, setModalOpen] = useState(false); // Estado para controlar o modal
  const [redirect, setRedirect] = useState(false); // Estado para controle de redirecionamento

  useEffect(() => {
    if (
      !loading &&
      user &&
      !(
        // Verifica se o cargo do usuário está na lista de cargos permitidos
        (Array.isArray(requiredCargo) ? requiredCargo.includes(cargo) : cargo === requiredCargo) || 
        !requiredCargo
      )
    ) {
      setModalOpen(true); // Abre o modal se o usuário não tiver permissão
    }
  }, [loading, user, requiredCargo, cargo]); // Adiciona dependências no useEffect

  const handleCloseModal = () => {
    setModalOpen(false);
    setRedirect(true); // Define para redirecionar
  };

  if (loading) {
    return (
      <div className="circle-loading">
        <CircularProgress color="inherit" className="circle" />
      </div>
    );
  }

  if (redirect) {
    return <Navigate to="/" />; // Redireciona para a página inicial
  }

  if (user && (cargo === "adm" || cargo === requiredCargo || (Array.isArray(requiredCargo) && requiredCargo.includes(cargo)) || !requiredCargo)) {
    return element; // Exibe o componente se o usuário tiver acesso
  }

  return (
    <ModalRoutes
      isOpen={modalOpen}
      onClose={handleCloseModal}
      message="Verifique suas credenciais! Redirecionando para a página inicial."
    />
  );
};

export default PrivateRoute;
