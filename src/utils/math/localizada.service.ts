import { Injectable } from '@nestjs/common';
import { CreateCalcDto } from '@/modules/calc/dto/create-calc.dto';
import { CalcService } from '@/modules/calc/calc.service';

@Injectable()
export class LocalizadaService {
  constructor(private readonly calcService: CalcService) {}

  async calcularDecisaoIrrigacao(
    profundidadeSistemaRadicular,
    capacidadeCampo,
    fatorF,
    densidadeSolo,
    pontoMurcha,
    precipitacao,
    estagio,
    coeficienteUniformidade,
    vazaoEmissor,
    espacamentoEntreLinhas,
    espacamentoEntreEmissores,
    kcEstagio1,
    kcEstagio2,
    kcEstagio3,
    kcEstagio4,
    duracaoEstagio1,
    duracaoEstagio2,
    duracaoEstagio3,
    duracaoEstagio4,
    areaSombreadaEstagio1,
    areaSombreadaEstagio2,
    areaSombreadaEstagio3,
    areaSombreadaEstagio4,
    percentualAreaMolhada,
    quantidadeSetores,
    areaPlantio,
    dadoETO,
    kcAjustadoDiaAnterior,
    dadoArmazenamentoFinalDiaAnterior,
    dadoLaminaLiquidaPreviaDiaAnterior,
    armazenamentoInicialPrimeiroDia,
    totalDiasEstagio,
    idCultura,
    tempoIrrigacaoDiaAnterior,
    idCalc,
  ) {
    let tempoIrrigacaoEfetuado = 0;

    const dadosPrimeiraExecucao = await this.executarCalculos(
      'visualization',
      profundidadeSistemaRadicular,
      capacidadeCampo,
      fatorF,
      densidadeSolo,
      pontoMurcha,
      precipitacao,
      estagio,
      coeficienteUniformidade,
      vazaoEmissor,
      espacamentoEntreLinhas,
      espacamentoEntreEmissores,
      kcEstagio1,
      kcEstagio2,
      kcEstagio3,
      kcEstagio4,
      duracaoEstagio1,
      duracaoEstagio2,
      duracaoEstagio3,
      duracaoEstagio4,
      areaSombreadaEstagio1,
      areaSombreadaEstagio2,
      areaSombreadaEstagio3,
      areaSombreadaEstagio4,
      percentualAreaMolhada,
      quantidadeSetores,
      areaPlantio,
      dadoETO,
      kcAjustadoDiaAnterior,
      dadoArmazenamentoFinalDiaAnterior,
      dadoLaminaLiquidaPreviaDiaAnterior,
      armazenamentoInicialPrimeiroDia,
      totalDiasEstagio,
      idCultura,
      tempoIrrigacaoDiaAnterior,
      tempoIrrigacaoEfetuado,
      idCalc,
    );

    const irrigacao = dadosPrimeiraExecucao.decisao;

    if (irrigacao === 'Irrigar') {
      const tempo = dadosPrimeiraExecucao.tempo_irrigacao;
      tempoIrrigacaoEfetuado = parseFloat(tempo.toFixed(2));

      await this.executarCalculos(
        'parameter',
        profundidadeSistemaRadicular,
        capacidadeCampo,
        fatorF,
        densidadeSolo,
        pontoMurcha,
        precipitacao,
        estagio,
        coeficienteUniformidade,
        vazaoEmissor,
        espacamentoEntreLinhas,
        espacamentoEntreEmissores,
        kcEstagio1,
        kcEstagio2,
        kcEstagio3,
        kcEstagio4,
        duracaoEstagio1,
        duracaoEstagio2,
        duracaoEstagio3,
        duracaoEstagio4,
        areaSombreadaEstagio1,
        areaSombreadaEstagio2,
        areaSombreadaEstagio3,
        areaSombreadaEstagio4,
        percentualAreaMolhada,
        quantidadeSetores,
        areaPlantio,
        dadoETO,
        kcAjustadoDiaAnterior,
        dadoArmazenamentoFinalDiaAnterior,
        dadoLaminaLiquidaPreviaDiaAnterior,
        armazenamentoInicialPrimeiroDia,
        totalDiasEstagio,
        idCultura,
        tempoIrrigacaoDiaAnterior,
        tempoIrrigacaoEfetuado,
        idCalc,
      );
    }
  }

