import React, { useState, useEffect } from "react";
import { Operador } from "./Components/Operador";
import { DadosEmpresa } from "./Components/Empresa";
import { Navigate } from "react-router-dom";
import { auth, db } from "../../firebase/firebaseConfig";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Components/Styles/add.css";
import { useAuth } from "../../context/AuthContext";
import { InfoAdicionais } from "./Components/InfoAdicionais";
import { Button, Modal } from "react-bootstrap";

interface Parcela {
  valor: string;
  dataVencimento: string;
}

export const Add = () => {
  const userId = auth.currentUser?.uid;
  const { nome, cargo } = useAuth();
  const [form, setForm] = useState({
    numeroContrato: "",
    data: new Date().toISOString().split("T")[0],
    dataVencimento: "",
    operador: nome,
    createdBy: userId,
    setor: cargo,
    equipe: "SEARCH 360",
    account: "",
    razaoSocial: "",
    cpf: "",
    cnpj: "",
    nomeFantasia: "",
    enderecoComercial: "",
    bairro: "",
    numeroResidencial: "",
    zipcode: "",
    cep: "",
    estado: "",
    cidade: "",
    validade: "",
    dataVigencia: "",
    observacoes: "",
    fixo: "",
    celular: "",
    whatsapp: "",
    email1: "",
    email2: "",
    horarioFuncionamento: "",
    responsavel: "",
    cargo: "",
    valorVenda: "",
    parcelas: "1",
    valorParcelado: "",
    contrato: "",
    formaPagamento: "",
    qrcodeText: "",
    renovacaoAutomatica: "",
    linkGoogle: "",
    criacao: "",
    ctdigital: "",
    logotipo: "",
    anuncio: "",
    grupo: "",
    parcelaRecorrente: "1990",
    diaData: "",
    valorExtenso: "",
    diasSemana: [] as string[],
    linkAddAssinatura: "",
  });

  const [parcelasArray, setParcelasArray] = useState<Parcela[]>([]);
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tipoDocumento, setTipoDocumento] = useState("CPF");
  const [redirect, setRedirect] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [novoId, setNovoId] = useState<string | null>(null);

  const [senha, setSenha] = useState("");
  const [senhaCorreta, setSenhaCorreta] = useState("");
  const [erroSenha, setErroSenha] = useState("");
  const [nomeAutorizado, setNomeAutorizado] = useState("");
  const [erroNomeAutorizado, setErroNomeAutorizado] = useState("");
  const [senhaHabilitada, setSenhaHabilitada] = useState(false);
  const [novaSenha, setNovaSenha] = useState("");
  const [mostrarTrocarSenha, setMostrarTrocarSenha] = useState(false);

  useEffect(() => {
    const fetchSenha = async () => {
      const senhaRef = doc(db, "senhas", "senhaCorreta");
      const senhaSnap = await getDoc(senhaRef);
      if (senhaSnap.exists()) {
        setSenhaCorreta(senhaSnap.data().senha);
      }
    };
    fetchSenha();
  }, []);

  const calcularDataVigencia = (data: string, validade: string): string => {
    const dataObj = new Date(data);
    let mesesAdicionar = 0;

    switch (validade) {
      case "Mensal":
        mesesAdicionar = 1;
        break;
      case "Trimestral":
        mesesAdicionar = 3;
        break;
      case "Semestral":
        mesesAdicionar = 6;
        break;
      case "Anual":
        mesesAdicionar = 12;
        break;
      default:
        return "";
    }

    dataObj.setMonth(dataObj.getMonth() + mesesAdicionar);

    const nomeMes = dataObj.toLocaleString("pt-BR", { month: "long" });
    const ano = dataObj.getFullYear();

    return `${nomeMes.toLowerCase()}/${ano}`;
  };

  // Calcula as parcelas quando valorVenda, parcelas ou dataVencimento mudam
  useEffect(() => {
    const gerarParcelasComValorTotal = () => {
      const valorVenda = parseFloat(form.valorVenda || "0");
      const dataVencimento = form.dataVencimento;
      const parcelas = parseInt(form.parcelas || "1");
  
      if (!isNaN(valorVenda) && dataVencimento && !isNaN(parcelas)) {
        const novasParcelas: Parcela[] = [];
        const dataBase = new Date(dataVencimento);
        const diaDoMes = dataBase.getDate();
  
        for (let i = 0; i < parcelas; i++) {
          const dataParcela = new Date(dataBase);
          dataParcela.setMonth(dataBase.getMonth() + i);
  
          if (dataParcela.getDate() !== diaDoMes) {
            dataParcela.setDate(0); // ajusta para o último dia do mês anterior se necessário
          }
  
          novasParcelas.push({
            valor: Math.round(valorVenda).toString(),
            dataVencimento: dataParcela.toISOString().split("T")[0],
          });
        }
  
        setParcelasArray(novasParcelas);
  
        setForm((prev) => ({
          ...prev,
          valorParcelado: Math.round(valorVenda).toString(),
        }));
      }
    };
  
    gerarParcelasComValorTotal();
  }, [form.valorVenda, form.parcelas, form.dataVencimento]);
  

  const handleSenhaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSenha(e.target.value);
    setErroSenha("");
  };

  const handleNovaSenhaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNovaSenha(e.target.value);
  };

  const handleSaveWithPassword = async () => {
    if (senha === "272901Gt") {
      if (novoId) {
        if (!nomeAutorizado) {
          setErroNomeAutorizado("O nome de quem autorizou é obrigatório.");
          return;
        }

        const dadosAtualizados = {
          ...form,
          nomeAutorizado,
          parcelasDetalhadas: parcelasArray,
        };

        try {
          const novoClienteRef = doc(db, "vendas", novoId);
          await setDoc(novoClienteRef, dadosAtualizados);
          toast.success("Cliente salvo com um novo ID!");
          handleModalClose();
          setRedirect(true);
        } catch (error) {
          console.error("Erro ao salvar os dados:", error);
          toast.error("Erro ao salvar os dados. Tente novamente.");
        }
      }
    } else {
      setErroSenha("Senha incorreta. Entre em contato com seu supervisor");
    }
  };

  const handleTrocarSenha = async () => {
    try {
      const senhaRef = doc(db, "senhas", "senhaCorreta");
      await setDoc(senhaRef, { senha: novaSenha });
      setSenhaCorreta(novaSenha);
      setNovaSenha("");
      toast.success("Senha alterada com sucesso!");
    } catch (error) {
      console.error("Erro ao alterar a senha:", error);
      toast.error("Erro ao alterar a senha. Tente novamente.");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setForm((prev) => {
      const updatedForm = { ...prev, [name]: value };

      if (name === "email1" || name === "email2") {
        updatedForm[name] = value.replace(/\s+/g, "");
      }

      if (name === "celular" || name === "whatsapp") {
        updatedForm[name] = value.replace(/\D/g, "").slice(0, 13);
      }

      if (name === "fixo") {
        updatedForm[name] = value.replace(/\D/g, "").slice(0, 10);
      }

      if ((name === "cpf" || name === "cnpj") && value.length >= 6) {
        updatedForm.numeroContrato = value.slice(0, 6);
      }

      // Atualiza a dataVigencia se 'validade' ou 'data' forem alterados
      if (name === "validade" || name === "data") {
        const validade = name === "validade" ? value : updatedForm.validade;
        const data = name === "data" ? value : updatedForm.data;
        if (validade && data) {
          updatedForm.dataVigencia = calcularDataVigencia(data, validade);
        }
      }

      return updatedForm;
    });
  };

  const handleSelectChange = (selectedOption: any) => {
    setForm({ ...form, operador: selectedOption.value });
  };

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const sairFicha = () => {
    window.history.back();
  };

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const dadosParaSalvar = {
        ...form,
        parcelasDetalhadas: parcelasArray,
      };

      const clienteRef = doc(db, "vendas", form.numeroContrato);
      const docSnap = await getDoc(clienteRef);

      if (docSnap.exists()) {
        setNovoId(`${form.numeroContrato}_${Date.now()}`);
        handleModalShow();
      } else {
        await setDoc(clienteRef, dadosParaSalvar);
        toast.success("Cliente salvo com sucesso!");
        setRedirect(true);
      }
    } catch (error) {
      console.error("Erro ao salvar cliente:", error);
      setError("Erro ao salvar cliente. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  if (redirect) {
    return <Navigate to={"/vendas"} />;
  }

  return (
    <div className="contrato text-center">
      {loading && <p>Aguarde, estamos processando...</p>}
      <div className="container">
        <h2 className="title-contrato">Adicionar Informações do Cliente</h2>
        <form onSubmit={handleSubmit}>
          <DadosEmpresa
              form={form}
              handleInputChange={handleInputChange}
              tipoDocumento={tipoDocumento}
            />
          {/* {step === 0 && (
            <Operador
              form={form}
              handleInputChange={handleInputChange}
              handleSelectChange={handleSelectChange}
              operadoresOpcoes={[]}
            />
          )} */}
          {/* {step === 2 && (
            <>
              <InfoAdicionais
                form={form}
                handleInputChange={handleInputChange}
              />
              <input
                type="text"
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
              />
              <button onClick={handleTrocarSenha}>Alterar Senha</button>
              <div className="parcelas-container mt-3">
                <h4>Detalhes das Parcelas</h4>
                {parcelasArray.length > 0 ? (
                  <div className="scroll-tabela">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Parcela</th>
                          <th>Valor</th>
                          <th>Vencimento</th>
                        </tr>
                      </thead>
                      <tbody>
                        {parcelasArray.map((parcela, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                              R${" "}
                              {(Number(parcela.valor) / 100).toLocaleString(
                                "pt-BR",
                                {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                }
                              )}
                            </td>

                            <td>{new Date(parcela.dataVencimento).toLocaleDateString("pt-BR", { timeZone: "UTC" })}</td>

                            </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p>
                    Informe o valor e a data de vencimento para calcular as
                    parcelas
                  </p>
                )}
              </div>
            </>
          )} */}

          <div className="mt-4">
            <button
                type="button"
                className="btn btn-danger me-2"
                onClick={sairFicha}
              >
                Sair
              </button>
             <button
                type="button"
                className="btn btn-success"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Salvando..." : "Salvar"}
              </button>
            {/* {step >= 0 && (
              
            )}
            {step > 0 && (
              <button
                type="button"
                className="btn btn-secondary me-2"
                onClick={handleBack}
              >
                Voltar
              </button>
            )}

            {step < 2 && (
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleNext}
              >
                Próximo
              </button>
            )}
            {step === 2 && (
             
            )} */}
          </div>
        </form>
        <ToastContainer />
      </div>
      <Modal show={showModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmação</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            O número de contrato <strong>{form.numeroContrato}</strong> já
            existe. Para salvar com um novo ID, confirme sua senha abaixo:
          </p>

          <input
            type="text"
            placeholder="Nome de quem autorizou"
            value={nomeAutorizado}
            onChange={(e) => {
              setNomeAutorizado(e.target.value);
              if (e.target.value.length >= 4) {
                setSenhaHabilitada(true);
              } else {
                setSenhaHabilitada(false);
              }
            }}
            className="form-control mt-3"
          />
          {erroNomeAutorizado && (
            <p className="text-danger mt-2">{erroNomeAutorizado}</p>
          )}

          <input
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={handleSenhaChange}
            className="form-control mt-3"
            disabled={!senhaHabilitada}
          />
          {erroSenha && <p className="text-danger mt-2">{erroSenha}</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={handleSaveWithPassword}
            disabled={!senhaHabilitada}
          >
            Confirmar e Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
