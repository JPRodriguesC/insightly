import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { LinksEntity } from './links.entity';
import { FeedbackEntity } from './feedback.entity';

@Entity('Usuario')
export class UsuarioEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  Id: number;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'now()' })
  DataCriacao: Date;

  @Column({ type: 'varchar', nullable: true })
  Nome: string | null;

  @Column({ type: 'varchar', nullable: true })
  Biografia: string | null;

  @Column({ type: 'varchar', default: '' })
  UserName: string;

  @Column({ type: 'varchar', default: '' })
  Email: string;

  @OneToMany(() => LinksEntity, (link) => link.Usuario)
  Links: LinksEntity[];

  @OneToMany(() => FeedbackEntity, (feedback) => feedback.Usuario)
  Feedbacks: FeedbackEntity[];
}
