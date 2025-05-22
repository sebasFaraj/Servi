export interface UserSettings {
  notifications: boolean;
  smsNotifications: boolean;
  darkMode: boolean;
  language: string;
  twoFactor: boolean;
  loginAlerts: boolean;
}

export interface SettingsUpdate {
  type: keyof UserSettings;
  value: boolean | string;
}