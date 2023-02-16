export const Users: UserType[] = [
  {
    login: 'admin',
    passwordHash:
      '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918',
    id: 1111,
  },
  {
    login: 'Maxim',
    passwordHash:
      'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3',
    id: 2221,
  },
  {
    login: 'Ivan',
    passwordHash:
      'bef57ec7f53a6d40beb640a780a639c83bc29ac8a9816f1fc6c5c6dcd93c4721',
    id: 3331,
  },
]
export type UserType = {
  login: string
  passwordHash: string
  id: number
}
