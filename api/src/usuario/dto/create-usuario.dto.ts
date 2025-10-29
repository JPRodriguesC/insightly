import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUsuarioDto {
  @ApiProperty({
    description: 'Nome Completo',
    example: 'João Silva',
  })
  readonly nome: string;

  @ApiProperty({
    description: 'Biografia do usuário',
    example: 'Desenvolvedor de software apaixonado por tecnologia',
  })
  readonly biografia: string;

  @ApiProperty({
    description: 'Endereço de e-mail do usuário',
    example: 'joao@exemplo.com',
  })
  readonly email: string;

  @ApiProperty({
    description: 'Nome de usuário',
    example: 'joaosilva',
  })
  readonly userName: string;

  @ApiPropertyOptional({
    description: 'Links de redes sociais',
    type: 'array',
    items: {
      type: 'object',
      properties: {
        titulo: { type: 'string', example: 'LinkedIn' },
        url: { type: 'string', example: 'https://linkedin.com/in/joaosilva' },
      },
    },
  })
  links?: Array<{ titulo: string; url: string }>;
}