  private async executarCalculos(
    handleCalc,
    profundidadeSistemaRadicular,
    capacidadeCampo,
    fatorF,
    densidadeSolo,
    pontoMurcha,
    precipitacao,
    estagio,
    coeficienteUniformidade,
    vazaoEmissor,
    espacamentoEntreLinhas,
    espacamentoEntreEmissores,
    kcEstagio1,
    kcEstagio2,
    kcEstagio3,
    kcEstagio4,
    duracaoEstagio1,
    duracaoEstagio2,
    duracaoEstagio3,
    duracaoEstagio4,
    areaSombreadaEstagio1,
    areaSombreadaEstagio2,
    areaSombreadaEstagio3,
    areaSombreadaEstagio4,
    percentualAreaMolhada,
    quantidadeSetores,
    areaPlantio,
    dadoETO,
    kcAjustadoDiaAnterior,
    dadoArmazenamentoFinalDiaAnterior,
    dadoLaminaLiquidaPreviaDiaAnterior,
    armazenamentoInicialPrimeiroDia,
    totalDiasEstagio,
    idCultura,
    tempoIrrigacaoDiaAnterior,
    tempoIrrigacaoEfetuado,
    idCalc,
  ) {
    const ETO = dadoETO;
    // console.log('ETO:', ETO);

    const pontoMurchaCalculado = pontoMurcha / 100;
    // console.log('pontoMurchaCalculado:', pontoMurchaCalculado);

    const capacidadeCampoCalculado = capacidadeCampo / 100;
    // console.log('capacidadeCampoCalculado:', capacidadeCampoCalculado);

    const umidadeCriticaPercentual =
      (capacidadeCampoCalculado -
        fatorF * (capacidadeCampoCalculado - pontoMurchaCalculado)) *
      100;
    // console.log('umidadeCriticaPercentual:', umidadeCriticaPercentual);

    const umidadeCritica = umidadeCriticaPercentual / 100;
    // console.log('umidadeCritica:', umidadeCritica);

    const disponibilidadeTotalAgua =
      ((capacidadeCampoCalculado * 100 - pontoMurchaCalculado * 100) / 10) *
      densidadeSolo;
    // console.log('disponibilidadeTotalAgua:', disponibilidadeTotalAgua);

    const laminaArmazenamento =
      disponibilidadeTotalAgua * profundidadeSistemaRadicular;
    // console.log('laminaArmazenamento:', laminaArmazenamento);

    const laminaLiquidaPreviaDiaAnterior = dadoLaminaLiquidaPreviaDiaAnterior;
    // console.log(
    // 'laminaLiquidaPreviaDiaAnterior',
    // laminaLiquidaPreviaDiaAnterior,
    // );

    const armazenamentoFinalDiaAnterior = dadoArmazenamentoFinalDiaAnterior;
    // console.log('armazenamentoFinalDiaAnterior', armazenamentoFinalDiaAnterior);

    const laminaArmazenada =
      laminaArmazenamento - laminaLiquidaPreviaDiaAnterior;
    // console.log('laminaArmazenada:', laminaArmazenada);

    const ks =
      Math.log(laminaArmazenada + 1) / Math.log(laminaArmazenamento + 1);
    // console.log('ks:', ks);

    const kcAjustado = this.calcularKcAjustado(
      estagio,
      kcEstagio1,
      kcEstagio2,
      kcEstagio3,
      kcEstagio4,
      kcAjustadoDiaAnterior,
      duracaoEstagio2,
      duracaoEstagio4,
    );
    // console.log('kcAjustado:', kcAjustado);

    const percentualAreaSombreadaPrevia =
      this.calcularPercentualAreaSombreadaPrevia(
        estagio,
        areaSombreadaEstagio1,
        areaSombreadaEstagio2,
        areaSombreadaEstagio3,
        areaSombreadaEstagio4,
      );
    // console.log(
    // 'percentualAreaSombreadaPrevia:',
    // percentualAreaSombreadaPrevia,
    // );

    const percentualAreaSombreadaCorrigida =
      this.calcularPercentualAreaSombreadaCorrigida(
        estagio,
        areaSombreadaEstagio1,
        areaSombreadaEstagio2,
        areaSombreadaEstagio3,
        areaSombreadaEstagio4,
        duracaoEstagio1,
        duracaoEstagio2,
        duracaoEstagio3,
        totalDiasEstagio,
      );
    // console.log(
    // 'percentualAreaSombreadaCorrigida:',
    // percentualAreaSombreadaCorrigida,
    // );

    const kcLimite =
      0.1 *
      Math.pow(
        Math.max(percentualAreaSombreadaCorrigida, percentualAreaMolhada),
        0.5,
      );
    // console.log('kcLimite:', kcLimite);

    const etcDiaAtualCulturaCorrigida = kcAjustado * ETO * ks * kcLimite;
    // console.log('etcDiaAtualCulturaCorrigida:', etcDiaAtualCulturaCorrigida);

    const etcDiaAtualCultura = kcAjustado * ETO;
    // console.log('etcDiaAtualCultura:', etcDiaAtualCultura);

    const laminaLiquidaPrevia =
      laminaLiquidaPreviaDiaAnterior + etcDiaAtualCulturaCorrigida;
    // console.log('laminaLiquidaPrevia:', laminaLiquidaPrevia);

    const intensidadeAplicacao =
      vazaoEmissor / (espacamentoEntreLinhas * espacamentoEntreEmissores);
    // console.log('intensidadeAplicacao:', intensidadeAplicacao);

    const laminaTotal =
      capacidadeCampoCalculado * (profundidadeSistemaRadicular * 10) -
      pontoMurchaCalculado * (profundidadeSistemaRadicular * 10);
    // console.log('laminaTotal:', laminaTotal);

    const aguaFacilmenteDisponivel = laminaTotal * fatorF;
    // console.log('aguaFacilmenteDisponivel:', aguaFacilmenteDisponivel);

    const armazenamentoInicialDiaAtual = armazenamentoFinalDiaAnterior;
    // console.log('armazenamentoInicialDiaAtual:', armazenamentoInicialDiaAtual);

    const quantidadeTotalAgua = tempoIrrigacaoEfetuado * intensidadeAplicacao;
    // console.log('quantidadeTotalAgua:', quantidadeTotalAgua);

    const irrigacaoRealizada =
      (quantidadeTotalAgua * coeficienteUniformidade) / 100;
    // console.log('irrigacaoRealizada:', irrigacaoRealizada);

    const armazenamentoFinalDiaAtual = this.calcularArmazenamentoFinalDiaAtual(
      armazenamentoFinalDiaAnterior,
      precipitacao,
      irrigacaoRealizada,
      etcDiaAtualCulturaCorrigida,
      armazenamentoInicialPrimeiroDia,
    );
    // console.log('armazenamentoFinalDiaAtual:', armazenamentoFinalDiaAtual);

    const excessoDeficit = this.calcularExcessoDeficit(
      armazenamentoFinalDiaAnterior,
      armazenamentoFinalDiaAtual,
      etcDiaAtualCultura,
      precipitacao,
      irrigacaoRealizada,
      armazenamentoInicialPrimeiroDia,
    );
    // console.log('excessoDeficit:', excessoDeficit);

    const laminaLiquidaSemCorrecao =
      laminaLiquidaPrevia - precipitacao - irrigacaoRealizada;
    // console.log('laminaLiquidaSemCorrecao:', laminaLiquidaSemCorrecao);

    const laminaLiquida = this.calcularLaminaLiquida(laminaLiquidaSemCorrecao);
    // console.log('laminaLiquida:', laminaLiquida);

    const laminaBruta = laminaLiquida / (coeficienteUniformidade / 100);
    // console.log('laminaBruta:', laminaBruta);

    const tempoIrrigacaoSugerido = laminaBruta / intensidadeAplicacao;
    // console.log('tempoIrrigacao:', tempoIrrigacaoSugerido);

    const areaPlantioMetrosQuadrados = areaPlantio * 10000;
    // console.log('areaPlantioMetrosQuadrados:', areaPlantioMetrosQuadrados);

    const volumeAplicadoAreaTotal =
      quantidadeTotalAgua * areaPlantioMetrosQuadrados;
    // console.log('volumeAplicadoAreaTotal:', volumeAplicadoAreaTotal);

    const volumeAplicadoSetor = volumeAplicadoAreaTotal / quantidadeSetores;
    // console.log('volumeAplicadoSetor:', volumeAplicadoSetor);

    const tempoIrrigacaoSugeridoAreaTotal = this.formatarHora(
      tempoIrrigacaoSugerido,
    );
    // console.log(
    // 'tempoIrrigacaoSugeridoAreaTotal:',
    // tempoIrrigacaoSugeridoAreaTotal,
    // );

    const tempoIrrigacaoSugeridoAreaSetor = this.formatarHora(
      tempoIrrigacaoSugerido / quantidadeSetores,
    );
    // console.log(
    // 'tempoIrrigacaoSugeridoAreaSetor:',
    // tempoIrrigacaoSugeridoAreaSetor,
    // );

    const irrigacao = this.decidirIrrigacao(
      armazenamentoFinalDiaAtual,
      armazenamentoInicialPrimeiroDia,
      fatorF,
    );
    // console.log('irrigacao:', irrigacao);

    const currentDate = new Date();

    const dados: CreateCalcDto = {
      armazenamento_inicial_primeiro_dia: parseFloat(
        armazenamentoInicialPrimeiroDia.toFixed(2),
      ),
      total_dias_estagio: totalDiasEstagio + 1,
      armazenamento_final_dia_anterior: parseFloat(
        armazenamentoFinalDiaAnterior.toFixed(2),
      ),
      lamina_liquida_previa_dia_anterior: parseFloat(
        laminaLiquidaPreviaDiaAnterior.toFixed(2),
      ),
      percentual_area_sombreada_previa: parseFloat(
        percentualAreaSombreadaPrevia.toFixed(2),
      ),
      percentual_area_sombreada_corrigida: parseFloat(
        percentualAreaSombreadaCorrigida.toFixed(2),
      ),
      ponto_murcha_calculado: parseFloat(pontoMurchaCalculado.toFixed(2)),
      capacidade_campo_calculado: parseFloat(
        capacidadeCampoCalculado.toFixed(2),
      ),
      umidade_critica_percentual: parseFloat(
        umidadeCriticaPercentual.toFixed(2),
      ),
      umidade_critica: parseFloat(umidadeCritica.toFixed(2)),
      disponibilidade_total_agua: parseFloat(
        disponibilidadeTotalAgua.toFixed(2),
      ),
      lamina_armazenamento: parseFloat(laminaArmazenamento.toFixed(2)),
      lamina_armazenada: parseFloat(laminaArmazenada.toFixed(2)),
      ks: parseFloat(ks.toFixed(2)),
      kc_ajustado: parseFloat(kcAjustado.toFixed(2)),
      kc_limite: parseFloat(kcLimite.toFixed(2)),
      etc_dia_atual_cultura: parseFloat(etcDiaAtualCultura.toFixed(2)),
      etc_dia_atual_cultura_corrigida: parseFloat(
        etcDiaAtualCulturaCorrigida.toFixed(2),
      ),
      lamina_liquida_sem_correcao: parseFloat(
        laminaLiquidaSemCorrecao.toFixed(2),
      ),
      lamina_liquida: parseFloat(laminaLiquida.toFixed(2)),
      lamina_bruta: parseFloat(laminaBruta.toFixed(2)),
      intensidade_aplicacao: parseFloat(intensidadeAplicacao.toFixed(2)),
      tempo_irrigacao: parseFloat(tempoIrrigacaoSugerido.toFixed(2)),
      lamina_total: parseFloat(laminaTotal.toFixed(2)),
      agua_facilmente_disponivel: parseFloat(
        aguaFacilmenteDisponivel.toFixed(2),
      ),
      armazenamento_inicial_dia_atual: parseFloat(
        armazenamentoInicialDiaAtual.toFixed(2),
      ),
      armazenamento_final_dia_atual: parseFloat(
        armazenamentoFinalDiaAtual.toFixed(2),
      ),
      excesso_deficit: parseFloat(excessoDeficit.toFixed(2)),
      quantidade_total_agua: parseFloat(quantidadeTotalAgua.toFixed(2)),
      volume_aplicado_area_total: parseFloat(
        volumeAplicadoAreaTotal.toFixed(2),
      ),
      volume_aplicado_setor: parseFloat(volumeAplicadoSetor.toFixed(2)),
      tempo_irrigacao_sugerido_area_total: tempoIrrigacaoSugeridoAreaTotal,
      tempo_irrigacao_sugerido_area_setor: tempoIrrigacaoSugeridoAreaSetor,
      created_at: currentDate,
      primeiro_calculo: 0,
      decisao: irrigacao,
      tipo_calculo: handleCalc,
      calc_id: idCalc,
      id_cultura: idCultura,
    };

    await this.calcService.create(dados);

    return dados;
  }

