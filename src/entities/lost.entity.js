import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
@Entity({
  name: 'lost', //表名
  database: 'lost', //数据库名
})
export class Lost {
  @PrimaryGeneratedColumn({ type: Number })
  Lost_id;

  @Column({ type: String }) //一定要定义类型
  Lost_time;

  @Column({ type: String })
  Lost_where;

  @Column({ type: String })
  Lost_content;

  @Column({ type: String })
  Lost_status;

  @Column({ type: String })
  Lost_img;

  @Column({ type: String })
  Lost_people_id;

  @Column({ type: String })
  Lost_people_name;

  @Column({ type: String })
  Lost_people_phone;

  @Column({ type: String })
  Lost_send_time;

  @Column({ type: Number })
  Return_id;

  @Column({ type: String })
  Sch_name;

  @Column({ type: Number })
  Sch_id;
}
