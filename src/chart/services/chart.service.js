import { Injectable, Dependencies } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  Lost,
  Recruit,
  Return,
  Comment,
  Register,
  School,
} from '../../entities';
import moment from 'moment';

@Injectable()
@Dependencies(
  getRepositoryToken(Lost),
  getRepositoryToken(Recruit),
  getRepositoryToken(Return),
  getRepositoryToken(Comment),
  getRepositoryToken(Register),
  getRepositoryToken(School),
)
export class ChartService {
  constructor(lost, recruit, returnmessage, comment, register, school) {
    this.lost = lost;
    this.recruit = recruit;
    this.returnmessage = returnmessage;
    this.comment = comment;
    this.register = register;
    this.school = school;
  }
  async getLost(data) {
    // Suppress the warnings
    const moment = require('moment');
    moment.suppressDeprecationWarnings = true;
    if (data.value === '今天') {
      var StartTime = moment().format('YYYY-MM-DD 00:00'); //近一天的起时间
      var LastTime = moment() //近一天的末时间
        .add(1, 'days')
        .format('YYYY-MM-DD 00:00');
      const message = await this.lost
        .createQueryBuilder()
        .where('Lost_send_time BETWEEN :start AND :end')
        .setParameters({
          start: StartTime,
          end: LastTime,
        })
        .getMany();
      var x = new Array(24);
      var y = new Array(24);
      for (var i = 0; i < 24; i++) {
        x[i] = i;
        y[i] = 0;
      }
      for (var j = 0; j < message.length; j++) {
        let time = moment(message[j].Lost_send_time).format('HH');
        y[time] += 1;
      }
      return { point: x, num: y };
    }
    if (data.value === '近30天') {
      var StartTime = moment()
        .subtract(29, 'days')
        .format('YYYY-MM-DD 00:00'); //近一天的起时间
      var LastTime = moment() //近一天的末时间
        .add(1, 'days')
        .format('YYYY-MM-DD 00:00');
      const message = await this.lost
        .createQueryBuilder()
        .where('Lost_send_time BETWEEN :start AND :end')
        .setParameters({
          start: StartTime,
          end: LastTime,
        })
        .getMany();
      var x = new Array(30);
      var y = new Array(30);
      var flag = {}; //时间对应的下标
      var start = moment(StartTime).format('MM-DD');
      for (var i = 0; i < 30; i++) {
        x[i] = start;
        y[i] = 0;
        let key = start;
        let value = i;
        flag[key] = value; //添加属性
        start = moment(start)
          .add(1, 'days')
          .format('MM-DD');
      }
      for (var j = 0; j < message.length; j++) {
        let time = moment(message[j].Lost_send_time).format('MM-DD');
        y[flag[time]] += 1; //利用时间获得数组下标并添加
      }
      return { point: x, num: y };
    }
    if (data.value === '近一年') {
      var StartTime = moment()
        .subtract(11, 'months')
        .format('YYYY-MM-01 00:00'); //近一天的起时间
      var LastTime = moment() //近一天的末时间
        .add(1, 'months')
        .format('YYYY-MM-01 00:00');
      const message = await this.lost
        .createQueryBuilder()
        .where('Lost_send_time BETWEEN :start AND :end')
        .setParameters({
          start: StartTime,
          end: LastTime,
        })
        .getMany();
      var x = new Array(12);
      var y = new Array(12);
      var flag = {}; //时间对应的下标
      var start = moment(StartTime).format('YYYY-MM');
      for (var i = 0; i < 12; i++) {
        x[i] = start;
        y[i] = 0;
        let key = start;
        let value = i;
        flag[key] = value; //添加属性
        start = moment(start)
          .add(1, 'months')
          .format('YYYY-MM');
      }
      for (var j = 0; j < message.length; j++) {
        let time = moment(message[j].Lost_send_time).format('YYYY-MM');
        y[flag[time]] += 1; //利用时间获得数组下标并添加
      }
      return { point: x, num: y };
    }
  }
  async getComment(data) {
    // Suppress the warnings
    const moment = require('moment');
    moment.suppressDeprecationWarnings = true;
    if (data.value === '今天') {
      var StartTime = moment().format('YYYY-MM-DD 00:00'); //近一天的起时间
      var LastTime = moment() //近一天的末时间
        .add(1, 'days')
        .format('YYYY-MM-DD 00:00');
      const message = await this.comment
        .createQueryBuilder()
        .where('Com_do_time BETWEEN :start AND :end')
        .setParameters({
          start: StartTime,
          end: LastTime,
        })
        .getMany();
      var x = new Array(24);
      var y = new Array(24);
      for (var i = 0; i < 24; i++) {
        x[i] = i;
        y[i] = 0;
      }
      for (var j = 0; j < message.length; j++) {
        let time = moment(message[j].Com_do_time).format('HH');
        y[time] += 1;
      }
      return { point: x, num: y };
    }
    if (data.value === '近30天') {
      var StartTime = moment()
        .subtract(29, 'days')
        .format('YYYY-MM-DD 00:00'); //近一天的起时间
      var LastTime = moment() //近一天的末时间
        .add(1, 'days')
        .format('YYYY-MM-DD 00:00');
      const message = await this.comment
        .createQueryBuilder()
        .where('Com_do_time BETWEEN :start AND :end')
        .setParameters({
          start: StartTime,
          end: LastTime,
        })
        .getMany();
      var x = new Array(30);
      var y = new Array(30);
      var flag = {}; //时间对应的下标
      var start = moment(StartTime).format('MM-DD');
      for (var i = 0; i < 30; i++) {
        x[i] = start;
        y[i] = 0;
        let key = start;
        let value = i;
        flag[key] = value; //添加属性
        start = moment(start)
          .add(1, 'days')
          .format('MM-DD');
      }
      for (var j = 0; j < message.length; j++) {
        let time = moment(message[j].Com_do_time).format('MM-DD');
        y[flag[time]] += 1; //利用时间获得数组下标并添加
      }
      return { point: x, num: y };
    }
    if (data.value === '近一年') {
      var StartTime = moment()
        .subtract(11, 'months')
        .format('YYYY-MM-01 00:00'); //近一天的起时间
      var LastTime = moment() //近一天的末时间
        .add(1, 'months')
        .format('YYYY-MM-01 00:00');
      const message = await this.comment
        .createQueryBuilder()
        .where('Com_do_time BETWEEN :start AND :end')
        .setParameters({
          start: StartTime,
          end: LastTime,
        })
        .getMany();
      var x = new Array(12);
      var y = new Array(12);
      var flag = {}; //时间对应的下标
      var start = moment(StartTime).format('YYYY-MM');
      for (var i = 0; i < 12; i++) {
        x[i] = start;
        y[i] = 0;
        let key = start;
        let value = i;
        flag[key] = value; //添加属性
        start = moment(start)
          .add(1, 'months')
          .format('YYYY-MM');
      }
      for (var j = 0; j < message.length; j++) {
        let time = moment(message[j].Com_do_time).format('YYYY-MM');
        y[flag[time]] += 1; //利用时间获得数组下标并添加
      }
      return { point: x, num: y };
    }
  }
  async getReturn(data) {
    // Suppress the warnings
    const moment = require('moment');
    moment.suppressDeprecationWarnings = true;
    if (data.value === '今天') {
      var StartTime = moment().format('YYYY-MM-DD 00:00'); //近一天的起时间
      var LastTime = moment() //近一天的末时间
        .add(1, 'days')
        .format('YYYY-MM-DD 00:00');
      const message = await this.returnmessage
        .createQueryBuilder()
        .where('Return_time BETWEEN :start AND :end')
        .setParameters({
          start: StartTime,
          end: LastTime,
        })
        .getMany();
      var x = new Array(24);
      var y = new Array(24);
      for (var i = 0; i < 24; i++) {
        x[i] = i;
        y[i] = 0;
      }
      for (var j = 0; j < message.length; j++) {
        let time = moment(message[j].Return_time).format('HH');
        y[time] += 1;
      }
      return { point: x, num: y };
    }
    if (data.value === '近30天') {
      var StartTime = moment()
        .subtract(29, 'days')
        .format('YYYY-MM-DD 00:00'); //近一天的起时间
      var LastTime = moment() //近一天的末时间
        .add(1, 'days')
        .format('YYYY-MM-DD 00:00');
      const message = await this.returnmessage
        .createQueryBuilder()
        .where('Return_time BETWEEN :start AND :end')
        .setParameters({
          start: StartTime,
          end: LastTime,
        })
        .getMany();
      var x = new Array(30);
      var y = new Array(30);
      var flag = {}; //时间对应的下标
      var start = moment(StartTime).format('MM-DD');
      for (var i = 0; i < 30; i++) {
        x[i] = start;
        y[i] = 0;
        let key = start;
        let value = i;
        flag[key] = value; //添加属性
        start = moment(start)
          .add(1, 'days')
          .format('MM-DD');
      }
      for (var j = 0; j < message.length; j++) {
        let time = moment(message[j].Return_time).format('MM-DD');
        y[flag[time]] += 1; //利用时间获得数组下标并添加
      }
      return { point: x, num: y };
    }
    if (data.value === '近一年') {
      var StartTime = moment()
        .subtract(11, 'months')
        .format('YYYY-MM-01 00:00'); //近一天的起时间
      var LastTime = moment() //近一天的末时间
        .add(1, 'months')
        .format('YYYY-MM-01 00:00');
      const message = await this.returnmessage
        .createQueryBuilder()
        .where('Return_time BETWEEN :start AND :end')
        .setParameters({
          start: StartTime,
          end: LastTime,
        })
        .getMany();
      var x = new Array(12);
      var y = new Array(12);
      var flag = {}; //时间对应的下标
      var start = moment(StartTime).format('YYYY-MM');
      for (var i = 0; i < 12; i++) {
        x[i] = start;
        y[i] = 0;
        let key = start;
        let value = i;
        flag[key] = value; //添加属性
        start = moment(start)
          .add(1, 'months')
          .format('YYYY-MM');
      }
      for (var j = 0; j < message.length; j++) {
        let time = moment(message[j].Return_time).format('YYYY-MM');
        y[flag[time]] += 1; //利用时间获得数组下标并添加
      }
      return { point: x, num: y };
    }
  }
  async getRecruit(data) {
    // Suppress the warnings
    const moment = require('moment');
    moment.suppressDeprecationWarnings = true;
    if (data.value === '今天') {
      var StartTime = moment().format('YYYY-MM-DD 00:00'); //近一天的起时间
      var LastTime = moment() //近一天的末时间
        .add(1, 'days')
        .format('YYYY-MM-DD 00:00');
      const message = await this.recruit
        .createQueryBuilder()
        .where('Rec_send_time BETWEEN :start AND :end')
        .setParameters({
          start: StartTime,
          end: LastTime,
        })
        .getMany();
      var x = new Array(24);
      var y = new Array(24);
      for (var i = 0; i < 24; i++) {
        x[i] = i;
        y[i] = 0;
      }
      for (var j = 0; j < message.length; j++) {
        let time = moment(message[j].Rec_send_time).format('HH');
        y[time] += 1;
      }
      return { point: x, num: y };
    }
    if (data.value === '近30天') {
      var StartTime = moment()
        .subtract(29, 'days')
        .format('YYYY-MM-DD 00:00'); //近一天的起时间
      var LastTime = moment() //近一天的末时间
        .add(1, 'days')
        .format('YYYY-MM-DD 00:00');
      const message = await this.recruit
        .createQueryBuilder()
        .where('Rec_send_time BETWEEN :start AND :end')
        .setParameters({
          start: StartTime,
          end: LastTime,
        })
        .getMany();
      var x = new Array(30);
      var y = new Array(30);
      var flag = {}; //时间对应的下标
      var start = moment(StartTime).format('MM-DD');
      for (var i = 0; i < 30; i++) {
        x[i] = start;
        y[i] = 0;
        let key = start;
        let value = i;
        flag[key] = value; //添加属性
        start = moment(start)
          .add(1, 'days')
          .format('MM-DD');
      }
      for (var j = 0; j < message.length; j++) {
        let time = moment(message[j].Rec_send_time).format('MM-DD');
        y[flag[time]] += 1; //利用时间获得数组下标并添加
      }
      return { point: x, num: y };
    }
    if (data.value === '近一年') {
      var StartTime = moment()
        .subtract(11, 'months')
        .format('YYYY-MM-01 00:00'); //近一天的起时间
      var LastTime = moment() //近一天的末时间
        .add(1, 'months')
        .format('YYYY-MM-01 00:00');
      const message = await this.recruit
        .createQueryBuilder()
        .where('Rec_send_time BETWEEN :start AND :end')
        .setParameters({
          start: StartTime,
          end: LastTime,
        })
        .getMany();
      var x = new Array(12);
      var y = new Array(12);
      var flag = {}; //时间对应的下标
      var start = moment(StartTime).format('YYYY-MM');
      for (var i = 0; i < 12; i++) {
        x[i] = start;
        y[i] = 0;
        let key = start;
        let value = i;
        flag[key] = value; //添加属性
        start = moment(start)
          .add(1, 'months')
          .format('YYYY-MM');
      }
      for (var j = 0; j < message.length; j++) {
        let time = moment(message[j].Rec_send_time).format('YYYY-MM');
        y[flag[time]] += 1; //利用时间获得数组下标并添加
      }
      return { point: x, num: y };
    }
  }
  async getUser() {
    var boy = 0;
    var girl = 0;
    const num = await this.register.find({ Re_power: 'user' });
    for (var i = 0; i < num.length; i++) {
      if (num[i].Re_sex === '男') boy += 1;
      else girl += 1;
    }
    return { boy, girl };
  }
  async getSchool() {
    const body = [];
    var flag = {}; //学校对应的下标
    const num = await this.school.find({ Sch_status: '审核通过' });
    for (var i = 0; i < num.length; i++) {
      const temp = { value: 0, name: num[i].Sch_name };
      body.push(temp);
      let key = num[i].Sch_name;
      let value = i;
      flag[key] = value; //添加属性
    }
    body.push({ value: 0, name: '未认证' });
    flag['未认证'] = i;
    const user = await this.register.find({ Re_power: 'user' });
    for (var j = 0; j < user.length; j++) {
      if (user[j].Re_school_name) body[flag[user[j].Re_school_name]].value += 1;
      else body[i].value += 1;
    }
    return body;
  }
}
