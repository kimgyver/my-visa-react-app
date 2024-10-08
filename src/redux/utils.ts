// Utility function for deep comparison
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const hasStateChanged = (currentState: any, newState: any): boolean => {
  return JSON.stringify(currentState) !== JSON.stringify(newState);
};
