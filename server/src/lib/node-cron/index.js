import cron from 'node-cron';
import { warningTimekeeping } from './timekeepingCr';
import { autoDayOff } from './autoDayOffCr';

cron.schedule('0,30 * * * *', async () => {
  await warningTimekeeping();
  await autoDayOff();
});
