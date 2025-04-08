
export interface ServerFormProps {
  onClose: () => void;
  onSubmit: (data: ServerFormValues) => void;
}

export interface ServerFormValues {
  name: string;
  ipAddress: string;
  buildPlan: string[];
  timeOffset: string;
  pmFullname: string;
  l2Fullname: string;
  site: string;
  type: string;
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
