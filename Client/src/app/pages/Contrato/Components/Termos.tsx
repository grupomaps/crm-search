import { QRCodeSVG } from "qrcode.react";
import React from "react";
import { Link } from "react-router-dom";

interface Empresa {
  linkGravacao: string;
}

const Termos: React.FC<{ empresa: Empresa }> = ({ empresa }) => {
  return (
    <section className="termos-container">
      <div className="row">
        <div className="text-center">
          <h1>TERMOS DE USO PARA GESTÃO DE TRAFEGO.</h1>
        </div>
        <div>
          <p>
            <b>
              TERMO DE USO DOS SERVIÇOS DE OTIMIZAÇÃO DE PERFIS NO GOOGLE MAPS
            </b>
            <br />
            <br />
            TAYFE CONTACT CENTER LTDA <br />
            CNPJ: 55.158.835/0001-66
            <br />
            E-mail: Comercial@tfgestaodetrafego.com.br
            <br />
            <br />
            <b>1. OBJETO</b>
            <br />
            TAYFE CONTACT CENTER LTDA, consistentes em ações de marketing
            digital, com foco em otimização, atualização e manutenção de perfis
            comerciais no Google Maps (Google Business Profile).
            <br />
            O presente Termo de Uso regula a contratação dos serviços prestados
            pela TAYFE INTERMEDIAÇÕES
            <br />
            <br />
            <b>2. ACEITE VERBAL E NATUREZA DA CONTRATAÇÃO</b>
            <br />
            <br />
            Código Civil (Lei nº 10.406/2002)
            <br />
            ➡️ O Código Civil reconhece a validade do contrato em aceite verbal.
            <br />
            Ao aceitar este termo, o CONTRATANTE declara ciência de que está
            contratando um serviço personalizado e sob demanda, com início da
            execução e entrega imediata, Serviço prestado totalmente com
            consentimento claro do consumidor antes dos 7 dias o que o exclui da
            aplicação do artigo 49 do Código de Defesa do Consumidor, o direito
            de arrependimento, conforme previsão legal para serviços
            personalizados com execução imediata.
            <br />
            <br />
            <b>3. ESCOPO DOS SERVIÇOS</b>
            <br />
            <br />
            Os serviços incluem, mas não se limitam a:
            <br />
            a) Criação ou otimização de ficha comercial no Google Maps;
            <br />
            b) Inclusão e atualização de dados comerciais (endereço, telefone,
            website, horários etc.);
            <br />
            c) Vinculação com redes sociais;
            <br />
            d) Criação de cartão digital;
            <br />
            e) Ações para melhoria de visibilidade do perfil na busca local;
            <br />
            f) Suporte via WhatsApp ou e-mail.
            <br />
            g) Criação do qr code para recarga do Google Ads, quando solicitado.
            <br />
            <br />
            <b>4. CONDIÇÕES DE PAGAMENTO</b>
            <br />
            <br />
            O pagamento será realizado conforme as condições previamente
            acordadas via Telefone, WhatsApp ou e-mail, podendo ocorrer por meio
            de boleto bancário ou outras formas definidas entre as partes. O não
            pagamento poderá acarretar a suspensão imediata dos serviços.
            <br />
            <br />
            <div className="page-break" />
            <b>5. PRAZO DE EXECUÇÃO E RENOVAÇÃO</b>
            <br />
            <br />
            Os serviços serão prestados pelo prazo contratado, podendo ser
            renovados automaticamente se não houver manifestação expressa em
            contrário por qualquer das partes, com antecedência mínima de 30
            (trinta) dias do término do contrato.
            <br />
            <br />
            <b>6. LIMITAÇÕES DE RESPONSABILIDADE</b>
            <br />
            <br />
            A TAYFE CONTACT CENTER LTDA não se responsabiliza por alterações, suspensões ou bloqueios realizados diretamente pelo Google em perfis de empresas, tampouco por políticas ou critérios de indexação e ranqueamento definidos pela plataforma.
            <br />
           O serviço contratado é de meio e não de resultado, ou seja, não há garantia de posicionamento específico na busca do Google Maps.
            <br />
            <br />
            <b>7. CONFIDENCIALIDADE E DADOS</b>
            <br />
            <br />
            Todas as informações trocadas entre as partes serão tratadas com confidencialidade. Os dados fornecidos pelo CONTRATANTE serão utilizados apenas para fins de execução dos serviços contratados, em conformidade com a LGPD (Lei nº 13.709/2018).
            <br />
            <br />
            <b>8. RESCISÃO</b>
            <br />
            <br />
            Este contrato poderá ser rescindido por qualquer das partes, a qualquer momento de forma gratuita quando solicitado antes da prestação de serviços. Para cancelamento do Contrato dar-se 23 dias corridos para cancelamento mediante  a Multa Contratual de 40% sobre o valor total do Contrato. Não haverá devolução de valores em caso de rescisão após o início da execução dos serviços, por se tratar de serviço personalizado. A inadimplencia de qualquer das parcelas , implicará no vencimento antecipado do saldo devedor, e envio aos Orgão de Proteção ao Crédito(spc/serasa e cartório). 
            <br />
            <br />
            <b>9. DO VALOR E FORMA DE PAGAMENTO</b>
            <br />
            <br />
            As informações sobre a descrição do plano com os itens contratados, valor periodicidade de pagamento, bem como a cópia deste contrato serão enviados automaticamente para o e-mail do CLIENTE, após o ACEITE VERBAL , contratual digital que será apresentado antes da tela do primeiro pagamento.  O pagamento deverá ser efetuado com 7 dias da assinatura, através das opções existentes no e-mail, que será enviado ao CLIENTE pela TAYFE INTERMEDIAÇÕES, nominado como “LEMBRETE DE VENCIMENTO ”. 
            <br />
            Este e-mail será disparado aos e-mails de cadastro do CLIENTE em no mínimo 3 dias antes da data do vencimento, o valor do pagamento  refere-se ao Plano escolhido pelo Contratante podendo ser ele  (trimestral )249,99. ou  (Semestral )499,99 .  
            <br />
            <br />
            <div className="page-break" />
            Inclusão e atualização de dados comerciais (endereço, telefone,
            website, horários etc.);
            <br />
            a) Vinculação com redes sociais;
            <br />
            b) Criação de cartão digital;
            <br />
            c) Ações para melhoria de visibilidade do perfil na busca local;
            <br />
            d) Suporte via WhatsApp ou e-mail.
            <br />
            Gestão de anúncios: a responsabilidade das recargas é exclusivamente
            do Contratante.
            <br />
            <br />
            <b>DECLARAÇÃO DE CIÊNCIA E ACEITE</b>
            <br />
            <br />
           Declaro que li, compreendi e aceito integralmente os termos aqui expostos, ciente de que se trata de um serviço personalizado, com execução imediata, não aplicando-se o direito de arrependimento previsto no art. 49 do Código de Defesa do Consumidor.
            <br />
            <br />
            <b>10. FORO</b>
            <br />
            <br />
            Fica eleito o foro da Comarca de São Paulo – SP para dirimir quaisquer dúvidas ou controvérsias oriundas deste termo por mais previlegiada que seja.
            <br />
          </p>
        </div>
      </div>
      <div className="qrcode-contrato">
        <h2>QR Code da Gravação</h2>
        <a
          href={empresa.linkGravacao}
          target="_blank"
          rel="noopener noreferrer"
        >
          <QRCodeSVG value={empresa.linkGravacao} size={150} />
        </a>
      </div>
    </section>
  );
};

export default Termos;
