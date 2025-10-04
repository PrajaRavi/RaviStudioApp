// utils/networkStatus.ts

import NetInfo from '@react-native-community/netinfo';

/**
 * Checks if the user is currently online.
 * @returns Promise<boolean> - true if online, false if offline
 */
export const isUserOnline = async (): Promise<boolean> => {
  try {
    const state = await NetInfo.fetch();
    return !!state.isConnected;
  } catch (error) {
    console.error('Failed to check network status:', error);
    return false; // assume offline on error
  }
};
