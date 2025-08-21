import React, { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";

interface posVendaForm {
  posVendaConcuida: boolean;
  operadorPosVenda:string
}


interface posVendaFormProps {
  form: posVendaForm | null;
  onSubmit: (data: posVendaForm) => void;
}

export const MarketingForm: React.FC<posVendaFormProps> = ({
  form: initialForm,
  onSubmit,
}) => {
  const [form, setForm] = useState<posVendaForm>({
    posVendaConcuida: false,
    operadorPosVenda: "",
  });

  useEffect(() => {
    if (initialForm) {
      setForm(initialForm);
    }
  }, [initialForm]);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="card p-4 mb-4" onSubmit={handleSubmit}>
      <h2 className="text-center">Informações de Pós Venda</h2>
      <label>Operador do Pós Venda</label>
      <div className="mb-3">
        <input
          className="form-control"
          type="text"
          id="operadorPosVenda"
          name="operadorPosVenda"
          value={form.operadorPosVenda}
          onChange={handleInputChange}
        />
      </div>

      <label>Serviços Concluídos?</label>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          id="posVendaConcuida"
          name="posVendaConcuida"
          checked={form.posVendaConcuida}
          onChange={handleInputChange}
        />
        <label className="form-check-label" htmlFor="posVendaConcuida">
          Sim
        </label>
      </div>

      <button type="submit" className="btn btn-primary">
        Salvar
      </button>
    </form>
  );
};