  private calcularPercentualAreaSombreadaPrevia(
    estagio,
    areaSombreadaEstagio1,
    areaSombreadaEstagio2,
    areaSombreadaEstagio3,
    areaSombreadaEstagio4,
  ) {
    if (estagio == 1) {
      return areaSombreadaEstagio1;
    }
    if (estagio == 2) {
      return areaSombreadaEstagio2;
    }
    if (estagio == 3) {
      return areaSombreadaEstagio3;
    }
    if (estagio == 4) {
      return areaSombreadaEstagio4;
    }
  }

  private calcularPercentualAreaSombreadaCorrigida(
    estagio,
    areaSombreadaEstagio1,
    areaSombreadaEstagio2,
    areaSombreadaEstagio3,
    areaSombreadaEstagio4,
    duracaoEstagio1,
    duracaoEstagio2,
    duracaoEstagio3,
    totalDiasEstagio,
  ) {
    if (estagio == 1) {
      const result =
        areaSombreadaEstagio1 +
        (totalDiasEstagio / duracaoEstagio1) *
          (areaSombreadaEstagio2 - areaSombreadaEstagio1);
      return result;
    }
    if (estagio == 2) {
      const result =
        areaSombreadaEstagio2 +
        (totalDiasEstagio / duracaoEstagio2) *
          (areaSombreadaEstagio3 - areaSombreadaEstagio2);
      return result;
    }
    if (estagio == 3) {
      const result =
        areaSombreadaEstagio3 +
        (totalDiasEstagio / duracaoEstagio3) *
          (areaSombreadaEstagio4 - areaSombreadaEstagio3);
      return result;
    }
    if (estagio == 4) {
      return areaSombreadaEstagio4;
    }
  }

