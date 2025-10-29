import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UsuarioEntity } from './usuario.entity';

@Entity('Feedback')
export class FeedbackEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  Id: number;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'now()' })
  DataCriacao: Date;

  @Column({ type: 'bigint', nullable: true })
  UsuarioId: number;

  @Column({ type: 'varchar', default: '' })
  Descricao: string;

  @ManyToOne(() => UsuarioEntity, (usuario) => usuario.Feedbacks)
  @JoinColumn({ name: 'UsuarioId' })
  Usuario: UsuarioEntity;
}
