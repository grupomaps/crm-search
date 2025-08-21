import React, { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";

interface MarketingForm {
  artLink: string;
  creationOrUpdate: string;
  responsible: string;
  completionDate: string;
  servicosConcluidos: boolean;
  contratoLink: string;
  linkGoogle: string;

  otimizacaoPagina: boolean;
  alteracaoInfo: boolean;
  cartaoDigital: boolean;
  qrCode: boolean;
  anuncioPatrocinado: boolean;
  postagemRede: boolean;
}

interface MarketingFormProps {
  form: MarketingForm | null;
  onSubmit: (data: MarketingForm) => void;
}

export const MarketingForm: React.FC<MarketingFormProps> = ({
  form: initialForm,
  onSubmit,
}) => {
  const [form, setForm] = useState<MarketingForm>({
    artLink: "",
    creationOrUpdate: "Criação",
    responsible: "",
    completionDate: "",
    contratoLink: "",
    servicosConcluidos: false,
    linkGoogle: "",

    otimizacaoPagina: false,
    alteracaoInfo: false,
    cartaoDigital: false,
    qrCode: false,
    anuncioPatrocinado: false,
    postagemRede: false,
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
    <form onSubmit={handleSubmit}>
      <div></div>
      <div className="row">
        <div className="card col-md-6 p-4">
          <h5 className="mb-2">Checklist de Itens de Marketing</h5>
          <table className="table table-bordered">
            <tbody>
              <tr>
                <td>Otimização da página</td>
                <td>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="otimizacaoPagina"
                      name="otimizacaoPagina"
                      checked={form.otimizacaoPagina}
                      onChange={handleInputChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="otimizacaoPagina"
                    >
                      Sim
                    </label>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Alteração de endereço e telefone</td>
                <td>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="alteracaoInfo"
                      name="alteracaoInfo"
                      checked={form.alteracaoInfo}
                      onChange={handleInputChange}
                    />
                    <label className="form-check-label" htmlFor="alteracaoInfo">
                      Sim
                    </label>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Cartão Digital</td>
                <td>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="cartaoDigital"
                      name="cartaoDigital"
                      checked={form.cartaoDigital}
                      onChange={handleInputChange}
                    />
                    <label className="form-check-label" htmlFor="cartaoDigital">
                      Sim
                    </label>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Qr Code</td>
                <td>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="qrCode"
                      name="qrCode"
                      checked={form.qrCode}
                      onChange={handleInputChange}
                    />
                    <label className="form-check-label" htmlFor="qrCode">
                      Sim
                    </label>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Anúncio Patrocinado</td>
                <td>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="anuncioPatrocinado"
                      name="anuncioPatrocinado"
                      checked={form.anuncioPatrocinado}
                      onChange={handleInputChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="anuncioPatrocinado"
                    >
                      Sim
                    </label>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Conteúdo para Postagem</td>
                <td>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="postagemRede"
                      name="postagemRede"
                      checked={form.postagemRede}
                      onChange={handleInputChange}
                    />
                    <label className="form-check-label" htmlFor="postagemRede">
                      Sim
                    </label>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="card col-md-6 p-4">
          <h5 className="mb-3">Informações de Marketing</h5>

          <div className="mb-2">
            <label>Link da Arte Personalizada</label>
            <input
              type="text"
              name="artLink"
              className="form-control"
              value={form.artLink}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Criação ou Atualização</label>
            <select
              name="creationOrUpdate"
              className="form-select"
              value={form.creationOrUpdate}
              onChange={handleInputChange}
            >
              <option value="Criação">Criação</option>
              <option value="Atualização">Atualização</option>
            </select>
          </div>

          <div className="mb-3">
            <label>Responsável</label>
            <input
              type="text"
              name="responsible"
              className="form-control"
              value={form.responsible}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Data da Conclusão</label>
            <input
              type="date"
              name="completionDate"
              className="form-control"
              value={form.completionDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-check mt-4">
            <input
              type="checkbox"
              className="form-check-input"
              id="servicosConcluidos"
              name="servicosConcluidos"
              checked={form.servicosConcluidos}
              onChange={handleInputChange}
            />
            <label className="form-check-label" htmlFor="servicosConcluidos">
              Serviços Concluídos?
            </label>
          </div>
        </div>
      </div>
      <div className="container-btn-ficha-marketing">
        <button type="submit" className="btn btn-success mt-3 ">
          Salvar
        </button>
      </div>
    </form>
  );
};
