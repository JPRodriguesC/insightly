import {
  Body,
  Controller,
  Post,
  Put,
  Get,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { AddFeedbackDto } from './dto/add-feedback.dto';
import type { UsuarioEntity } from './entities/usuario.entity';
import type { FeedbackEntity } from './entities/feedback.entity';

@ApiTags('usuario')
@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Cria um novo usuário' })
  @ApiBody({ type: CreateUsuarioDto })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso' })
  async create(
    @Body() createUsuarioDto: CreateUsuarioDto,
  ): Promise<UsuarioEntity> {
    return await this.usuarioService.create(createUsuarioDto);
  }

  @Put(':username')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Atualiza usuário pelo nome de usuário' })
  @ApiParam({
    name: 'username',
    description: 'Nome de usuário a ser atualizado',
  })
  @ApiBody({ type: UpdateUsuarioDto })
  @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso' })
  async update(
    @Param('username') username: string,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ): Promise<UsuarioEntity> {
    return await this.usuarioService.update(username, updateUsuarioDto);
  }

  @Get(':username')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtém usuário pelo username' })
  @ApiParam({
    name: 'username',
    description: 'Username a ser encontrado',
  })
  @ApiResponse({ status: 200, description: 'Usuário encontrado' })
  async getByUsername(
    @Param('username') username: string,
  ): Promise<UsuarioEntity> {
    return await this.usuarioService.findUsuarioByUsername(username);
  }

  @Post(':username/feedback')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Adiciona um feedback' })
  @ApiParam({
    name: 'username',
    description: 'Username a ser adicionado o feedback',
  })
  @ApiBody({ type: AddFeedbackDto })
  @ApiResponse({ status: 201, description: 'Feedback adicionado com sucesso' })
  async addFeedback(
    @Param('username') username: string,
    @Body() addFeedbackDto: AddFeedbackDto,
  ): Promise<FeedbackEntity> {
    return await this.usuarioService.addFeedback(
      username,
      addFeedbackDto.descricao,
    );
  }

  @Get(':username/feedbacks')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtém todos os feedbacks do usuário' })
  @ApiParam({
    name: 'username',
    description: 'Username para obter os feedbacks',
  })
  @ApiResponse({
    status: 200,
    description: 'Feedbacks recuperados com sucesso',
  })
  async feedbacks(
    @Param('username') username: string,
  ): Promise<FeedbackEntity[]> {
    return await this.usuarioService.listFeedbacks(username);
  }
}
