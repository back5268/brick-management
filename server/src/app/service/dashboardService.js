import { getDataDashboardValid } from '@lib/validation';
import { databaseDate, validateData } from '@utils';
import mongoose from 'mongoose';

export const getDataDashboard = async (req, res) => {
  try {
    const { error, value } = validateData(getDataDashboardValid, req.query);
    if (error) return res.json({ status: 0, mess: error });
    const { fromDate, toDate, department } = value;
    const where = { deletedAt: null },
      wherez = { deletedAt: null },
      wherezz = { deletedAt: null };
    if (fromDate && toDate) {
      where.createdAt = {
        $gte: fromDate,
        $lte: toDate
      };
      wherez.date = {
        $gte: databaseDate(fromDate, 'date'),
        $lte: databaseDate(toDate, 'date')
      };
    }
    if (department) {
      where.department = department;
      wherez.department = department;
      wherezz.department = new mongoose.Types.ObjectId(department);
    }
    const departments = await aggregateDepartmentMd([
      {
        $lookup: {
          from: 'accounts',
          localField: '_id',
          foreignField: 'department',
          as: 'accounts'
        }
      },
      {
        $project: {
          name: 1,
          code: 1,
          total: { $size: '$accounts' },
          official: {
            $size: {
              $filter: {
                input: '$accounts',
                as: 'account',
                cond: { $eq: ['$$account.type', 1] }
              }
            }
          },
          probation: {
            $size: {
              $filter: {
                input: '$accounts',
                as: 'account',
                cond: { $eq: ['$$account.type', 2] }
              }
            }
          },
          intern: {
            $size: {
              $filter: {
                input: '$accounts',
                as: 'account',
                cond: { $eq: ['$$account.type', 3] }
              }
            }
          }
        }
      }
    ]);
    const accounts = await aggregateAccountMd([
      {
        $match: wherezz
      },
      {
        $group: {
          _id: '$gender',
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          gender: '$_id',
          count: 1
        }
      }
    ]);
    const applications = await aggregateApplicationMd([
      {
        $match: where
      },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          status: '$_id',
          count: 1
        }
      }
    ]);
    const attendances = await aggregateTimekeepingMd([
      {
        $match: {
          $or: [{ late: { $gt: 0 } }, { soon: { $gt: 0 } }],
          ...wherez
        }
      },
      {
        $group: {
          _id: '$account',
          department: { $first: '$department' },
          totalLate: { $sum: '$late' },
          totalSoon: { $sum: '$soon' }
        }
      },
      {
        $project: {
          _id: 0,
          department: 1,
          account: '$_id',
          totalLate: 1,
          totalSoon: 1
        }
      }
    ]);

    const timekeepings = [];
    const timekeepingz = await listTimekeepingMd({ ...wherez, type: 1 }, false, false, [{ path: 'applications', select: 'type' }], false, {
      date: 1
    });
    timekeepingz.forEach((timekeeping) => {
      const index = timekeepings.findIndex((t) => t.date === timekeeping.date);
      const object = timekeepings[index] ? timekeepings[index] : { diLam: 0, nghiKhongPhep: 0, nghiCoPhep: 0, congTac: 0, diMuonVeSom: 0 };
      const application = timekeeping.applications?.[0] || {};
      if ([1, 2, 3].includes(application.type)) object.nghiCoPhep += 1;
      else if ([7].includes(application.type)) object.congTac += 1;
      else {
        if (timekeeping.summary === timekeeping.totalWork) object.diLam += 1;
        else if (!timekeeping.summary) object.nghiKhongPhep += 1;
        else object.diMuonVeSom += 1;
      }
      if (index >= 0) {
        timekeepings[index] = { date: timekeeping.date, ...object };
      } else timekeepings.push({ date: timekeeping.date, ...object });
    });
    res.json({ status: 1, data: { departments, accounts, applications, attendances, timekeepings } });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};
