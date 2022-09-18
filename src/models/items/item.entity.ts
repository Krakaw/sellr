import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import Photo from './photo.entity';
import Home from './home.entity';
import Category from './category.entity';
import Bundle from './bundle.entity';
import Tag from './tag.entity';

@Entity()
export default class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Home, (home) => home.items, { onDelete: 'CASCADE' })
  home: Home;

  @ManyToOne(() => Category, (category) => category.items)
  category: Category;

  @ManyToOne(() => Bundle, (bundle) => bundle.items)
  bundle: Bundle;

  @OneToMany(() => Photo, (photo) => photo.item)
  photos: Photo[];

  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[];

  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  description: string;

  @Column({
    nullable: true,
  })
  sourceUrl: string;

  @Column({
    default: 0,
  })
  price: number;

  @Column({
    nullable: true,
  })
  collectionDate: Date;

  @Column({
    nullable: true,
  })
  soldAt: Date;

  @Column({
    nullable: true,
  })
  soldPrice: number;

  @Column({
    type: 'uuid',
    nullable: true,
  })
  soldTo: string;

  @Column({ default: () => 'NOW()' })
  createdAt: Date;

  @Column({ default: () => 'NOW()' })
  updatedAt: Date;
}
