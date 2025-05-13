
import React, { useEffect, useRef } from 'react';
import { cn } from '../lib/utils';

type Message = {
  id: string;
  channelId: string;
  senderId: string;
  senderName: string;
  avatar: string;
  content: string;
  timestamp: string;
};

interface ChatInterfaceProps {
  messages: Message[];
  formatDate: (date: string) => string;
}

const ChatInterface = ({ messages, formatDate }: ChatInterfaceProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Group messages by date
  const groupMessagesByDate = () => {
    const groups: { [date: string]: Message[] } = {};
    
    messages.forEach(message => {
      const date = new Date(message.timestamp).toLocaleDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
    });
    
    return groups;
  };

  const messageGroups = groupMessagesByDate();

  return (
    <div className="flex-1 p-4 overflow-y-auto">
      {Object.entries(messageGroups).map(([date, dateMessages]) => (
        <div key={date} className="mb-6">
          <div className="flex items-center justify-center mb-4">
            <div className="h-px flex-grow bg-border"></div>
            <span className="px-4 text-xs font-medium text-muted-foreground">
              {new Date(date).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
            </span>
            <div className="h-px flex-grow bg-border"></div>
          </div>
          
          {dateMessages.map((message, index) => {
            // Check if this message is from the same sender as the previous one
            const prevMessage = index > 0 ? dateMessages[index - 1] : null;
            const isContinuation = prevMessage && prevMessage.senderId === message.senderId;
            
            return (
              <div 
                key={message.id} 
                className={cn(
                  "flex items-start mb-4 animate-scale-in",
                  isContinuation ? "mt-1" : "mt-4"
                )}
                style={{
                  animationDelay: `${index * 50}ms`,
                  animationFillMode: 'backwards'
                }}
              >
                {/* Avatar - only show if this is first message in a sequence */}
                {!isContinuation ? (
                  <img 
                    src={message.avatar} 
                    alt={message.senderName} 
                    className="h-9 w-9 rounded-full mr-3 object-cover"
                  />
                ) : (
                  <div className="w-9 mr-3"></div>
                )}
                
                <div className="flex-1">
                  {/* Sender info - only show if this is first message in a sequence */}
                  {!isContinuation && (
                    <div className="flex items-baseline mb-1">
                      <span className="font-medium mr-2">{message.senderName}</span>
                      <span className="text-xs text-muted-foreground">{formatDate(message.timestamp)}</span>
                    </div>
                  )}
                  
                  {/* Message content */}
                  <div className="glass-panel px-4 py-2.5 inline-block max-w-[80%]">
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatInterface;
