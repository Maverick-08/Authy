import React, { useEffect, useState } from "react";
import NotificationIcon from "../assets/icons/notifications.svg";
import { useRecoilState } from "recoil";
import { userNotificationsAtom } from "../state/notificationAtom";
import { fetchNotifications } from "../utils/auth";

const Notifications = ({ accessToken, userId }) => {
  const [userNotificationsList, setUserNotificationsList] = useRecoilState(
    userNotificationsAtom
  );
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchNotifications(accessToken, userId);

      if (response.status) {
        setUserNotificationsList(response.notifications ?? []);
      }
    };

    if (showNotification) {
      fetchData();
    }
  }, [showNotification]);

  return (
    <div className="relative flex flex-col">
      <div onClick={() => setShowNotification((prev) => !prev)}>
        <img
          src={NotificationIcon}
          alt="Notification Icon"
          className="w-8 h-8 cursor-pointer"
        />
      </div>
      <div
        className={`${
          showNotification ? "fixed" : "hidden"
        } mt-16 left-[5%] shadow-lg px-4 py-4 border-2 border-purple-300 rounded-xl`}
      >
        {userNotificationsList.length === 0 ? (
          <p className="text-xl">No New Notifications</p>
        ) : (
          userNotificationsList.map((notification, index) => (
            <DisplayNotification key={index} notification={notification} />
          ))
        )}
      </div>
    </div>
  );
};

const DisplayNotification = ({ notification }) => {
  return (
    <div className="p-2 mb-2 border-b border-gray-200">
      <p className="text-gray-700">{notification}</p>
    </div>
  );
};

export default Notifications;
