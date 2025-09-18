import { useReducer } from 'react';
import GlobalContext from './GlobalContext';
import type { Action, DailyData } from '../types/interface';

type State = DailyData[]; // <--- ВОТ! Меняем State на массив DailyData

const initialState: State = [];

const reducer = (state: State, action: Action): State => {
// const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_DAY': {
      const exists = state.find(item => item.date === action.payload.date);
      if (exists) return state;
      return [
        ...state,
        {
          ...action.payload,
          meta: {
            date: action.payload.date,
            yandexSpend: 0,
            avitoSpend: 0,
            adSpend: 0,
            otherSpend: 0,
          },
          leads: [],
        }
      ];
    }

    case 'ADD_LEAD': {
      const { date, lead } = action.payload;
      const existingDay = state.find(d => d.date === date);

      if (existingDay) {
        return state.map(d =>
          d.date === date
            ? { ...d, leads: [...d.leads, lead] }
            : d
        );
      } else {
        return [
          ...state,
          {
            date,
            leads: [lead],
            meta: {
              date,
              yandexSpend: 0,
              avitoSpend: 0,
              adSpend: 0,
              otherSpend: 0,
            },
          }
        ];
      }
    }

    case 'ADD_EXPENSE': {
      return state.map(day => {
        if (day.date === action.payload.date) {
          return {
            ...day,
            meta: {
              ...day.meta,
              yandexSpend: Number(day.meta.yandexSpend) + Number(action.payload.meta.yandexSpend),
              avitoSpend: Number(day.meta.avitoSpend) + Number(action.payload.meta.avitoSpend),
              adSpend: Number(day.meta.adSpend) + Number(action.payload.meta.adSpend),
              otherSpend: Number(day.meta.otherSpend) + Number(action.payload.meta.otherSpend),
            }
          };
        }
        return day;
      });
    }


    default:
      return state;
  }
};




export const GlobalProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return(
    <GlobalContext.Provider value={{state, dispatch}}>
      {children}
    </GlobalContext.Provider>
  )
}
