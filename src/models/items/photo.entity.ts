import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import Item from './item.entity';
@Entity()
export default class Photo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Item, (item) => item.photos, { onDelete: 'CASCADE' })
  item: Item;

  @Column()
  photoUrl: string;

  @Column()
  thumbnailUrl: string;

  @Column({ default: () => 'NOW()' })
  createdAt: Date;

  @Column({ default: () => 'NOW()' })
  updatedAt: Date;
}
