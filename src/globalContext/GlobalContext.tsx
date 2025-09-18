import { createContext } from 'react';
import type { Action, DailyData } from '../types/interface';

interface GlobalContextType {
  state: DailyData[];
  dispatch: React.Dispatch<Action>;
}

const GlobalContext = createContext<GlobalContextType | null>(null);



export default GlobalContext;

