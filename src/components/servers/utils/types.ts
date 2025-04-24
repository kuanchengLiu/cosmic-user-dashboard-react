export interface ServerFormProps {
  onClose: () => void;
  onSubmit: (data: ServerFormValues) => void;
  initialData?: ServerFormValues;
  mode?: "create" | "update";
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
  status: ServerStatus;
}

export const userLevels = [
  "Admin",
  "Project Manager",
  "L2 Support",
  "DevOps",
  "Developer"
];

export const serverTypes = [
  "Web Server",
  "Database Server",
  "File Server",
  "Backup Server",
  "Application Server"
];

export const serverLocations = [
  { value: "AUSTRALIA", label: "Australia" },
  { value: "ALL", label: "All" },
  { value: "BRAZIL", label: "Brazil" },
  { value: "CANADA", label: "Canada" },
  { value: "CHINA", label: "China" },
  { value: "COSTA RICA", label: "Costa Rica" },
  { value: "CZECH REPUBLIC", label: "Czech Republic" },
  { value: "FRANCE", label: "France" },
  { value: "GERMANY", label: "Germany" },
  { value: "HOLLAND", label: "Holland" },
  { value: "HUNGARY", label: "Hungary" },
  { value: "INDIA", label: "India" },
  { value: "INDONESIA", label: "Indonesia" },
  { value: "JAPAN", label: "Japan" },
  { value: "KOREA", label: "Korea" },
  { value: "MEXICO", label: "Mexico" },
  { value: "NEWZEALAND", label: "New Zealand" },
  { value: "POLAND", label: "Poland" },
  { value: "PUERTO RICO", label: "Puerto Rico" },
  { value: "RUSSIA", label: "Russia" },
  { value: "SCOTLAND", label: "Scotland" },
  { value: "SINGAPORE", label: "Singapore" },
  { value: "TAIPEI", label: "Taipei" },
  { value: "TAIWAN", label: "Taiwan" },
  { value: "THAILAND", label: "Thailand" },
  { value: "TURKEY", label: "Turkey" },
  { value: "UNITEDSTATES", label: "United States" },
  { value: "AMERICAS", label: "Americas" },
  { value: "CHINA CHONGQING", label: "China Chongqing" },
  { value: "THAILNAD", label: "Thailnad" },
];

export const serverStatuses = [
  "online",
  "offline",
  "maintenance"
] as const;

export type ServerStatus = (typeof serverStatuses)[number];
