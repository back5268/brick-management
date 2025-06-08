import moment from 'moment';

export const autoDayOff = async () => {
  const time = moment().format('HH:mm');
  const timekeepingConfig = (await detailConfigMd({ type: 1 }))?.timekeeping;
  const timez = timekeepingConfig?.time;
  if (Number(timekeepingConfig.numberDayOffPermonth) && Number(timekeepingConfig.date)) {
    if (Number(timekeepingConfig.date) === new Date().getDate() && time === timez) {
      const accounts = await listAccountMd({ status: 1, type: 1 });
      for (const account of accounts) {
        await updateAccountMd(
          { _id: account._id },
          { numberDayoff: (Number(account.numberDayoff) || 0) + Number(timekeepingConfig.numberDayOffPermonth) }
        );
      }
    }
  }
};
