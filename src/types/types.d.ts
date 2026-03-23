// ## type definitions for User Management
declare type Feature = {
  feature_id: string;
  feature_name: string;
  access: number;
  group_id: string;
};

// ## type definitions for Inventory table and cards
 declare type Inventory = {
  vehicleName: string;
  vin: string;
  purchasePrice: number;
  currentPrice: number;
  daysUnsold: number;
  avgLeadsPerDay: number;
  totalLeads: number;
  trend: string;
  demand: string;
  aiSuggestion: string;
};

