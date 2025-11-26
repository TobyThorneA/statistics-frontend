// utils/normalizePhone.ts
import { parsePhoneNumberFromString } from "libphonenumber-js";

/**
 * Приводит введённый пользователем номер к виду +7XXXXXXXXXX.
 * Возвращает null, если номер невалидный.
 */
export const normalizePhone = (input: string): string | null => {
  // 1️⃣ Удаляем всё, кроме цифр
  const digits = input.replace(/\D/g, "");

  // 2️⃣ Убираем лишний префикс, если человек всё-таки набрал 8 или 7
  // Пример: 8(999)1234567 → 79991234567
  const normalized = digits.startsWith("8")
    ? "7" + digits.slice(1)
    : digits.startsWith("7")
    ? digits
    : "7" + digits; // если без 7 и 8, добавим сами

  // 3️⃣ Собираем обратно в строку с +
  // Теперь получится "+7XXXXXXXXXX"
  const phone = parsePhoneNumberFromString("+" + normalized, "RU");

  // 4️⃣ Проверяем корректность номера
  if (phone && phone.isValid()) {
    return phone.number; // ✅ Возвращаем +7XXXXXXXXXX
  }

  // 5️⃣ Если номер невалиден — null
  return null;
};
