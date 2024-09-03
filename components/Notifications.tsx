'use client'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { InboxNotification, InboxNotificationList, LiveblocksUIConfig } from "@liveblocks/react-ui"
import { useInboxNotifications, useUnreadInboxNotificationsCount } from "@liveblocks/react/suspense"
import Image from "next/image"
import { ReactNode, useState } from "react"
import '../styles/notifications.css'; // Import the custom CSS file

const Notifications = () => {
  const { inboxNotifications } = useInboxNotifications();
  const { count } = useUnreadInboxNotificationsCount();
  const [readNotifications, setReadNotifications] = useState<string[]>([]);

  const handleNotificationClick = (notificationId: string) => {
    // Mark the notification as read
    setReadNotifications((prev) => [...prev, notificationId]);
    console.log(`Notification ${notificationId} clicked`);
  };

  const unreadNotifications = inboxNotifications.filter((notification) => !notification.readAt && !readNotifications.includes(notification.id));

  return (
    <Popover>
      <PopoverTrigger className="relative flex size-10 items-center justify-center rounded-lg">
        <Image 
          src="/assets/icons/bell.svg"
          alt="inbox"
          width={24}
          height={24}
        />
        {count > 0 && unreadNotifications.length > 0 && (
          <div className="absolute right-2 top-2 z-20 size-2 rounded-full bg-blue-500" />
        )}
      </PopoverTrigger>
      <PopoverContent align="end" className="shad-popover max-h-96 overflow-y-auto custom-scrollbar">
        <LiveblocksUIConfig 
          overrides={{
            INBOX_NOTIFICATION_TEXT_MENTION: (user: ReactNode) => (
              <>{user} mentioned you.</>
            )
          }}
        >
          <InboxNotificationList>
            {inboxNotifications.length <= 0 && (
              <p className="py-2 text-center text-dark-500">No new notifications</p>
            )}

            {inboxNotifications.length > 0 && inboxNotifications.map((notification) => (
              <InboxNotification 
                key={notification.id}
                inboxNotification={notification}
                className="bg-dark-200 text-white"
                href={`/documents/${notification.roomId}`}
                showActions={false}
                onClick={() => handleNotificationClick(notification.id)}
                kinds={{
                  thread: (props) => (
                    <InboxNotification.Thread {...props} 
                      showActions={false}
                      showRoomName={false}
                    />
                  ),
                  textMention: (props) => (
                    <InboxNotification.TextMention {...props} 
                      showRoomName={false}
                    />
                  ),
                  $documentAccess: (props) => (
                    <InboxNotification.Custom {...props} title={props.inboxNotification.activities[0].data.title} aside={<InboxNotification.Icon className="bg-transparent">
                      <Image 
                        src={props.inboxNotification.activities[0].data.avatar as string || ''}
                        width={36}
                        height={36}
                        alt="avatar"
                        className="rounded-full"
                      />
                    </InboxNotification.Icon>}>
                      {props.children}
                    </InboxNotification.Custom>
                  )
                }}
              />
            ))}
          </InboxNotificationList>
        </LiveblocksUIConfig>
      </PopoverContent>
    </Popover>
  )
}

export default Notifications