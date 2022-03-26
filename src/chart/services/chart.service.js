import { Injectable, Dependencies } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Lost } from '../../entities';
import moment from 'moment';

@Injectable()
@Dependencies(getRepositoryToken(Lost))
export class ChartService {
  constructor(lost) {
    this.lost = lost;
  }
  async getLost(data) {
    // Suppress the warnings
    const moment = require('moment');
    moment.suppressDeprecationWarnings = true;
    if (data.value === '今天') {
      var StartTime = moment().format('YYYY-M-D 00:00'); //近一天的起时间
      var LastTime = moment() //近一天的末时间
        .add(1, 'days')
        .format('YYYY-M-D 00:00');
      const message = await this.lost
        .createQueryBuilder()
        .where('Lost_send_time BETWEEN :start AND :end')
        .setParameters({
          start: StartTime,
          end: LastTime,
        })
        .getMany();
      var days = new Array(24);
      for (var i = 0; i < days.length; i++) {
        days[i] = 0;
      }
      for (var j = 0; j < message.length; j++) {
        let time = moment(message[j].Lost_send_time).format('H');
        days[time] += 1;
      }
      return days;
    }
  }
}
