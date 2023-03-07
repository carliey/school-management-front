export interface User {
  id: any;
  name: string;
  email: string;
}

export interface Teacher {
  id?: any;
  firstname: string;
  lastname: string;
  gender: string;
  phone: number;
  email: string;
  roles: string[];
  password: string;
  classroom?: Classroom[];
}

export interface Student {
  id?: any;
  firstname: string;
  lastname: string;
  gender: string;
  middlename?: string;
  classroom_id?: number | null;
  soo: string;
  dob: string;
}

export interface Classroom {
  created_at?: string;
  id?: any;
  name: string;
  teacher_id: number;
}

export interface Subject {
  id?: any;
  created_at?: string;
  name: string;
  description?: string;
}
