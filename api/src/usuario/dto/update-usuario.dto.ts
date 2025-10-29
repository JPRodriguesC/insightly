import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUsuarioDto {
  @ApiProperty({
    description: 'Nome Completo',
    example: 'João Silva',
  })
  nome: string;

  @ApiPropertyOptional({
    description: 'Biografia do usuário',
    example: 'Desenvolvedor de software apaixonado por tecnologia',
  })
  biografia?: string;

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
