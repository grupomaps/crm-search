export const formatDateToBrazilian = (dateString: string) => {
  const date = new Date(dateString);
  date.setHours(date.getHours() + 3);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const formatValor = (value: string): string => {
  return value.replace(/\D/g, "").replace(/(\d)(\d{2})$/, "$1,$2");
};

export const formatCurrency = (valor?: string | number) => {
  if (!valor) return "0,00";
  const num =
    typeof valor === "string" ? parseInt(valor.replace(/\D/g, "")) : valor;
  return (num / 100).toFixed(2).replace(".", ",");
};

export const formatCNPJ = (value: string) =>
  value
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3/$4")
    .replace(/(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d)/, "$1.$2.$3/$4-$5")
    .substring(0, 18);

export const formatCPF = (value: string) =>
  value
    .replace(/\D/g, "")
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4")
    .substring(0, 14);

export const formatCelular = (value: string) =>
  value
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d{4})$/, "$1-$2")
    .substring(0, 15);

export const formatFixo = (value: string) =>
  value
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/^(\(\d{2}\)) (\d{4})(\d)/, "$1 $2-$3")
    .substring(0, 14);

export const formatarCentavosParaReais = (
  valor: string | number | undefined
): string => {
  if (!valor) return "0,00";

  const valorString = typeof valor === "number" ? valor.toString() : valor;
  const somenteNumeros = valorString.replace(/\D/g, "");

  if (somenteNumeros.length < 3) {
    return (parseInt(somenteNumeros || "0", 10) / 100)
      .toFixed(2)
      .replace(".", ",");
  }

  const reais = somenteNumeros.slice(0, -2);
  const centavos = somenteNumeros.slice(-2);
  return `${reais},${centavos}`;
};

export const formatarDataParaBR = (data: string | undefined): string => {
  if (!data) return "";

  const [ano, mes, dia] = data.split("-");
  return `${dia}/${mes}/${ano}`;
};

export function formatarNomeOperador(nome: string | undefined): string {
  if (!nome) return "[NOME OPERADOR]";
  return nome
    .split(".")
    .map((parte) => parte.charAt(0).toUpperCase() + parte.slice(1))
    .join(" ");
}

export const formatCEP = (value: string): string => {
  const onlyNumbers = value.replace(/\D/g, "").substring(0, 8);

  if (onlyNumbers.length > 5) {
    return `${onlyNumbers.slice(0, 5)}-${onlyNumbers.slice(5)}`;
  }

  return onlyNumbers;
};
