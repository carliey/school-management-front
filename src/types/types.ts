export interface User {
  id: number | undefined;
  name: string;
  email: string;
}

export interface Teacher {
  id?: number | undefined;
  firstname: string;
  lastname: string;
  gender: string;
  phone: number;
  email: string;
  roles: string[];
  password: string;
  classroom?: Classroom[];
}

export interface Classroom {
  created_at?: string;
  id?: number | undefined;
  name: string;
  teacher_id: number;
}

export interface Subject {
  id?: number | undefined;
  created_at?: string;
  name: string;
  description?: string;
}
