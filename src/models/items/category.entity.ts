import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import Home from './home.entity';
import Item from './item.entity';
@Entity()
export default class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Home, (home) => home.items, { onDelete: 'CASCADE' })
  home: Home;

  @OneToMany(() => Item, (item) => item.category)
  items: Item[];

  @Column({ length: 255 })
  name: string;

  @Column({ default: () => 'NOW()' })
  createdAt: Date;

  @Column({ default: () => 'NOW()' })
  updatedAt: Date;
}
