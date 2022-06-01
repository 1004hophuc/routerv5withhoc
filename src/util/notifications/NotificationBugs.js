import { notification } from 'antd';

const NotificationFunction = (type, message, description = '') => {
    notification[type]({
        message: message,
        description: description,
    });
};

export default NotificationFunction