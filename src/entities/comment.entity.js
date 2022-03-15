import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
@Entity({
  name: 'comment', //表名
  database: 'lost', //数据库名
})
export class Comment {
  @PrimaryGeneratedColumn({ type: Number })
  Com_id;

  @Column({ type: String }) //一定要定义类型
  Com_do_message;

  @Column({ type: String })
  Com_do_name;

  @Column({ type: String })
  Com_do_id;

  @Column({ type: String })
  Com_do_time;

  @Column({ type: String })
  Com_be_name;

  @Column({ type: String })
  Com_be_id;
}
