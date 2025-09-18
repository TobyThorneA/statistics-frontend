interface validateInputDateProps {
  name: string,
  value: string,
}

export const validateInputDate = ({name, value}: validateInputDateProps) => {
  let input = value
  if(name === 'orderDate' || name === "shippingDate" ) {

    // Удаляем всё, кроме цифр
    console.log('input',Number(input))
    // typeof input === type number?  '' : ''
    input = input.replace(/\D/g, "");

    // Ограничиваем длину
    if (input.length > 8) input = input.slice(0, 8);

    // Подставляем точки
    if (input.length > 4) {
      input = input.replace(/^(\d{2})(\d{2})(\d{0,4})/, "$1.$2.$3");
    } else if (input.length > 2) {
      input = input.replace(/^(\d{2})(\d{0,2})/, "$1.$2");
    }
  }
  // return 'input'
  return input
}