import axios from "axios";

// создаём общий экземпляр axios
export const api = axios.create({
  baseURL: "https://statistics-api.myata-flowers.ru/api",
  timeout: 10000,
  headers: { "Content-Type" : "application/json" }
})

// логирование запросов (опционально, удобно при отладке)
api.interceptors.request.use((config) => {
  console.log(`[API REQUEST] ${config.method?.toUpperCase()} → ${config.url}`, config.data ?? "");
  return config;
})

// глобальная обработка ошибок
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      console.error(`[API ERROR ${status}]`, data?.message ?? data);
    } else if (error.request) {
      console.error("[API ERROR] Сервер не ответил:", error.request);
    } else {
      console.error("[API ERROR] Ошибка в настройке запроса:", error.message);
    }
    return Promise.reject(error); // пробрасываем дальше
  }
)
