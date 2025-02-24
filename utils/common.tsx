export const convertLengthToDuration = (length: string): number => {
  switch (length) {
    case "10 seconds":
      return 10;
    case "15 seconds":
      return 15;
    case "20 seconds":
      return 20;
    case "30 seconds":
      return 30;
    case "1 minute":
      return 60;
    case "1.5 minutes":
      return 90;
    case "2 minutes":
      return 120;
    default:
      return 30; // Default to 30 seconds if no match
  }
};
export const allowedRoutes = ["/sign-in", "/sign-up", "/"];