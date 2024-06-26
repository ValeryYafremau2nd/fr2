import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { RoleEntity } from '../role.entity/role.entity';

@Entity('Users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, unique: true, nullable: false })
  username: string;

  @Column({ length: 255, nullable: false })
  password: string;

  @ManyToOne((type) => RoleEntity, { cascade: true })
  @JoinColumn({ name: 'roleId' })
  role: RoleEntity;
}
