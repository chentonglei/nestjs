import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
@Entity({
  name: 'register', //表名
  database: 'lost', //数据库名
})
export class Register {
  @PrimaryGeneratedColumn({ type: String })
  Re_id;

  /* @Column({ type: String })
  Re_id; */

  @Column({ type: String }) //一定要定义类型
  Re_name;

  @Column({ type: String })
  Re_password;

  @Column({ type: String })
  Re_email;

  @Column({ type: String })
  Re_sex;

  @Column({ type: String })
  Re_age;

  @Column({ type: String })
  Re_telephone;

  @Column({ type: String })
  Re_power;

  @Column({ type: String })
  Re_status;

  @Column({ type: String })
  Re_school_name;

  @Column({ type: Number })
  Re_school_id;
}
