import { api } from ".";
import type { LeadWrapper, Lead, Finance } from "../types/interface";
import type { ISODateString } from "../types/ISODateString";

export const fetchDataShippingByDate = async (
  startDate: ISODateString,
  endDate: ISODateString,
  completionStatus: string,
  paymentStatus: string
): Promise<LeadWrapper[]> => {
  const res = await api.get<LeadWrapper[]>("/allData/byDate", {
    params: { startDate, endDate, completionStatus, paymentStatus },
  });
  return res.data;
};

export const fetchOrdersByUser = async (userId: string): Promise<LeadWrapper[]> => {
  const { data } = await api.get(`/allData/byUser/${userId}`);

  return data
}

export const updateLeadData = async (
  id: string,
  data: { lead?: Lead; finance?: Finance }
): Promise<LeadWrapper> => {
  const res = await api.put<LeadWrapper>(`/allData/${id}`, data);
  return res.data;
};
