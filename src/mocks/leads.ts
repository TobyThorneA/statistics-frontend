import type { FullAnalyticsData } from "../types/interface";

export const mockAnalytics: FullAnalyticsData = [
  {
    date: "00.00.0000",
    leads: [
      {
        orderDate: "2025-08-03",
        shippingDate: "2025-08-04",
        source: "Авито",
        customerName: "Иван",
        customerPhone: "+79998887766",
        salePrice: 3500,
        deliveryCost: 300,
        bouquetCost: 1200,
        paymentStatus: "оплачен"
      },
      {
        orderDate: "2025-08-03",
        shippingDate: null,
        source: "Instagram",
        customerName: "Ольга",
        customerPhone: "+79995554433",
        salePrice: 2800,
        deliveryCost: 200,
        bouquetCost: 900,
        paymentStatus: "не оплачен"
      },
      {
        orderDate: "2025-08-03",
        shippingDate: null,
        source: "Авито",
        customerName: "Павел",
        customerPhone: "+79991112233",
        salePrice: 3000,
        deliveryCost: 250,
        bouquetCost: 1100,
        paymentStatus: "предоплата"
      },
      {
        orderDate: "2025-08-03",
        shippingDate: null,
        source: "VK",
        customerName: "Анна",
        customerPhone: "+79990001122",
        salePrice: 0,
        deliveryCost: 0,
        bouquetCost: 0,
        paymentStatus: "отказ"
      }
    ],
    meta: {
      date: "03.08.2025",
      adSpend: 2300,
      // totalSales: 4,
      otherSpend:575,
    }
  }
];
