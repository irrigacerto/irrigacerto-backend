import { Injectable } from '@nestjs/common';
import { CalcService } from '@/modules/calc/calc.service';
import { UpdateCalcDto } from '@/modules/calc/dto/update-calc.dto';

@Injectable()
export class AsperssaoPrimeiroDiaService {
  constructor(private readonly calcService: CalcService) {}

  async calcularDecisaoIrrigacao(
    totalDiasEstagio,
    profundidadeSistemaRadicular,
    capacidadeCampo,
    fatorF,
    densidadeSolo,
    pontoMurcha,
    precipitacao,
    estagio,
    coeficienteUniformidade,
    vazaoAsperssor,
    espacamentoEntreAsperssores,
    espacamentoEntreLinhas,
    kcEstagio1,
    kcEstagio2,
    kcEstagio3,
    kcEstagio4,
    duracaoEstagio2,
    duracaoEstagio4,
    quantidadeSetores,
    areaPlantio,
    dadoETO,
    idCultura,
    idCalc,
  ) {
    const tempoIrrigacaoEfetuado = 0;

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

    const kcAjustado = this.calcularKcAjustado(
      estagio,
      kcEstagio1,
      kcEstagio2,
      kcEstagio3,
      kcEstagio4,
      duracaoEstagio2,
      duracaoEstagio4,
    );
    // console.log('kcAjustado:', kcAjustado);

    const etcDiaAtualCultura = kcAjustado * ETO;
    // console.log('etcDiaAtualCultura:', etcDiaAtualCultura);

    const laminaLiquidaPrevia = etcDiaAtualCultura;
    // console.log('laminaLiquidaPrevia:', laminaLiquidaPrevia);

    const laminaArmazenada = laminaArmazenamento - laminaLiquidaPrevia;
    // console.log('laminaArmazenada:', laminaArmazenada);

    const ks =
      Math.log(laminaArmazenada + 1) / Math.log(laminaArmazenamento + 1);
    // console.log('ks:', ks);

    const intensidadeAplicacao =
      vazaoAsperssor / (espacamentoEntreLinhas * espacamentoEntreAsperssores);
    // console.log('intensidadeAplicacao:', intensidadeAplicacao);

    const laminaTotal =
      capacidadeCampoCalculado * (profundidadeSistemaRadicular * 10) -
      pontoMurchaCalculado * (profundidadeSistemaRadicular * 10);
    // console.log('laminaTotal:', laminaTotal);

    const aguaFacilmenteDisponivel = laminaTotal * fatorF;
    // console.log('aguaFacilmenteDisponivel:', aguaFacilmenteDisponivel);

    const armazenamentoInicialDiaAtual = aguaFacilmenteDisponivel;
    // console.log('armazenamentoInicialDiaAtual:', armazenamentoInicialDiaAtual);

    const quantidadeTotalAgua = tempoIrrigacaoEfetuado * intensidadeAplicacao;
    // console.log('quantidadeTotalAgua:', quantidadeTotalAgua);

    const irrigacaoRealizada =
      (quantidadeTotalAgua * coeficienteUniformidade) / 100;
    // console.log('irrigacaoRealizada:', irrigacaoRealizada);

    const armazenamentoFinalDiaAtual =
      armazenamentoInicialDiaAtual -
      etcDiaAtualCultura +
      precipitacao +
      irrigacaoRealizada;
    // console.log('armazenamentoFinalDiaAtual:', armazenamentoFinalDiaAtual);

    const laminaLiquidaSemCorrecao =
      laminaLiquidaPrevia - precipitacao - irrigacaoRealizada;
    // console.log('laminaLiquidaSemCorrecao:', laminaLiquidaSemCorrecao);

    const laminaLiquida = this.calcularLaminaLiquida(laminaLiquidaSemCorrecao);
    // console.log('laminaLiquida:', laminaLiquida);

    const laminaBruta = laminaLiquida / (coeficienteUniformidade / 100);
    // console.log('laminaBruta:', laminaBruta);

    const tempoIrrigacaoSugerido = laminaBruta / intensidadeAplicacao;
    // console.log('tempoIrrigacaoSugerido', tempoIrrigacaoSugerido);

    const excessoDeficit = this.calcularExcessoDeficit(
      armazenamentoFinalDiaAtual,
      etcDiaAtualCultura,
      precipitacao,
      irrigacaoRealizada,
      armazenamentoInicialDiaAtual,
    );
    // console.log('excessoDeficit:', excessoDeficit);

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

    const currentDate = new Date();
    // console.log('currentDate:', currentDate);

    const dados: UpdateCalcDto = {
      armazenamento_inicial_primeiro_dia: parseFloat(
        armazenamentoInicialDiaAtual.toFixed(2),
      ),
      total_dias_estagio: totalDiasEstagio + 1,
      armazenamento_final_dia_anterior: 0,
      lamina_liquida_previa_dia_anterior: parseFloat(
        laminaLiquidaPrevia.toFixed(2),
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
        aguaFacilmenteDisponivel.toFixed(2),
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
      tempo_irrigacao_sugerido_area_total:
        tempoIrrigacaoSugeridoAreaTotal.toString(),
      tempo_irrigacao_sugerido_area_setor:
        tempoIrrigacaoSugeridoAreaSetor.toString(),
      created_at: currentDate,
      primeiro_calculo: 0,
      decisao: 'Não Irrigar',
      tipo_calculo: 'visualization',
      id_cultura: idCultura,
    };

    // console.log(dados);

    await this.calcService.update(idCalc, dados);

    return dados;
  }

  private calcularKcAjustado(
    estagio,
    kcEstagio1,
    kcEstagio2,
    kcEstagio3,
    kcEstagio4,
    duracaoEstagio2,
    duracaoEstagio4,
  ) {
    let kcAjustado = 0;

    if (estagio == 1) {
      kcAjustado = kcEstagio1;
    }
    if (estagio == 2) {
      kcAjustado = 0 + (kcEstagio3 - kcEstagio2) / duracaoEstagio2;
    }
    if (estagio == 3) {
      kcAjustado = kcEstagio3;
    }
    if (estagio == 4) {
      kcAjustado = 0 - (kcEstagio3 - kcEstagio4) / duracaoEstagio4;
    }
    return parseFloat(kcAjustado.toFixed(2));
  }

  private calcularLaminaLiquida(laminaLiquidaSemCorrecao) {
    if (laminaLiquidaSemCorrecao < 0) {
      return 0;
    } else {
      return laminaLiquidaSemCorrecao;
    }
  }

  private calcularExcessoDeficit(
    armazenamentoFinalDiaAtual,
    etcDiaAtualCultura,
    precipitacao,
    irrigacaoRealizada,
    armazenamentoInicialDiaAtual,
  ) {
    let resultado;
    if (
      armazenamentoFinalDiaAtual -
        etcDiaAtualCultura +
        precipitacao +
        irrigacaoRealizada >
      armazenamentoInicialDiaAtual
    ) {
      resultado =
        armazenamentoFinalDiaAtual -
        etcDiaAtualCultura +
        precipitacao +
        irrigacaoRealizada -
        armazenamentoInicialDiaAtual;
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
