import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import Item from './item.entity';
import Home from './home.entity';
@Entity()
export default class Bundle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Home, (home) => home.items, { onDelete: 'CASCADE' })
  home: Home;

  @OneToMany(() => Item, (item) => item.bundle)
  items: Item[];

  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  price: number;

  @Column({
    nullable: true,
  })
  soldAt: Date;

  @Column({
    nullable: true,
  })
  soldPrice: number;

  @Column({
    nullable: true,
  })
  soldTo: string;

  @Column({ default: () => 'NOW()' })
  createdAt: Date;

  @Column({ default: () => 'NOW()' })
  updatedAt: Date;
}
