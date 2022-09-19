import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import Item from './item.entity';

@Entity()
export default class Home {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Item, (item) => item.home, { onDelete: 'CASCADE' })
  items: Item[];

  @Column({ length: 1024 })
  name: string;

  @Column({ length: 255 })
  slug: string;

  @Column({
    nullable: true,
  })
  description: string;

  @Column({
    nullable: true,
  })
  address: string;

  @Column({
    nullable: true,
  })
  paymentTypes: string;

  @Column({ default: () => 'NOW()' })
  createdAt: Date;

  @Column({ default: () => 'NOW()' })
  updatedAt: Date;
}
