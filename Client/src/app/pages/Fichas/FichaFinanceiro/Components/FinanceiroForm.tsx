import React, { useEffect, useState } from "react";
import Select from "react-select";
import ListaDeParcelas from "./ListaDeParcelas";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../../firebase/firebaseConfig";

interface ParcelaDetalhada {
  valor: string;
  dataVencimento: string;
  valorPago?: string;
  dataPagamento?: string;
  link?: string;
}

interface Form {
  valorPago: string;
  acordo: string;
  rePagamento: string;
  dataPagamento: string;
  encaminharCliente: string;
  operadorSelecionado: { value: string; label: string } | null;
  comprovante: string;
  parcelasDetalhadas?: ParcelaDetalhada[];
  linkBoleto?: string;
}

interface Usuario {
  id: string;
  nome: string;
  cargo: string;
}

interface FinanceiroFormProps {
  form: Form | null;
  onSubmit: (data: Form) => void;
}

export const FinanceiroForm: React.FC<FinanceiroFormProps> = ({
  form: initialForm,
  onSubmit,
}) => {
  const [form, setForm] = useState<Form>({
    valorPago: "",
    acordo: "",
    rePagamento: "",
    dataPagamento: "",
    encaminharCliente: "",
    operadorSelecionado: null,
    comprovante: "",
    parcelasDetalhadas: [],
  });

  const [parcelas, setParcelas] = useState<ParcelaDetalhada[]>([]);
  const [usuariosCobranca, setUsuariosCobranca] = useState<Usuario[]>([]);
  const [isValorPagoManuallyEdited, setIsValorPagoManuallyEdited] =
    useState(false);
  const handleParcelaChange = (
    index: number,
    field: "valorPago" | "dataPagamento" | "link",
    value: string
  ) => {
    const updatedParcelas = (parcelas ?? []).map((parcela, i) =>
      i === index ? { ...parcela, [field]: value } : parcela
    );
    setParcelas(updatedParcelas);
    setForm((prevForm) => ({
      ...prevForm,
      parcelasDetalhadas: updatedParcelas,
    }));
  };

  const sairFicha = () => {
    window.history.back();
  };

  useEffect(() => {
    if (initialForm?.parcelasDetalhadas?.length) {
      const parcelasIniciais = initialForm.parcelasDetalhadas.map((p) => ({
        ...p,
        valorPago: p.valorPago || "",
        dataPagamento: p.dataPagamento || "",
      }));
      setParcelas(parcelasIniciais);
    } else {
      setParcelas([]); // ← garante array vazio se não houver parcelas
    }
  }, [initialForm]);

  useEffect(() => {
    const fetchUsuariosCobranca = async () => {
      try {
        const usuariosCollection = collection(db, "usuarios");
        const usuariosSnapshot = await getDocs(usuariosCollection);
        const usuariosList = usuariosSnapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((usuario: any) => usuario.cargo === "cobranca");

        setUsuariosCobranca(usuariosList as Usuario[]);
      } catch (error) {
        console.error("Erro ao buscar usuários de cobrança:", error);
      }
    };

    fetchUsuariosCobranca();
  }, []);

  useEffect(() => {
    if (!isValorPagoManuallyEdited) {
      if (!parcelas || parcelas.length === 0) return;

      const total = parcelas.reduce((acc, parcela) => {
        const valor = parseFloat(parcela.valorPago || "0");
        return acc + (isNaN(valor) ? 0 : valor);
      }, 0);

      setForm((prevForm) => ({
        ...prevForm,
        valorPago: (Number(total) / 100).toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
      }));
    }
  }, [parcelas, isValorPagoManuallyEdited]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const formatDisplayValue = (value: string): string => {
    const onlyNumbers = value.replace(/\D/g, "");
    const number = parseInt(onlyNumbers || "0", 10);
    return (number / 100).toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const parseToPureNumber = (value?: string | null): string => {
  if (!value) return "0"; 
  const numericValue = value.replace(/\D/g, ""); 
  return numericValue === "" ? "0" : numericValue; 
};


  const handleValorPagoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const onlyNumbers = value.replace(/\D/g, "");

    setForm((prevForm) => ({
      ...prevForm,
      valorPago: formatDisplayValue(onlyNumbers),
    }));
    setIsValorPagoManuallyEdited(true);
  };

  const handleValorPagoBlur = () => {
    if (form.valorPago) {
      setForm((prevForm) => ({
        ...prevForm,
        valorPago: formatDisplayValue(form.valorPago),
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formToSubmit: Form = {
      ...form,
      valorPago: parseToPureNumber(form.valorPago), // Envia apenas números
    };

    if (!form.parcelasDetalhadas || form.parcelasDetalhadas.length === 0) {
      delete formToSubmit.parcelasDetalhadas;
    }

    onSubmit(formToSubmit);
  };

  // Atualizar o useEffect que carrega dados iniciais
  useEffect(() => {
    if (initialForm) {
      const formData = { ...initialForm };

      // Converte valorPago para formato de exibição
      if (formData.valorPago) {
        formData.valorPago = formatDisplayValue(formData.valorPago);
      }

      if (
        !formData.parcelasDetalhadas ||
        formData.parcelasDetalhadas.length === 0
      ) {
        delete formData.parcelasDetalhadas;
      }

      setForm(formData);

      if (
        initialForm.parcelasDetalhadas &&
        initialForm.parcelasDetalhadas.length > 0
      ) {
        const parcelasIniciais = initialForm.parcelasDetalhadas.map((p) => ({
          ...p,
          valorPago: p.valorPago || "",
          dataPagamento: p.dataPagamento || "",
        }));
        setParcelas(parcelasIniciais);
      } else {
        setParcelas([]);
      }
    }
  }, [initialForm]);

  console.log(parcelas);
  return (
    <div className="row gx-4 gy-4">
      <div className="col-12 col-lg-6">
        <div className="card p-4 h-100 shadow-sm">
          <form onSubmit={handleSubmit}>
            <label htmlFor="valorInput" className="form-label">
              Valor Pago (Total das Parcelas):
            </label>
            <input
              type="text"
              name="valorPago"
              id="valorInput"
              className="form-control"
              value={form.valorPago}
              onChange={handleValorPagoChange}
              onBlur={handleValorPagoBlur}
            />
            <label htmlFor="rePagamento" className="form-label">
              O cliente realizou o pagamento?
            </label>
            <select
              className="form-select mb-3"
              id="rePagamento"
              name="rePagamento"
              value={form.rePagamento}
              onChange={handleInputChange}
            >
              <option value="">Selecione uma opção</option>
              <option value="sim">Sim</option>
              <option value="nao">Não</option>
              <option value="cancelado">Cancelado</option>
            </select>

            <label htmlFor="dataPagamento" className="form-label">
              Data do Pagamento (Geral):
            </label>
            <input
              type="date"
              name="dataPagamento"
              id="dataPagamento"
              className="form-control mb-3"
              value={form.dataPagamento}
              onChange={handleInputChange}
            />

            <label htmlFor="comprovante" className="form-label">
              Comprovante do Pagamento:
            </label>
            <input
              type="text"
              name="comprovante"
              id="comprovante"
              className="form-control mb-3"
              value={form.comprovante}
              onChange={handleInputChange}
            />
            <label htmlFor="comprovante" className="form-label">
              Link do Boleto:
            </label>
            <input
              type="text"
              name="linkBoleto"
              id="linkBoleto"
              className="form-control mb-3"
              value={form.linkBoleto}
              onChange={handleInputChange}
            />

            <hr className="w-50 mx-auto" />

            <div className="encaminheCob">
              <label htmlFor="encaminharCliente">
                Deseja encaminhar para a cobrança?
              </label>
              <select
                className="form-select mb-3"
                id="encaminharCliente"
                name="encaminharCliente"
                value={form.encaminharCliente}
                onChange={handleInputChange}
                required
              >
                <option value="">Selecione um usuário</option>
                {usuariosCobranca.map((usuario) => (
                  <option key={usuario.id} value={usuario.id}>
                    {usuario.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className="d-flex gap-3 justify-content-center">
              <button
                type="button"
                className="btn btn-danger mt-4"
                onClick={sairFicha}
              >
                Sair
              </button>
              <button type="submit" className="btn btn-primary mt-4">
                Salvar
              </button>
            </div>
          </form>
        </div>
      </div>
{
  
}
      <div className="col-12 col-lg-6">
        {parcelas.length > 0 && (
          <ListaDeParcelas
            parcelas={parcelas}
            handleParcelaChange={handleParcelaChange}
          />
        )}
      </div>
    </div>
  );
};
