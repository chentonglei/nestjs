import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
@Entity({
  name: 'recruit', //表名
  database: 'lost', //数据库名
})
export class Recruit {
  @PrimaryGeneratedColumn({ type: Number })
  Rec_id;

  @Column({ type: String }) //一定要定义类型
  Rec_time;

  @Column({ type: String })
  Rec_where;

  @Column({ type: String })
  Rec_content;

  @Column({ type: String })
  Rec_status;

  @Column({ type: String })
  Rec_img;

  @Column({ type: String })
  Rec_people_id;

  @Column({ type: String })
  Rec_people_name;

  @Column({ type: String })
  Rec_people_phone;

  @Column({ type: String })
  Rec_send_time;

  @Column({ type: Number })
  Return_id;
}
