import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
@Entity({
  name: 'user', //表名
  database: 'scm', //数据库名
})
export class User {
  @PrimaryGeneratedColumn()
  id;

  @Column({ type: String }) //一定要定义类型
  password;
}
