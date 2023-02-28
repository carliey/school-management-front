export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Teacher {
  id?: number;
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
  id?: number;
  name: string;
  teacher_id: number;
}
