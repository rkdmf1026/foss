import axios from 'axios';

const UnreadNotificationCount = async (token: any): Promise<number> => {
  try {
    const response = await axios.get('https://i11a705.p.ssafy.io/api/notifications/unreadCounts', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.unreadCount;
  } catch (error) {
    console.error('Failed to fetch unread notifications count:', error);
    throw error;
  }
};

export default UnreadNotificationCount;
