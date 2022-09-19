import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Home from './home.entity';
import Item from './item.entity';

@Entity()
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  passwordHash: string;

  @OneToMany(() => Home, (home) => home.user)
  homes: Home[];

  @OneToMany(() => Item, (item) => item.soldTo)
  items: Item[];

  @Column({ default: () => 'NOW()' })
  createdAt: Date;

  @Column({ default: () => 'NOW()' })
  updatedAt: Date;
}
