import { FeedbackEntity } from '../entities/feedback.entity';
import { mockUsuario } from './usuario.mock';

export const mockFeedback: FeedbackEntity = {
  Id: 1,
  UsuarioId: 1,
  Descricao: 'Ótimo perfil!',
  DataCriacao: new Date(),
  Usuario: mockUsuario,
};
