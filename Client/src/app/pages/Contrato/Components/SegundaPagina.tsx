interface EmpresaData {
  responsavel: string;
  cargo: string;
}

interface SegundaPaginaProps {
  empresaData: EmpresaData;
}

const SegundaPagina = ({ empresaData }: SegundaPaginaProps) => {
  return (
    <div className="segundaPagina">
      <div className="faixa-roxa-top">
        <h1 className="text-center">
          GO.GESTÃO DE <span style={{ color: "#ec4b5b" }}>AN</span>
          <span style={{ color: "#F4B400" }}>Ú</span>
          <span style={{ color: "#0F9D58" }}>N</span>
          <span style={{ color: "#4285F4" }}>C</span>
          <span style={{ color: "#ff914d" }}>IO</span>
          <span style={{ color: "#0F9D58" }}>S</span>
        </h1>
        <h4 className="fw-light">
          TERMOS DE USO PARA SUPORTE E ASSESSORIA DE SERVIÇOS.
        </h4>
      </div>
      <div className="d-flex flex-column justify-content-between">
        <div className="termos-contrato-segunda">
          <small>
            1)Declaro ter recebido todas as informações referente a prestação de
            serviço da empresa estando em total e plena concordância com a
            adesão dos serviços supracitados; Atualização e divulgação dos dados
            que constam na plataforma digital do Google Maps, O contratante
            poderá encaminhar para a contratado mensalmente 30 fotos e 5 vídeos
            para atualização de sua página, horário de funcionamento, inclusão
            de site/páginas de redes sociais/telefones para contato/ajuda para
            criação de anúncios/fica acordado que a contratante deve entrar em
            contato com a contratada para solicitar o devido suporte quando
            necessário, e por estar devidamente autorizado a responder pela
            empresa ativa e passivamente assumo as obrigações deste contrato
            conforme cláusulas; 2) Como proponente estou de acordo que a empresa
            Goo Ads Gestão de Anúncios (Cobrax Assessoria CNPJ
            48.497.162/0001-03), realize a administração de minha página dentro
            do site de busca da Google, realizando mudanças e alterações quando
            solicitado por parte do contratante, a empresa supracitada nas
            condições gerais estabelecidas pela lei 10.406/02 e lei 8.078/90 e
            condições particulares definidas em caráter irrevogável e
            irretratável. A validação deste contrato dar-se de acordo assinatura
            para o vínculo contratual conforme Código Civil, 107. 3) Este
            termo/contrato tem sua validade de validade de 3 anos. O vencimento
            da 1° parcela será no 3° dia após a assinatura do contrato. Para
            cancelamento do serviços sem ônus é necessário que seja feita a
            solicitação de cancelamento antes da prestação do serviços e deverá
            ser feita por escrito através do e-mail sac@gooadsgestao.com.br
            formalizando o pedido. Após este prazo dá-se 23 dias corridos para o
            cancelamento com multa de 40% (quarenta por cento) sobre o valor
            total do contrato. 4) A inadimplência de qualquer das parcelas,
            implicará no vencimento antecipado no saldo devedor e o envio aos
            órgãos de proteção ao crédito (spc e protesto em Cartório),
            acrescido de juros de mora de 2% e taxas de juros de 12% ao ano. 5)
            O presente contrato considera se sucessivamente renovado para o(s)
            mesmo(s) serviço(s) com antecedência de 60 dias de antecedência do
            término do prazo em curso, se não houver a manifestação expressa em
            contrário(s) entre contratante (s) e contratada mantendo-se as
            mesmas prestações devidamente autorizada vencíveis a mesma época. 6)
            Se somente quitada a primeira edição, está não dará nulidade ao
            contrato, a saber, a cobrança da(s) outras edições fica(m) a tempo e
            critério da contratada. 7) A data inicial da vigência prevista
            poderá ser alterada conforme necessidade da contratada sem que isso
            caracterize prejuízo ao proponente/contratante. 8) No período de
            24(horas) após a contratação, estará inserida no site
            www.gooadsgestao.com.br o cadastro do proponente com todas as suas
            inclusões e atualizações no cadastro do proponente, importante
            ressaltar que esta empresa não possui vínculos com a Google Brasil e
            sim presta serviços técnicos para empresas prestando o seguinte
            suporte; Atualização de dados na plataforma digital do Google Maps,
            Criação de Qr-Code Direcionador, Cartão digital interativo e
            inclusão no site de buscas. O contratante poderá encaminhar para a
            contratado mensalmente 30 fotos e 05 vídeos para atualização de sua
            página através do WhatsApp número (11) 5555-2089. 9) Na hipótese de
            atraso no pagamento deste contrato, poderá a contratada a qualquer
            tempo ao seu exclusivo critério promover ação judicial cabível em
            face do proponente/contratante para cumprimento da obrigação
            adquirida. 10) A contratada não respondera por prejuízo resultantes
            de erros totais ou parciais que venham a ocorrer nos dados ou
            figurações fornecidas pelo proponente/contratante cujas
            características e conteúdo são de exclusiva responsabilidade. Caberá
            a contratada o direito de propor ação regressiva contra o
            proponente/contratante caso esta seja condenada a reparar danos
            causados a terceiros por efeito da publicidade ora autorizada. 11) O
            signatário desta contratação de publicidade declara estar autorizado
            pelos dados informados neste instrumento e responderá solidariamente
            pelas obrigações nele contida. 12) As partes elegem o foro da
            capital do estado de São Paulo para dirimir eventuais questões deste
            contrato, renunciando a qualquer outro por mais privilegiado que
            seja. Declaro ter recebido por e-mail e WhatsApp cópia deste
            documento após ter lido as informações a mim passadas e por estar
            devidamente habilitado a responder pela empresa ativa e
            passivamente, assumo as obrigações deste documento.
          </small>
        </div>
        <div className="row footer-segunda-pagina px-4">
          <div className="col-md-6">
            <div className="mb-3">
              <div className="d-flex align-items-center">
                <div className="linha-infos-termos">
                  {empresaData.responsavel}
                </div>
              </div>
              <label htmlFor="nomeAutorizante" className="form-label">
                NOME DO AUTORIZANTE
              </label>
            </div>
            <div className="mb-3">
              <div className="linha-infos-termos">{empresaData.cargo}</div>
              <label htmlFor="cargo" className="form-label">
                CARGO
              </label>
            </div>
          </div>

          <div className="col-md-6">
            <div className="mb-3">
              <div className="linha-infos-termos"></div>
              <label htmlFor="contratada" className="form-label">
                CONTRATADA
              </label>
            </div>
            <div className="mb-3">
              <div className="linha-infos-termos"></div>
              <label htmlFor="contratante" className="form-label">
                CONTRATANTE
              </label>
            </div>
          </div>
        </div>

        <h5 className="text-center mt-3 fw-bold">SAC@GOODADSGESTAO.COM.BR</h5>
        {/* <div className="faixa-roxa-bottom-segunda"/> */}
      </div>
    </div>
  );
};

export default SegundaPagina;
