import { ApiProperty } from '@nestjs/swagger';

export class AddFeedbackDto {
  @ApiProperty({
    description: 'Novo feedback',
    example: 'Adorei o perfil!.',
  })
  descricao: string;
}
