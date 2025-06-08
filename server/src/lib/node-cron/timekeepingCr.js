import { dateData } from '@constant';
import { sendMailWarningTimekeeping } from '@service';
import moment from 'moment';
import { ioSk } from 'src';

export const addTimekeepingByShift = async (shift) => {
  const departments = shift.departments;
  const accounts = await listAccountMd({ department: { $in: departments } });
  const startDate = moment(shift?.dateStart);
  const endDate = shift?.dateEnd ? moment(shift?.dateEnd) : moment(startDate).add(1, 'months');
  const duration = moment.duration(endDate.diff(startDate));
  const days = duration.asDays() + 1;
  const arr = new Array(days).fill(null);
  if (arr?.length > 0) {
    let index = 0;
    for (let i of arr) {
      const date = startDate.clone().add(index, 'days').format('YYYY-MM-DD');
      index += 1;
      const day = dateData[new Date(date).getDay()] || '';
      const dates = shift.dates;
      const info = dates.find((d) => d.date === day);
      if (!day || !info) continue;
      for (const account of accounts) {
        const params = {
          department: account.department,
          account: account._id,
          shift: shift._id,
          date,
          timeStart: info.timeStart,
          timeEnd: info.timeEnd,
          timeBreakStart: info.timeBreakStart,
          timeBreakEnd: info.timeBreakEnd,
          totalTime: info.totalTime,
          totalWork: info.totalWork
        };
        await createScheduleMd(params);
      }
    }
  }
};

export const warningTimekeeping = async () => {
  const time = moment().format('HH:mm');
  const timekeepingConfig = await detailConfigMd({ type: 1 });
  const timez = timekeepingConfig?.timekeeping?.timekeepingWarning;
  if (time === timez) {
    const date = moment().format('YYYY-MM-DD');
    const timekeepings = await listTimekeepingMd({ date });
    const accounts = [];
    for (const timekeeping of timekeepings) {
      const log = await detailTimekeepingLogMd({ date, account: timekeeping.account, shift: timekeeping.shift });
      if (!log) {
        const index = accounts.findIndex((a) => String(a) === String(timekeeping.account));
        if (index < 0) accounts.push(timekeeping.account);
      }
    }
    for (const account of accounts) {
      const accountz = await detailAccountMd({ status: 1, _id: account });
      if (accountz) {
        await sendMailWarningTimekeeping({ to: accountz.email });
        const notify = await createNotifyMd({
          account,
          content: `Hôm nay bạn chưa chấm công!`,
          type: 1,
          data: {}
        });
        ioSk.emit(`notify_${account._id}`, notify);
      }
    }
  }
};
