import { authRouter } from './auth';
import { infoRouter } from './info';
import { webRouter } from './web';

export const routes = (app) => {
  app.use((req, res, next) => {
    next();
  });
  app.use('/web', webRouter);
  app.use('/auth', authRouter);
  app.use('/info', infoRouter);
  app.get('/', async (req, res) => {
    res.json('Welcome!');
  });
};
