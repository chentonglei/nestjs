import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
@Entity({
  name: 'school', //表名
  database: 'lost', //数据库名
})
export class School {
  @PrimaryGeneratedColumn({ type: Number })
  Sch_id;

  @Column({ type: String }) //一定要定义类型
  Sch_name;

  @Column({ type: String })
  Sch_time;

  @Column({ type: String })
  Sch_status;

  @Column({ type: String })
  Sch_documents;

  @Column({ type: String })
  Sch_applicant_id;

  @Column({ type: String })
  Sch_applicant_name;
}
