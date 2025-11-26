import { api } from ".";
import type { User } from "../types/user";

export const getUsersByPhone = async (phone: string) : Promise<User[]> => {
  const res = await api.get(`/users/search?phone=${phone}`)
  return res.data
} 

export const getUsersNoNumber = async () => {
  const res = await api.get('/users/search?includeTech=true');
  return res.data
}
