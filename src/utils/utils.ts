// utils
import type { AllNumberKeys, NumberKeys } from "../types/interface";

export const numberKeys: AllNumberKeys[] = ["bouquetCost", "salePrice", "deliveryCost"];

export  const parseValue = <T,>(key:keyof T, value: string, numberKeys: NumberKeys<T>[]): T[keyof T]  => {
    if(numberKeys.includes(key as NumberKeys<T>)){
      const num = Number(value);
      if(isNaN(num))throw new Error(`Invalid value for ${String(key)}: ${value}`);
      return num as T[keyof T];
    }
    return value as T[keyof T];
  }