  private calcularKcAjustado(
    estagio,
    kcEstagio1,
    kcEstagio2,
    kcEstagio3,
    kcEstagio4,
    kcAjustadoDiaAnterior,
    duracaoEstagio2,
    duracaoEstagio4,
  ) {
    let kcAjustado = 0;

    if (estagio == 1) {
      kcAjustado = kcEstagio1;
    }
    if (estagio == 2) {
      kcAjustado =
        kcAjustadoDiaAnterior + (kcEstagio3 - kcEstagio2) / duracaoEstagio2;
    }
    if (estagio == 3) {
      kcAjustado = kcEstagio3;
    }
    if (estagio == 4) {
      kcAjustado =
        kcAjustadoDiaAnterior - (kcEstagio3 - kcEstagio4) / duracaoEstagio4;
    }
    return kcAjustado;
  }

  private calcularArmazenamentoFinalDiaAtual(
    armazenamentoFinalDiaAnterior,
    precipitacao,
    irrigacaoRealizada,
    etcDiaAtualCulturaCorrigida,
    armazenamentoInicialPrimeiroDia,
  ) {
    let resultado;

    if (
      armazenamentoFinalDiaAnterior +
        precipitacao +
        irrigacaoRealizada -
        etcDiaAtualCulturaCorrigida >=
      armazenamentoInicialPrimeiroDia
    ) {
      resultado = armazenamentoInicialPrimeiroDia;
      return resultado;
    } else {
      resultado =
        armazenamentoFinalDiaAnterior +
        precipitacao +
        irrigacaoRealizada -
        etcDiaAtualCulturaCorrigida;
      return resultado;
    }
  }

