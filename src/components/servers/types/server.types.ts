
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
