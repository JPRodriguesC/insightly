import { UsuarioEntity } from '../entities/usuario.entity';

export const mockUsuario: UsuarioEntity = {
  Id: 1,
  Nome: 'João Silva',
  Biografia: 'Desenvolvedor apaixonado por tecnologia',
  UserName: 'joaosilva',
  Email: 'joao@example.com',
  DataCriacao: new Date(),
  Links: [],
  Feedbacks: [],
};
