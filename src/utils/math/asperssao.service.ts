import { Injectable } from '@nestjs/common';
import { CreateCalcDto } from '@/modules/calc/dto/create-calc.dto';
import { CalcService } from '@/modules/calc/calc.service';

@Injectable()
export class AsperssaoService {
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
    vazaoAsperssor,
    espacamentoEntreLinhas,
    espacamentoEntreAsperssores,
    kcEstagio1,
    kcEstagio2,
    kcEstagio3,
    kcEstagio4,
    duracaoEstagio2,
    duracaoEstagio4,
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
      vazaoAsperssor,
      espacamentoEntreLinhas,
      espacamentoEntreAsperssores,
      kcEstagio1,
      kcEstagio2,
      kcEstagio3,
      kcEstagio4,
      duracaoEstagio2,
      duracaoEstagio4,
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
        vazaoAsperssor,
        espacamentoEntreLinhas,
        espacamentoEntreAsperssores,
        kcEstagio1,
        kcEstagio2,
        kcEstagio3,
        kcEstagio4,
        duracaoEstagio2,
        duracaoEstagio4,
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
    vazaoAsperssor,
    espacamentoEntreLinhas,
    espacamentoEntreAsperssores,
    kcEstagio1,
    kcEstagio2,
    kcEstagio3,
    kcEstagio4,
    duracaoEstagio2,
    duracaoEstagio4,
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
    const pontoMurchaCalculado = pontoMurcha / 100;
    const capacidadeCampoCalculado = capacidadeCampo / 100;
    const umidadeCriticaPercentual =
      (capacidadeCampoCalculado -
        fatorF * (capacidadeCampoCalculado - pontoMurchaCalculado)) *
      100;
    const umidadeCritica = umidadeCriticaPercentual / 100;
    const disponibilidadeTotalAgua =
      ((capacidadeCampoCalculado * 100 - pontoMurchaCalculado * 100) / 10) *
      densidadeSolo;
    const laminaArmazenamento =
      disponibilidadeTotalAgua * profundidadeSistemaRadicular;
    const laminaLiquidaPreviaDiaAnterior = dadoLaminaLiquidaPreviaDiaAnterior;
    const armazenamentoFinalDiaAnterior = dadoArmazenamentoFinalDiaAnterior;
    const laminaArmazenada =
      laminaArmazenamento - laminaLiquidaPreviaDiaAnterior;
    const ks =
      Math.log(laminaArmazenada + 1) / Math.log(laminaArmazenamento + 1) || 1;
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
    const etcDiaAtualCultura = kcAjustado * ETO * ks;
    const laminaLiquidaPrevia =
      laminaLiquidaPreviaDiaAnterior + etcDiaAtualCultura;
    const intensidadeAplicacao =
      vazaoAsperssor / (espacamentoEntreLinhas * espacamentoEntreAsperssores);
    const laminaTotal =
      capacidadeCampoCalculado * (profundidadeSistemaRadicular * 10) -
      pontoMurchaCalculado * (profundidadeSistemaRadicular * 10);
    const aguaFacilmenteDisponivel = laminaTotal * fatorF;
    const armazenamentoInicialDiaAtual = armazenamentoFinalDiaAnterior;
    const quantidadeTotalAgua = tempoIrrigacaoEfetuado * intensidadeAplicacao;
    const irrigacaoRealizada =
      (quantidadeTotalAgua * coeficienteUniformidade) / 100;
    const armazenamentoFinalDiaAtual = this.calcularArmazenamentoFinalDiaAtual(
      armazenamentoFinalDiaAnterior,
      precipitacao,
      irrigacaoRealizada,
      etcDiaAtualCultura,
      armazenamentoInicialPrimeiroDia,
    );
    const excessoDeficit = this.calcularExcessoDeficit(
      armazenamentoFinalDiaAnterior,
      armazenamentoFinalDiaAtual,
      etcDiaAtualCultura,
      precipitacao,
      irrigacaoRealizada,
      armazenamentoInicialPrimeiroDia,
    );
    const laminaLiquidaSemCorrecao =
      laminaLiquidaPrevia - precipitacao - irrigacaoRealizada;
    const laminaLiquida = this.calcularLaminaLiquida(laminaLiquidaSemCorrecao);
    const laminaBruta = laminaLiquida / (coeficienteUniformidade / 100);
    const tempoIrrigacaoSugerido = laminaBruta / intensidadeAplicacao;
    const areaPlantioMetrosQuadrados = areaPlantio * 10000;
    const volumeAplicadoAreaTotal =
      quantidadeTotalAgua * areaPlantioMetrosQuadrados;
    const volumeAplicadoSetor = volumeAplicadoAreaTotal / quantidadeSetores;
    const tempoIrrigacaoSugeridoAreaTotal = this.formatarHora(
      tempoIrrigacaoSugerido,
    );
    const tempoIrrigacaoSugeridoAreaSetor = this.formatarHora(
      tempoIrrigacaoSugerido / quantidadeSetores,
    );
    const irrigacao = this.decidirIrrigacao(
      armazenamentoFinalDiaAtual,
      armazenamentoInicialPrimeiroDia,
      fatorF,
    );

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
      percentual_area_sombreada_previa: 0,
      percentual_area_sombreada_corrigida: 0,
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
      kc_limite: 0,
      etc_dia_atual_cultura: parseFloat(etcDiaAtualCultura.toFixed(2)),
      etc_dia_atual_cultura_corrigida: 0,
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
      id_cultura: idCultura,
      calc_id: idCalc,
    };

    await this.calcService.create(dados);

    return dados;
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
    etcDiaAtualCultura,
    armazenamentoInicialPrimeiroDia,
  ) {
    let resultado;

    if (
      armazenamentoFinalDiaAnterior +
        precipitacao +
        irrigacaoRealizada -
        etcDiaAtualCultura >=
      armazenamentoInicialPrimeiroDia
    ) {
      resultado = armazenamentoInicialPrimeiroDia;
      return resultado;
    } else {
      resultado =
        armazenamentoFinalDiaAnterior +
        precipitacao +
        irrigacaoRealizada -
        etcDiaAtualCultura;
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
    const segundos = Math.floor((tempoEmHoras - horas) * 3600 - minutos * 60);

    const horaFormatada = String(horas).padStart(2, '0');
    const minutosFormatados = String(minutos).padStart(2, '0');
    const segundosFormatados = String(segundos).padStart(2, '0');

    return `${horaFormatada}:${minutosFormatados}:${segundosFormatados}`;
  }
}
