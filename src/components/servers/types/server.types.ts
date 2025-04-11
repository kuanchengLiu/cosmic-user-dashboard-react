
export interface Server {
  id: number;
  name: string;
  ipAddress: string;
  status: "online" | "offline" | "maintenance";
  type: string;
  lastUpdated: string;
  buildPlan: string[];
  timeOffset: string;
  pmFullname: string;
  l2Fullname: string;
  site: string;
  location: string;
  environment: "beta" | "production";
  siteMaster?: string;
  isMaster?: boolean;
  siteDescription?: string;
}

export interface ServerApiPayload {
  documentType: string;
  actionType: string;
  properties: {
    Servername: string;
    BuildPlan: string[];
    Site: string;
    ServerType: string;
    SiteDescription: string;
    SiteMaster: string;
    IsMaster: string;
    IPAddress: string;
    TimeOffset: string;
    PMfullname: string;
    L2fullname: string;
    Location: string;
    Status: string;
    LastUpdateDt?: string;
  };
}

export interface ServerFormValues {
  name: string;
  ipAddress: string;
  buildPlan: string[] | string;
  timeOffset: string;
  pmFullname: string;
  l2Fullname: string;
  site: string;
  type: string;
  location: string;
  environment: "beta" | "production";
  siteMaster?: string;
  isMaster?: boolean;
  siteDescription?: string;
}

export interface UserApiPayload {
  documentType: string;
  actionType: string;
  properties: {
    Role: string;
    Fullname: string;
    Email: string;
    MGREmail: string;
    CreatedBy: string;
    CreatedDt: string;
  };
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  lastActive: string;
  mgrEmail: string;
  createdBy: string;
  createdDate: string;
  avatarUrl?: string;
}

export interface UserFormValues {
  name: string;
  email: string;
  role: string;
  mgrEmail: string;
  status?: "active" | "inactive";
}
