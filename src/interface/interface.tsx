export interface FilterPayload {
  token: string;
  body_type: string;
  demand_level: string;
  vin: string;
  store: string;
  leads_per_day: string;
}

export type IconKey = "Building2" | "Shield" | "Users";

export interface TabItem {
  tab_name: string;
  access: number;
  add_button: string;
  icon: IconKey;
}

export type Feature = {
  feature_id: string;
  feature_name: string;
  access: number;
  group_id: string;
};

export interface CreateOrgPayload {
  org_name: string;
}

export interface EditOrgPayload {
  org_id: string;
  org_name: string;
}

export interface DeleteOrgPayload {
  org_id: string;
}