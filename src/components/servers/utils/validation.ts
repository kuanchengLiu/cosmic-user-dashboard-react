
export const regexPatterns = {
  serverName: /^[a-zA-Z0-9_-]{3,}$/,
  buildPlan: /^([a-zA-Z0-9]+,)*[a-zA-Z0-9]+$/,
  ipAddress: /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)$/,
  timeOffset: /^UTC[+-][0-9]{2}$/,
  pmFullname: /^[a-zA-Z\s]{3,}$/,
  l2Fullname: /^[a-zA-Z\s]{3,}$/,
  site: /^[A-Za-z]+$/,
};

export const getHelpText = (field: string): string => {
  switch (field) {
    case "name":
      return "At least 3 alphanumeric characters, underscores, or hyphens";
    case "ipAddress":
      return "Valid IPv4 address (e.g., 192.168.1.1)";
    case "buildPlan":
      return "Comma-separated alphanumeric values (e.g., plan1,plan2)";
    case "timeOffset":
      return "Format: UTC+/-XX (e.g., UTC+08)";
    case "pmFullname":
    case "l2Fullname":
      return "At least 3 alphabetic characters or spaces";
    case "site":
      return "Alphabetic characters only";
    default:
      return "";
  }
};

export const validateField = (field: string, value: string): { isValid: boolean; message: string } => {
  let pattern: RegExp | null = null;
  let message = "";
  
  switch (field) {
    case "name":
      pattern = regexPatterns.serverName;
      message = "Server name must have at least 3 alphanumeric characters, underscores or hyphens";
      break;
    case "ipAddress":
      pattern = regexPatterns.ipAddress;
      message = "Invalid IP address format";
      break;
    case "buildPlan":
      pattern = regexPatterns.buildPlan;
      message = "Build plan must be comma-separated alphanumeric values";
      break;
    case "timeOffset":
      pattern = regexPatterns.timeOffset;
      message = "Time offset must be in format UTC+/-XX";
      break;
    case "pmFullname":
      pattern = regexPatterns.pmFullname;
      message = "Project Manager name must have at least 3 alphabetic characters";
      break;
    case "l2Fullname":
      pattern = regexPatterns.l2Fullname;
      message = "L2 Support name must have at least 3 alphabetic characters";
      break;
    case "site":
      pattern = regexPatterns.site;
      message = "Site must contain only alphabetic characters";
      break;
  }
  
  if (!value) return { isValid: true, message: "" }; // Empty is handled by required validation
  if (pattern && !pattern.test(value)) {
    return { isValid: false, message };
  }
  
  return { isValid: true, message: "" };
};
