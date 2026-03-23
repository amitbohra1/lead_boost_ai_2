//## Common payload for leadperformance and inventory overview filters
export interface FilterPayload {
  token: string;
  body_type: string;
  demand_level: string;
  vin: string;
  store: string;
  leads_per_day: string;
  acquisition_type?: string;
}

// ## for user management
export type IconKey = "Building2" | "Shield" | "Users";

export interface TabItem {
  tab_name: string;
  access: number;
  add_button: string;
  icon: IconKey;
}

// export interface UserApiResponse {
//   id: number;
//   first_name: string;
//   last_name: string;
//   email: string;
//   user_id: string;
//   role: string;
//   roleId: string;
//   organizationId: string;
//   org: string;
// }

// export interface RoleApiResponse {
//   role_id: string;
//   role_name: string;
//   user_count: number;
//   user_names: string[];
// }

// ## For feature management
// export interface AssignFeaturePayload {
//   features: {
//     role_id: string;
//     feature_id: string;
//     permission_level: number;
//   }[];
// }

export interface ApiFeature {
  feature_id: string;
  feature_name: string;
  permission_level: number;
}

export interface ApiFeatureGroup {
  feature_grp_id: string;
  feature_grp_name: string;
  feature_list: ApiFeature[];
}

// ## for organization 
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

// ## for role

// export interface CreateRolePayload {
//   role_name: string;
// }

// export interface DeleteRolePayload {
//   role_id: string;
// }

// export interface EditRolePayload {
//   role_id: string;
//   role_name: string;
// }

// ## For Users
// export interface CreateUserPayload {
//   first_name: string;
//   last_name: string;
//   org_id: string;
//   role_id: string;
//   email_address: string;
//   password: string;
// }

// export interface DeleteUserPayload {
//   user_id: string;
// }

// export interface EditUserPayload {
//   user_id: string;
//   first_name: string;
//   last_name: string;
//   org_id: string;
//   role_id: string;
// }

// ## For Inventory Table and Cards View
export interface ApiInventoryItem {
  stock: string;
  vehicle: string;
  age: number;
  total_leads: number;
  avg_leads_per_day: number;
  VIN: string;
  current_price: string;
  purchase_price: string;
  trend: string;
  demand: string;
  ai_suggestion: string;
  final_demand_prediction: string;
}
