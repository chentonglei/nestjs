import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
@Entity({
  name: 'introduction', //表名
  database: 'lost', //数据库名
})
export class Introduction {
  @PrimaryGeneratedColumn({ type: Number })
  Intr_id;

  @Column({ type: String }) //一定要定义类型
  Intr_question;

  @Column({ type: String })
  Intr_answer;
}
