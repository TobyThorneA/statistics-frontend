// src/components/formLead/PhoneInput.tsx
import React from "react";
import { IMaskInput } from "react-imask";

interface PhoneInputProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Телефонное поле с фиксированным и всегда видимым префиксом +7
 * — нельзя стереть +7
 * — вводятся только цифры
 * — полностью совместимо с FormLead.tsx (без ошибок)
 */
const PhoneInput: React.FC<PhoneInputProps> = ({ name, value, onChange }) => {
  const handleAccept = (val: string) => {
    // создаём фейковый event, но с preventDefault — чтобы FormLead не падал
    const fakeEvent = {
      preventDefault: () => {}, // 👈 добавляем, чтобы не было ошибки
      target: { name, value: val },
    } as unknown as React.ChangeEvent<HTMLInputElement>;

    onChange(fakeEvent);
  };

  return (
    <IMaskInput
      mask="+{7} (000) 000-00-00"
      lazy={false}
      value={value || "+7 "}
      name={name}
      inputMode="numeric"
      className="border h-8 border-gray-400 p-2 w-full bg-inputColor"
      definitions={{
        0: /[0-9]/, // только цифры
      }}
      onAccept={handleAccept}
      overwrite
      onFocus={(e) => {
        const input = e.currentTarget;
        // ставим курсор сразу после "+7 ("
        setTimeout(() => {
          if ((input.selectionStart ?? 0) < 4) {
            input.setSelectionRange(4, 4);
          }
        }, 0);
      }}
      onKeyDown={(e) => {
        const cursor = e.currentTarget.selectionStart ?? 0;
        if (cursor <= 3 && (e.key === "Backspace" || e.key === "Delete")) {
          e.preventDefault();
        }
      }}
    />
  );
};

export default PhoneInput;
