export type UserRole = 'homeowner' | 'agent';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
}

export interface Property {
  id: string;
  address: string;
  type: 'house' | 'apartment' | 'condo' | 'townhouse';
  yearBuilt: number;
  policyNumber?: string;
  conditionScore?: 'good' | 'fair' | 'poor';
  photoCount: number;
  lastUpdated: string;
  riskLevel?: 'low' | 'medium' | 'high';
  thumbnail?: string;
  image?: string;
  healthScore?: 'good' | 'fair' | 'poor';
}

export interface Photo {
  id: string;
  propertyId: string;
  url: string;
  category: 'interior' | 'exterior' | 'roof' | 'damage';
  title?: string;
  description?: string;
  tags: string[];
  capturedAt: string;
  hasGPS: boolean;
  aiAnalysis?: {
    blurDetected: boolean;
    damageDetected: boolean;
    issues: string[];
  };
}

export interface WeatherAlert {
  id: string;
  type: 'storm' | 'hail' | 'flood' | 'wind';
  severity: 'low' | 'medium' | 'high';
  message: string;
  affectedZip: string;
  timestamp: string;
}

export interface PhotoRequest {
  id: string;
  propertyId: string;
  agentId: string;
  instructions: string;
  category: string;
  status: 'pending' | 'completed';
  createdAt: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  propertiesCount: number;
  lastActivity: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  read: boolean;
  timestamp: string;
  link?: string;
}

export interface ChecklistItem {
  id: string;
  title: string;
  description?: string;
  required: boolean;
  completed: boolean;
  type: 'photo' | 'document' | 'form';
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  value?: number;
  serialNumber?: string;
  purchaseDate?: string;
  receiptUrl?: string;
  photoUrl?: string;
}
