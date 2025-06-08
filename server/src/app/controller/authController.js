import dotenv from 'dotenv';
import { confirmPasswordService, sendOtpForgotPasswordService, signInService } from '@service';
import { listToolMd } from '@models';
dotenv.config();

export const getInfo = async (req, res) => {
  try {
    let tools = req.tools;
    const permissions = req.permissions;
    if (!tools) {
      const toolz = await listToolMd({ status: 1 }, false, false, false, 'name icon items', { sort: 1 });
      tools = toolz.map((tool) => {
        const items = tool.items;
        let itemz = [];
        items.forEach((c) => {
          if (permissions.find((p) => p.route === c.route)) itemz.push(c);
        });
        if (itemz.length > 0) return { ...tool, items: itemz };
      });
      tools = tools.filter((t) => t);
    }
    res.json({ status: 1, data: { userInfo: req.account, tools } });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.message });
  }
};

export const getInfoApp = async (req, res) => {
  try {
    res.json({ status: 1, data: { userInfo: req.account } });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.message });
  }
};

export const signIn = async (req, res) => {
  try {
    const data = await signInService(req);
    res.json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.message });
  }
};

export const sendOtpForgotPassword = async (req, res) => {
  try {
    const data = await sendOtpForgotPasswordService(req);
    res.json({ status: 1, data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 0, mess: error.message });
  }
};

export const confirmPassword = async (req, res) => {
  try {
    const data = await confirmPasswordService(req);
    res.status(201).json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.message });
  }
};
