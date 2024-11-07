// components/NotificationIcon.js
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function NotificationIcon() {
  const { currentUser } = useSelector((state) => state.user) || {}; // Handle potential null
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    // Check if currentUser and token are available
    if (!currentUser || !currentUser.token) {
      console.warn('User is not logged in or token is missing.');
      return;
    }

    
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('/api/notifications/getno', {
          headers: { Authorization: `Bearer ${currentUser.token}` }
        });
        
        if (response && response.data) { // Check if response and data are present
          setNotifications(response.data);
          setUnreadCount(response.data.filter((notification) => !notification.isRead).length);
        } else {
          console.warn('No notifications data found.');
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
        toast.error('Failed to load notifications.');
      }
    };

    fetchNotifications();
  }, [currentUser]);

  const toggleNotifications = () => setShowNotifications(!showNotifications);

  return (
    <div className="relative">
      <button
        onClick={toggleNotifications}
        className="relative p-2 bg-teal-500 rounded-full text-white hover:bg-teal-600 focus:outline-none"
      >
        <span className="material-icons">notifications</span>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {showNotifications && (
        <div className="absolute top-12 right-0 w-72 bg-white shadow-lg border border-gray-200 rounded-lg p-4 max-h-96 overflow-y-auto z-10">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div key={notification._id} className="p-2 border-b last:border-none">
                <p className="text-sm font-semibold">{notification.message}</p>
                <span className="text-xs text-gray-500">
                  {new Date(notification.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-600">No notifications</p>
          )}
        </div>
      )}
    </div>
  );
}
