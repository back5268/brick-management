import { accounts, tools } from '@data';
import { createAccountMd, createToolMd } from '@models';

export const setup = async () => {
  for (const account of accounts) {
    await createAccountMd(account);
  }
  for (const tool of tools) {
    await createToolMd(tool);
  }
  console.log('Setup done!');
};
