declare module "numero-por-extenso" {
  interface Opcoes {
    genero?: "masculino" | "feminino";
    moeda?: boolean;
    separadorUnidade?: string;
  }

  export function porExtenso(
    numero: number,
    opcoes?: Opcoes
  ): string;

  const numeroPorExtenso: {
    porExtenso: typeof porExtenso;
  };

  export default numeroPorExtenso;
}
