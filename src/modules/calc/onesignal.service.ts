import axios from 'axios';
import * as moment from 'moment-timezone';

export class OneSignalService {
  async sendNotification() {
    const hora = moment.tz('America/Sao_Paulo').format('H:i');
    const content = { en: 'Verifique as condições do solo hoje!' };
    const headings = { en: 'Hora de dar uma olhada!' };

    const data = {
      app_id: '5cab4469-3f98-44b6-a361-d6b388719524',
      included_segments: ['Total Subscriptions'],
      contents: content,
      headings: headings,
      name: 'Verifique as condições do solo hoje!',
    };

    try {
      const response = await axios.post(
        'https://onesignal.com/api/v1/notifications',
        data,
        {
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization:
              'Basic MmVjNzAyNzEtNDFjYi00ZDM0LWJjZWMtYzQxNzEwNTJlNjE5',
          },
        },
      );

      console.log('JSON sent:');
      console.log(JSON.stringify(data));
      console.log('Response:');
      console.log(response.data);
    } catch (error) {
      console.error('Error:', error.response.data);
    }
  }
}
