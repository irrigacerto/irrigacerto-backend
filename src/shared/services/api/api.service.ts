import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { EtoService } from '@/modules/eto/eto.service';
import { CreateEtoDto } from '@/modules/eto/dto/create-eto.dto';

@Injectable()
export class ApiService {
  constructor(private readonly etoService: EtoService) {}

  async setETO(result: any[]): Promise<any[]> {
    const requests = result.map(async (r) => {
      const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${r.latitude},${r.longitude}?unitGroup=metric&key=XZBG6BYF4SHZMVK37MZM9QDV8&contentType=json&include=days&elements=datetime,et0`;
      try {
        const response = await axios.get(url);

        const diaAtual = response.data.days[0].et0;
        const diaAnterior = response.data.days[1].et0;
        const dataApi = response.data.days[0].datetime;
        const idPropriedade = r.id;

        const dados: CreateEtoDto = {
          eto_dia_atual: diaAtual,
          eto_dia_anterior: diaAnterior,
          id_propriedade: idPropriedade,
          created_at: dataApi,
        };

        await this.etoService.create(dados);
      } catch (error) {
        throw new Error(`Erro ao buscar dados da API: ${error.message}`);
      }
    });

    return Promise.all(requests);
  }
}
