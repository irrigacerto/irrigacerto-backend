import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { LocalizadaService } from '@/utils/math/localizada.service';
import { LocalizadaPrimeiroDiaService } from '@/utils/math/localizadaPrimeiroDia.service';
import { PropriedadeService } from '../propriedade/propriedade.service';
import { AsperssaoService } from '@/utils/math/asperssao.service';
import { AsperssaoPrimeiroDiaService } from '@/utils/math/asperssaoPrimeiroDia.service';
import { CulturaService } from '../cultura/cultura.service';
import { OneSignalService } from './onesignal.service';
import { CalcService } from './calc.service';

@Injectable()
export class CalcCron {
  constructor(
    private readonly propriedadeService: PropriedadeService,
    private readonly localizadaService: LocalizadaService,
    private readonly localizadaPrimeiroDiaService: LocalizadaPrimeiroDiaService,
    private readonly asperssaoService: AsperssaoService,
    private readonly asperssaoPrimeiroDiaService: AsperssaoPrimeiroDiaService,
    private readonly culturaService: CulturaService,
    private readonly oneSignalService: OneSignalService,
    private readonly calcService: CalcService,
  ) {}

  @Cron('0 1 * * *')
  async handleCron() {
    const resultado = await this.propriedadeService.findAllDataCalc();

    resultado.map((r) => {
      if (r.tipo_irrigacao == 1) {
        if (r.primeiro_calculo === 0) {
          let estagioCultura = 0;
          const quantidadeDiasEstagio1 = r.duracao_estagio1;
          const quantidadeDiasEstagio2 =
            r.duracao_estagio1 + r.duracao_estagio2;
          const quantidadeDiasEstagio3 =
            r.duracao_estagio1 + r.duracao_estagio2 + r.duracao_estagio3;
          const quantidadeDiasEstagio4 =
            r.duracao_estagio1 +
            r.duracao_estagio2 +
            r.duracao_estagio3 +
            r.duracao_estagio4;
          const totalDiasCultura = quantidadeDiasEstagio4;

          if (r.total_dias_estagio >= totalDiasCultura) {
            this.culturaService.updateStatusCultura(r.id_cultura);
          } else {
            if (r.total_dias_estagio <= quantidadeDiasEstagio1) {
              estagioCultura = 1;
              this.culturaService.updateEstagioCultura(
                r.id_cultura,
                estagioCultura,
              );
            }
            if (
              r.total_dias_estagio > quantidadeDiasEstagio1 &&
              r.total_dias_estagio <= quantidadeDiasEstagio2
            ) {
              estagioCultura = 2;
              this.culturaService.updateEstagioCultura(
                r.id_cultura,
                estagioCultura,
              );
            }
            if (
              r.total_dias_estagio > quantidadeDiasEstagio2 &&
              r.total_dias_estagio <= quantidadeDiasEstagio3
            ) {
              estagioCultura = 3;
              this.culturaService.updateEstagioCultura(
                r.id_cultura,
                estagioCultura,
              );
            }
            if (
              r.total_dias_estagio > quantidadeDiasEstagio2 &&
              r.total_dias_estagio <= quantidadeDiasEstagio4
            ) {
              estagioCultura = 4;
              this.culturaService.updateEstagioCultura(
                r.id_cultura,
                estagioCultura,
              );
            }

            this.localizadaService.calcularDecisaoIrrigacao(
              r.profundidade_sistema_radicular,
              r.capacidade_campo,
              r.fator,
              r.densidade,
              r.ponto_murcha,
              r.precipitacao,
              estagioCultura,
              r.coeficiente_uniformidade,
              r.vazao_emissor,
              r.espacamento_linha,
              r.espacamento_emissor,
              r.estagio1,
              r.estagio2,
              r.estagio3,
              r.estagio4,
              r.duracao_estagio1,
              r.duracao_estagio2,
              r.duracao_estagio3,
              r.duracao_estagio4,
              r.percentual_area_sombreada,
              r.percentual_area_sombreada,
              r.percentual_area_sombreada,
              r.percentual_area_sombreada,
              r.percentual_area_molhada,
              r.quantidade_setores,
              r.area_plantio,
              r.eto_dia_anterior,
              r.kc_ajustado,
              r.armazenamento_final_dia_atual,
              r.lamina_liquida,
              r.armazenamento_inicial_primeiro_dia,
              r.total_dias_estagio,
              r.id_cultura,
              r.tempo_irrigacao,
              r.id_calc,
            );
          }
        }
        if (r.primeiro_calculo === 1) {
          let estagioCultura = 0;
          const quantidadeDiasEstagio1 = r.duracao_estagio1;
          const quantidadeDiasEstagio2 =
            r.duracao_estagio1 + r.duracao_estagio2;
          const quantidadeDiasEstagio3 =
            r.duracao_estagio1 + r.duracao_estagio2 + r.duracao_estagio3;
          const quantidadeDiasEstagio4 =
            r.duracao_estagio1 +
            r.duracao_estagio2 +
            r.duracao_estagio3 +
            r.duracao_estagio4;

          if (r.total_dias_estagio <= quantidadeDiasEstagio1) {
            estagioCultura = 1;
            this.culturaService.updateEstagioCultura(
              r.id_cultura,
              estagioCultura,
            );
          }
          if (
            r.total_dias_estagio > quantidadeDiasEstagio1 &&
            r.total_dias_estagio <= quantidadeDiasEstagio2
          ) {
            estagioCultura = 2;
            this.culturaService.updateEstagioCultura(
              r.id_cultura,
              estagioCultura,
            );
          }
          if (
            r.total_dias_estagio > quantidadeDiasEstagio2 &&
            r.total_dias_estagio <= quantidadeDiasEstagio3
          ) {
            estagioCultura = 3;
            this.culturaService.updateEstagioCultura(
              r.id_cultura,
              estagioCultura,
            );
          }
          if (
            r.total_dias_estagio > quantidadeDiasEstagio2 &&
            r.total_dias_estagio <= quantidadeDiasEstagio4
          ) {
            estagioCultura = 4;
            this.culturaService.updateEstagioCultura(
              r.id_cultura,
              estagioCultura,
            );
          }

          this.localizadaPrimeiroDiaService.calcularDecisaoIrrigacao(
            r.total_dias_estagio,
            r.profundidade_sistema_radicular,
            r.capacidade_campo,
            r.fator,
            r.densidade,
            r.ponto_murcha,
            r.precipitacao,
            estagioCultura,
            r.coeficiente_uniformidade,
            r.vazao_emissor,
            r.espacamento_linha,
            r.espacamento_emissor,
            r.estagio1,
            r.estagio2,
            r.estagio3,
            r.estagio4,
            r.duracao_estagio2,
            r.duracao_estagio4,
            r.percentual_area_sombreada,
            r.percentual_area_sombreada,
            r.percentual_area_sombreada,
            r.percentual_area_sombreada,
            r.percentual_area_molhada,
            r.quantidade_setores,
            r.area_plantio,
            r.eto_dia_anterior,
            r.id_cultura,
            r.id_calc,
          );
        }
      }
      if (r.tipo_irrigacao == 2) {
        if (r.primeiro_calculo === 0) {
          let estagioCultura = 0;
          const quantidadeDiasEstagio1 = r.duracao_estagio1;
          const quantidadeDiasEstagio2 =
            r.duracao_estagio1 + r.duracao_estagio2;
          const quantidadeDiasEstagio3 =
            r.duracao_estagio1 + r.duracao_estagio2 + r.duracao_estagio3;
          const quantidadeDiasEstagio4 =
            r.duracao_estagio1 +
            r.duracao_estagio2 +
            r.duracao_estagio3 +
            r.duracao_estagio4;
          const totalDiasCultura = quantidadeDiasEstagio4;

          if (r.total_dias_estagio >= totalDiasCultura) {
            this.culturaService.updateStatusCultura(r.id_cultura);
          } else {
            if (r.total_dias_estagio <= quantidadeDiasEstagio1) {
              estagioCultura = 1;
              this.culturaService.updateEstagioCultura(
                r.id_cultura,
                estagioCultura,
              );
            }
            if (
              r.total_dias_estagio > quantidadeDiasEstagio1 &&
              r.total_dias_estagio <= quantidadeDiasEstagio2
            ) {
              estagioCultura = 2;
              this.culturaService.updateEstagioCultura(
                r.id_cultura,
                estagioCultura,
              );
            }
            if (
              r.total_dias_estagio > quantidadeDiasEstagio2 &&
              r.total_dias_estagio <= quantidadeDiasEstagio3
            ) {
              estagioCultura = 3;
              this.culturaService.updateEstagioCultura(
                r.id_cultura,
                estagioCultura,
              );
            }
            if (
              r.total_dias_estagio > quantidadeDiasEstagio2 &&
              r.total_dias_estagio <= quantidadeDiasEstagio4
            ) {
              estagioCultura = 4;
              this.culturaService.updateEstagioCultura(
                r.id_cultura,
                estagioCultura,
              );
            }

            this.asperssaoService.calcularDecisaoIrrigacao(
              r.profundidade_sistema_radicular,
              r.capacidade_campo,
              r.fator,
              r.densidade,
              r.ponto_murcha,
              r.precipitacao,
              estagioCultura,
              r.coeficiente_uniformidade,
              r.vazao_asperssor,
              r.espacamento_linha,
              r.espacamento_asperssor,
              r.estagio1,
              r.estagio2,
              r.estagio3,
              r.estagio4,
              r.duracao_estagio2,
              r.duracao_estagio4,
              r.quantidade_setores,
              r.area_plantio,
              r.eto_dia_anterior,
              r.kc_ajustado,
              r.armazenamento_final_dia_atual,
              r.lamina_liquida,
              r.armazenamento_inicial_primeiro_dia,
              r.total_dias_estagio,
              r.id_cultura,
              r.tempo_irrigacao,
              r.id_calc,
            );
          }
        }
        if (r.primeiro_calculo === 1) {
          let estagioCultura = 0;
          const quantidadeDiasEstagio1 = r.duracao_estagio1;
          const quantidadeDiasEstagio2 =
            r.duracao_estagio1 + r.duracao_estagio2;
          const quantidadeDiasEstagio3 =
            r.duracao_estagio1 + r.duracao_estagio2 + r.duracao_estagio3;
          const quantidadeDiasEstagio4 =
            r.duracao_estagio1 +
            r.duracao_estagio2 +
            r.duracao_estagio3 +
            r.duracao_estagio4;

          if (r.total_dias_estagio <= quantidadeDiasEstagio1) {
            estagioCultura = 1;
            this.culturaService.updateEstagioCultura(
              r.id_cultura,
              estagioCultura,
            );
          }
          if (
            r.total_dias_estagio > quantidadeDiasEstagio1 &&
            r.total_dias_estagio <= quantidadeDiasEstagio2
          ) {
            estagioCultura = 2;
            this.culturaService.updateEstagioCultura(
              r.id_cultura,
              estagioCultura,
            );
          }
          if (
            r.total_dias_estagio > quantidadeDiasEstagio2 &&
            r.total_dias_estagio <= quantidadeDiasEstagio3
          ) {
            estagioCultura = 3;
            this.culturaService.updateEstagioCultura(
              r.id_cultura,
              estagioCultura,
            );
          }
          if (
            r.total_dias_estagio > quantidadeDiasEstagio2 &&
            r.total_dias_estagio <= quantidadeDiasEstagio4
          ) {
            estagioCultura = 4;
            this.culturaService.updateEstagioCultura(
              r.id_cultura,
              estagioCultura,
            );
          }

          this.asperssaoPrimeiroDiaService.calcularDecisaoIrrigacao(
            r.total_dias_estagio,
            r.profundidade_sistema_radicular,
            r.capacidade_campo,
            r.fator,
            r.densidade,
            r.ponto_murcha,
            r.precipitacao,
            estagioCultura,
            r.coeficiente_uniformidade,
            r.vazao_asperssor,
            r.espacamento_asperssor,
            r.espacamento_linha,
            r.estagio1,
            r.estagio2,
            r.estagio3,
            r.estagio4,
            r.duracao_estagio2,
            r.duracao_estagio4,
            r.quantidade_setores,
            r.area_plantio,
            r.eto_dia_anterior,
            r.id_cultura,
            r.id_calc,
          );
        }
      }
    });
  }

  @Cron('30 1 * * *')
  async handleVolume() {
    await this.calcService.updateVolume();
  }

  @Cron('0 5 * * *')
  async handleCronProperty() {
    const resultado = await this.propriedadeService.updatePrecipitacao();
  }

  @Cron('0 6 * * *')
  async handleCronOneSignal() {
    await this.oneSignalService.sendNotification();
  }
}
