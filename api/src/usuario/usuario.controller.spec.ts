import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { AddFeedbackDto } from './dto/add-feedback.dto';
import { FeedbackEntity } from './entities/feedback.entity';
import { mockFeedback } from './mocks/feedback.mock';
import { mockUsuarioService } from './mocks/service.mock';
import { mockUsuario } from './mocks/usuario.mock';

describe('UsuarioController', () => {
  let controller: UsuarioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuarioController],
      providers: [
        {
          provide: UsuarioService,
          useValue: mockUsuarioService,
        },
      ],
    }).compile();

    controller = module.get<UsuarioController>(UsuarioController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve ser definido', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('deve criar um novo usuário com sucesso', async () => {
      const createUsuarioDto: CreateUsuarioDto = {
        nome: 'João Silva',
        biografia: 'Desenvolvedor apaixonado por tecnologia',
        userName: 'joaosilva',
        email: 'joao@example.com',
        links: [
          { titulo: 'LinkedIn', url: 'https://linkedin.com/in/joaosilva' },
        ],
      };

      mockUsuarioService.create.mockResolvedValue(mockUsuario);

      const result = await controller.create(createUsuarioDto);

      expect(result).toEqual(mockUsuario);
      expect(mockUsuarioService.create).toHaveBeenCalledWith(createUsuarioDto);
      expect(mockUsuarioService.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('deve atualizar um usuário existente', async () => {
      const username = 'joaosilva';
      const updateUsuarioDto: UpdateUsuarioDto = {
        nome: 'João Santos',
        biografia: 'Desenvolvedor sênior',
        links: [],
      };

      const updatedUsuario = { ...mockUsuario, Nome: 'João Santos' };
      mockUsuarioService.update.mockResolvedValue(updatedUsuario);

      const result = await controller.update(username, updateUsuarioDto);

      expect(result).toEqual(updatedUsuario);
      expect(mockUsuarioService.update).toHaveBeenCalledWith(
        username,
        updateUsuarioDto,
      );
      expect(mockUsuarioService.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('getByUsername', () => {
    it('deve retornar um usuário pelo username', async () => {
      const username = 'joaosilva';
      mockUsuarioService.findUsuarioByUsername.mockResolvedValue(mockUsuario);

      const result = await controller.getByUsername(username);

      expect(result).toEqual(mockUsuario);
      expect(mockUsuarioService.findUsuarioByUsername).toHaveBeenCalledWith(
        username,
      );
      expect(mockUsuarioService.findUsuarioByUsername).toHaveBeenCalledTimes(1);
    });
  });

  describe('addFeedback', () => {
    it('deve adicionar um feedback a um usuário', async () => {
      const username = 'joaosilva';
      const addFeedbackDto: AddFeedbackDto = {
        descricao: 'Ótimo perfil!',
      };

      mockUsuarioService.addFeedback.mockResolvedValue(mockFeedback);

      const result = await controller.addFeedback(username, addFeedbackDto);

      expect(result).toEqual(mockFeedback);
      expect(mockUsuarioService.addFeedback).toHaveBeenCalledWith(
        username,
        addFeedbackDto.descricao,
      );
      expect(mockUsuarioService.addFeedback).toHaveBeenCalledTimes(1);
    });
  });

  describe('feedbacks', () => {
    it('deve retornar todos os feedbacks de um usuário', async () => {
      const username = 'joaosilva';
      const mockFeedbacks = [mockFeedback];

      mockUsuarioService.listFeedbacks.mockResolvedValue(mockFeedbacks);

      const result = await controller.feedbacks(username);

      expect(result).toEqual(mockFeedbacks);
      expect(mockUsuarioService.listFeedbacks).toHaveBeenCalledWith(username);
      expect(mockUsuarioService.listFeedbacks).toHaveBeenCalledTimes(1);
    });

    it('deve retornar um array vazio quando o usuário não tem feedbacks', async () => {
      const username = 'joaosilva';
      const emptyFeedbacks: FeedbackEntity[] = [];

      mockUsuarioService.listFeedbacks.mockResolvedValue(emptyFeedbacks);

      const result = await controller.feedbacks(username);

      expect(result).toEqual(emptyFeedbacks);
      expect(result).toHaveLength(0);
      expect(mockUsuarioService.listFeedbacks).toHaveBeenCalledWith(username);
    });
  });

  describe('tratamento de erros', () => {
    it('deve propagar erro quando service.create falhar', async () => {
      const createUsuarioDto: CreateUsuarioDto = {
        nome: 'João Silva',
        biografia: 'Desenvolvedor',
        userName: 'joaosilva',
        email: 'joao@example.com',
      };

      const error = new Error('Erro ao criar usuário');
      mockUsuarioService.create.mockRejectedValue(error);

      await expect(controller.create(createUsuarioDto)).rejects.toThrow(
        'Erro ao criar usuário',
      );
    });

    it('deve propagar erro quando service.findUsuarioByUsername falhar', async () => {
      const username = 'usuarioInexistente';
      const error = new Error('Usuário não encontrado');
      mockUsuarioService.findUsuarioByUsername.mockRejectedValue(error);

      await expect(controller.getByUsername(username)).rejects.toThrow(
        'Usuário não encontrado',
      );
    });
  });
});
