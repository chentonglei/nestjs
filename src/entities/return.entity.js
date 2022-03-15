import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
@Entity({
  name: 'return', //表名
  database: 'lost', //数据库名
})
export class Return {
  @PrimaryGeneratedColumn({ type: Number })
  Return_id;

  @Column({ type: Number }) //一定要定义类型
  Return_message_id;

  @Column({ type: String })
  Return_people_id;

  @Column({ type: String })
  Return_people_phone;

  @Column({ type: String })
  Return_people_name;

  @Column({ type: String })
  Return_type;

  @Column({ type: String })
  Return_time;
}