  private calcularLaminaLiquida(laminaLiquidaSemCorrecao) {
    if (laminaLiquidaSemCorrecao < 0) {
      return 0;
    } else {
      return laminaLiquidaSemCorrecao;
    }
  }

  private decidirIrrigacao(
    armazenamentoFinalDiaAtual,
    armazenamentoInicialPrimeiroDia,
    fatorF,
  ) {
    if (
      armazenamentoFinalDiaAtual <
      armazenamentoInicialPrimeiroDia / (fatorF * 10)
    ) {
      return 'Irrigar';
    } else {
      return 'Não Irrigar';
    }
  }

  private calcularExcessoDeficit(
    armazenamentoFinalDiaAnterior,
    armazenamentoFinalDiaAtual,
    etcDiaAtualCultura,
    precipitacao,
    irrigacaoRealizada,
    armazenamentoInicialPrimeiroDia,
  ) {
    let resultado;
    if (
      armazenamentoFinalDiaAnterior -
        etcDiaAtualCultura +
        precipitacao +
        irrigacaoRealizada >
      armazenamentoInicialPrimeiroDia
    ) {
      resultado =
        armazenamentoFinalDiaAnterior -
        etcDiaAtualCultura +
        precipitacao +
        irrigacaoRealizada -
        armazenamentoInicialPrimeiroDia;
      return resultado;
    } else {
      if (armazenamentoFinalDiaAtual < 0) {
        resultado = armazenamentoFinalDiaAtual;
        return resultado;
      } else {
        resultado = 0;
        return resultado;
      }
    }
  }

  private formatarHora(tempoEmHoras) {
    const horas = Math.floor(tempoEmHoras);
    const minutos = Math.floor((tempoEmHoras - horas) * 60);
    const segundos = Math.floor(((tempoEmHoras - horas) * 60 - minutos) * 60);

    const horaFormatada = String(horas).padStart(2, '0');
    const minutosFormatados = String(minutos).padStart(2, '0');
    const segundosFormatados = String(segundos).padStart(2, '0');

    return `${horaFormatada}:${minutosFormatados}:${segundosFormatados}`;
  }
}
