import {
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { ArticleEntity } from './article.entity';
import { UserEntity } from './user.entity';

@Entity('comment')
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  content: string;

  @Column()
  parentId: number;

  @Column({ default: false })
  isDeleted: boolean;

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
    type => ArticleEntity,
    article => article.comments
  )
  article: ArticleEntity;

  @ManyToOne(
    type => UserEntity,
    user => user.comments
  )
  user: UserEntity;
}
