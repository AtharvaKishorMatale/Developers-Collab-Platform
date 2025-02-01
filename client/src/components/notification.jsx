import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaBell } from 'react-icons/fa';
import React from 'react';

const Notifications = ({ currentUserId }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    // Initial fetch when component mounts
    fetchNotifications();
    // Polling to fetch notifications every minute
    const interval = setInterval(fetchNotifications, 60000); 
    return () => clearInterval(interval);
  }, [currentUserId]);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/notifications/getno', {
        params: { recipientId: currentUserId },
      });
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleDropdown = async () => {
    setIsDropdownOpen(!isDropdownOpen);

    if (!isDropdownOpen) {
      // Mark notifications as read when opening the dropdown
      await markNotificationsAsRead();
      fetchNotifications(); // Refresh notifications
    }
  };

  const markNotificationsAsRead = async () => {
    try {
      await axios.put('/api/notifications/markAsRead', { recipientId: currentUserId });
    } catch (error) {
      console.error('Error marking notifications as read:', error);
    }
  };

  return (
    <div className="relative">
      {/* Notification Icon Button */}
      <button onClick={toggleDropdown} className="relative focus:outline-none hover:bg-gray-200 p-2 rounded">
        <FaBell size={24} />
        {/* Display the count of unread notifications */}
        {notifications.filter(n => !n.isRead).length > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {notifications.filter(n => !n.isRead).length}
          </span>
        )}
      </button>

      {/* Notifications Dropdown */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded shadow-lg p-4">
          <h2 className="font-semibold mb-2 text-black">Notifications</h2>
          <hr className="my-2 border-gray-200" />
          {loading ? (
            <p>Loading notifications...</p>
          ) : notifications.length === 0 ? (
            <p>No new notifications</p>
          ) : (
            <ul>
              {notifications.map((notification, index) => (
                <React.Fragment key={notification._id || notification.id}>
                  <li className={`notification ${notification.isRead ? '' : 'font-semibold'}`}>
                    <p className="text-black">{notification.message}</p>
                    <small className="text-gray-500">
                      {new Date(notification.createdAt).toLocaleString()}
                    </small>
                  </li>
                  {index < notifications.length - 1 && <hr className="my-2 border-gray-200" />}
                </React.Fragment>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Notifications;
