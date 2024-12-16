export interface addUser {
  firstName: string;
  lastName: string;
  role: string;
  nationalCode: string;
  mobile: string;
  username: string;
  password: string;
}
export interface editUser {
  id: number;
  firstName: string;
  lastName: string;
  role: string;
  nationalCode: string;
  mobile: string;
  username: string;
  password: string;
}

export interface loginUser {
  username: string;
  password: string;
}

export interface addProduct {
  name: string;
  code: string;
  weight: string;
}

export interface editProduct {
  id: number;
  name: string;
  code: string;
  weight: string;
}
