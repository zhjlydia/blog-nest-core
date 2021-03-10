import {
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { CategoryEntity } from './category.entity';
import { CommentEntity } from './comment.entity';
import { TagEntity } from './tag.entity';
import { UserEntity } from './user.entity';

@Entity('article')
export class ArticleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  slug: string;

  @Column()
  title: string;

  @Column({default: ''})
  image: string;

  @Column('text')
  description: string;

  @Column('text')
  content: string;

  @Column({default: ''})
  @Column('text')
  config: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP'
  })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP'
  })
  updatedAt: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date();
  }

  @ManyToOne(
    type => UserEntity,
    user => user.articles
  )
  author: UserEntity;

  @ManyToOne(
    type => CategoryEntity,
    category => category.articles
  )
  category: CategoryEntity;

  @ManyToMany(
    type => TagEntity,
    tag => tag.articles
  )
  @JoinTable({
    name: 'article_tag'
  })
  tags: TagEntity[];

  @OneToMany(
    type => CommentEntity,
    comment => comment.article
  )
  comments: CommentEntity[];

  @Column({ default: 0 })
  favoriteCount: number;
}
