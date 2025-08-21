import React from "react";
import { QRCodeSVG } from "qrcode.react";

interface VendaData {
  observacoes: string;
  linkGravacao: string;
  renovacaoAutomatica: string;
  criacao: string;
  ctdigital: string;
  logotipo: string;
  anuncio: string;
  linkAssinatura: string;
}

interface EditInfoAdicionaisProps {
  form: VendaData | null;
  handleInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
}

const TextAreaField = ({
  id,
  label,
  name,
  value,
  onChange,
  placeholder,
}: {
  id: string;
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
}) => (
  <div className="form-group mb-3">
    <label htmlFor={id}>{label}</label>
    <textarea
      className="form-control textarea-resizable"
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      rows={3}
      placeholder={placeholder}
      style={{ resize: "both", overflow: "auto", width: "100%" }}
    />
  </div>
);

const InputField = ({
  id,
  label,
  name,
  value,
  onChange,
  placeholder,
}: {
  id: string;
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}) => (
  <div className="form-group mb-3">
    <label htmlFor={id}>{label}</label>
    <input
      type="text"
      id={id}
      className="form-control"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  </div>
);

const SelectField = ({
  id,
  label,
  name,
  value,
  onChange,
}: {
  id: string;
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) => (
  <div className="form-group mb-3">
    <label htmlFor={id}>{label}</label>
    <select
      id={id}
      name={name}
      className="form-control"
      value={value}
      onChange={onChange}
    >
      <option value="Sim">Sim</option>
      <option value="Não">Não</option>
    </select>
  </div>
);

const SelectOption = ({
  id,
  label,
  name,
  value,
  options,
  onChange,
}: {
  id: string;
  label: string;
  name: string;
  value: string;
  options: Array<{ value: string; label: string }>;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) => (
  <div className="form-group mb-3 col-md-3">
    <label htmlFor={id}>{label}</label>
    <select
      className="form-control"
      id={id}
      name={name}
      value={value}
      onChange={onChange}
    >
      <option value="">Selecione</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export const EditInfoAdicionais: React.FC<EditInfoAdicionaisProps> = ({
  form,
  handleInputChange,
}) => {
  if (!form) return null;

  return (
    <div>
      <h4 className="text-white">Informações Adicionais</h4>

      <TextAreaField
        id="observacoes"
        label="Observações"
        name="observacoes"
        value={form.observacoes}
        onChange={handleInputChange}
        placeholder="Adicione observações ou comentários relevantes..."
      />
 <InputField
      id="linkAssinatura"
      label="Link da Assinatura"
      name="linkAssinatura"
      value={form.linkAssinatura}
      onChange={handleInputChange}
      placeholder="Cole o link da assinatura aqui"
    />
      <SelectField
        id="renovacaoAutomatica"
        label="Renovação Automática"
        name="renovacaoAutomatica"
        value={form.renovacaoAutomatica}
        onChange={handleInputChange}
      />
     
    </div>
  );
};
