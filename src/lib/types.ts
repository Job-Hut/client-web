export interface AuthContextType {
  accessToken: string | null;
  user: object | null;
  login: ({ user, accessToken }: { user: object; accessToken: string }) => void;
  logout: () => void;
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
  senderId: string;
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
