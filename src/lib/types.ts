export interface AuthContextType {
  accessToken: string | null;
  user: object | null;
  login: ({ user, accessToken }: { user: object; accessToken: string }) => void;
  logout: () => void;
}

export interface User {
  _id: string;
  username: string;
  avatar: string;
  fullName: string;
  email: string;
  password: string;
  // profile: Profile;
  collections: Collection[];
  isOnline: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export interface Collection {
  _id: string;
  name?: string | null;
  description?: string | null;
  ownerId?: string | null;
  applications?: Application[];
  chat?: Message[];
  createdAt?: string | null;
  updatedAt?: string | null;
}

export interface Application {
  _id: string;
  ownerId: string;
  collectionId: string;
  jobTitle: string;
  description: string;
  organizationName: string;
  organizationAddress: string;
  organizationLogo: string;
  location: string;
  salary: number;
  type: string;
  tasks: Task[];
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  _id: string;
  senderId: User;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Job {
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  description: string;
  since: string;
  salary?: string;
  source: string;
  sourceUrl: string;
}

export interface Experience {
  _id: string;
  jobTitle: string;
  institute: string;
  startDate: Date;
  endDate?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
export interface Education {
  _id: string;
  degree: string;
  name: string;
  institute: string;
  startDate: Date;
  endDate?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface License {
  _id: string;
  name: string;
  issuedBy: string;
  issuedAt: Date;
  expiryDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
