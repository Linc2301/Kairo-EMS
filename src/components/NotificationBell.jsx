"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Bell } from "lucide-react"; // optional: or any icon

export default function NotificationBell({ userId }) {
    const [notifications, setNotifications] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        if (!userId) return;

        const fetchNotifications = async () => {
            try {
                const res = await axios.get(`/api/notifications/${userId}`);
                setNotifications(res.data);
            } catch (error) {
                console.error("Failed to fetch notifications:", error);
            }
        };

        fetchNotifications();
    }, [userId]);

    const unreadCount = notifications.filter((n) => !n.isRead).length;

    return (
        <div className="relative">
            <button
                onClick={() => setShowDropdown((prev) => !prev)}
                className="relative p-2 rounded-full bg-white shadow"
            >
                <Bell className="h-6 w-6" />
                {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                        {unreadCount}
                    </span>
                )}
            </button>

            {showDropdown && (
                <div className="absolute right-0 mt-2 w-80 bg-white border rounded shadow-lg z-50 max-h-80 overflow-auto">
                    {notifications.length === 0 ? (
                        <div className="p-4 text-sm text-gray-500">No notifications</div>
                    ) : (
                        notifications.map((notif) => (
                            <div key={notif.id} className="p-3 border-b hover:bg-gray-50">
                                <p className="text-sm">{notif.message}</p>
                                <p className="text-xs text-gray-400">
                                    {new Date(notif.createdAt).toLocaleString()}
                                </p>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
