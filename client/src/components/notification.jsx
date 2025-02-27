import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { FaBell } from "react-icons/fa";

export default function NotificationComponent() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 60000);
    return () => clearInterval(interval);
  }, [currentUser.id]);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/notifications/get`, {
        params: { recipientId: currentUser.id }
      });
      setNotifications(res.data);
    } catch (err) {
      console.error("Error fetching notifications:", err);
    } finally {
      setLoading(false);
    }
  };

  const markNotificationsAsRead = async () => {
    try {
      await axios.put("/api/notifications/markAsRead", { recipientId: currentUser.id });
      fetchNotifications();
    } catch (err) {
      console.error("Error marking notifications as read:", err);
    }
  };

  const toggleDropdown = async () => {
    setIsDropdownOpen(!isDropdownOpen);
    if (!isDropdownOpen) {
      await markNotificationsAsRead();
    }
  };

  return (
    <div className="relative">
      <button onClick={toggleDropdown} className="relative focus:outline-none hover:bg-gray-200 p-2 rounded">
        <FaBell size={24} />
        {notifications.filter(n => !n.isRead).length > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {notifications.filter(n => !n.isRead).length}
          </span>
        )}
      </button>
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
                <li key={notification._id} className={`notification ${notification.isRead ? '' : 'font-semibold'}`}>
                  <p className="text-black">{notification.message}</p>
                  <small className="text-gray-500">{new Date(notification.timestamp).toLocaleString()}</small>
                  {index < notifications.length - 1 && <hr className="my-2 border-gray-200" />}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
