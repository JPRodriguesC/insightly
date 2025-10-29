import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UsuarioEntity } from './usuario.entity';

@Entity('Links')
export class LinksEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  Id: number;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'now()' })
  DataCriacao: Date;

  @Column({ type: 'bigint', nullable: true })
  UsuarioId: number;

  @Column({ type: 'varchar', default: '' })
  Titulo: string;

  @Column({ type: 'varchar', default: '' })
  URL: string;

  @ManyToOne(() => UsuarioEntity, (usuario) => usuario.Links)
  @JoinColumn({ name: 'UsuarioId' })
  Usuario: UsuarioEntity;
}
