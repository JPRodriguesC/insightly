import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioEntity } from './entities/usuario.entity';
import { LinksEntity } from './entities/links.entity';
import { FeedbackEntity } from './entities/feedback.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private usuarioRepository: Repository<UsuarioEntity>,
    @InjectRepository(LinksEntity)
    private linksRepository: Repository<LinksEntity>,
    @InjectRepository(FeedbackEntity)
    private feedbackRepository: Repository<FeedbackEntity>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<UsuarioEntity> {
    const usuarioExistente = await this.usuarioRepository.findOne({
      where: { Email: createUsuarioDto.email },
    });

    if (usuarioExistente) return usuarioExistente;

    const usuario = this.usuarioRepository.create({
      Nome: createUsuarioDto.nome,
      Biografia: createUsuarioDto.biografia,
      UserName: createUsuarioDto.userName,
      Email: createUsuarioDto.email,
    });

    console.log('Usuario em criacao:', usuario);
    const usuarioSalvo = await this.usuarioRepository.save(usuario);

    if (createUsuarioDto.links && createUsuarioDto.links.length > 0) {
      await this.updateLinks(usuarioSalvo.UserName, createUsuarioDto.links);
    }

    return this.findUsuarioById(usuarioSalvo.Id);
  }

  async update(
    userName: string,
    usuario: UpdateUsuarioDto,
  ): Promise<UsuarioEntity> {
    const entidade = await this.findUsuarioByUsername(userName);

    entidade.Nome = usuario.nome;
    entidade.Biografia = usuario.biografia || null;

    await this.usuarioRepository.save(entidade);

    if (usuario.links !== undefined) {
      await this.updateLinks(userName, usuario.links);
    }

    return this.findUsuarioByUsername(userName);
  }

  async updateLinks(
    userName: string,
    links: Array<{ titulo: string; url: string }>,
  ): Promise<void> {
    const usuario = await this.findUsuarioByUsername(userName);
    await this.linksRepository.delete({ UsuarioId: usuario.Id });

    if (links && links.length > 0) {
      const newLinks = links.map((link) =>
        this.linksRepository.create({
          UsuarioId: usuario.Id,
          Titulo: link.titulo,
          URL: link.url,
        }),
      );

      await this.linksRepository.save(newLinks);
    }
  }

  async addFeedback(
    userName: string,
    descricao: string,
  ): Promise<FeedbackEntity> {
    const usuario = await this.findUsuarioByUsername(userName);

    const feedback = this.feedbackRepository.create({
      UsuarioId: usuario.Id,
      Descricao: descricao,
    });

    return this.feedbackRepository.save(feedback);
  }

  async findUsuarioById(id: number): Promise<UsuarioEntity> {
    const usuario = await this.usuarioRepository.findOne({
      where: { Id: id },
      relations: ['Links', 'Feedbacks'],
    });

    if (!usuario) {
      throw new NotFoundException(`Usuario não encontrado`);
    }

    return usuario;
  }

  async findUsuarioByUsername(username: string): Promise<UsuarioEntity> {
    const usuario = await this.usuarioRepository.findOne({
      where: { UserName: username },
      relations: ['Links', 'Feedbacks'],
      order: { Feedbacks: { DataCriacao: 'DESC' } },
    });

    if (!usuario) {
      throw new NotFoundException(
        `Usuario com username ${username} não encontrado`,
      );
    }

    return usuario;
  }

  async listFeedbacks(userName: string): Promise<FeedbackEntity[]> {
    const usuario = await this.findUsuarioByUsername(userName);

    return this.feedbackRepository.find({
      where: { UsuarioId: usuario.Id },
      order: { DataCriacao: 'DESC' },
    });
  }
}
