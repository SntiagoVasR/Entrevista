import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 50,        // Usuarios concurrentes
  duration: '1m', // Duración total de la prueba
};

export default function () {
  http.get('https://automationexercise.com/products');
  sleep(1); // Tiempo entre solicitudes por usuario
}