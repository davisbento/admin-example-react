import { notification } from 'antd';

export const openNotification = (type: 'success' | 'error', title: string, message?: string, duration: number = 5) => {
  notification[type]({
    message: title,
    description: message || '',
    duration
  });
};
