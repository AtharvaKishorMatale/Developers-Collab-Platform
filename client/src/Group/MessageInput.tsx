
import React, { useState, useRef, useEffect } from 'react';
import { Paperclip, Send } from 'lucide-react';
import { Button } from '../group/ui/button';
import { cn } from '../lib/utils';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
}

const MessageInput = ({ onSendMessage, isLoading = false }: MessageInputProps) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [message]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  return (
    <div className="p-4 border-t border-border/30 bg-card/50 backdrop-blur-xs">
      <div className="flex items-end gap-2">
        <div className="relative flex-1 glass-panel overflow-hidden">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="w-full resize-none bg-transparent px-4 py-3 max-h-[120px] focus:outline-none"
            rows={1}
            disabled={isLoading}
          />
          <Button
            variant="ghost"
            size="icon"
            type="button"
            className="absolute left-1 bottom-1 text-muted-foreground hover:text-foreground"
            aria-label="Attach file"
          >
            <Paperclip className="h-5 w-5" />
          </Button>
        </div>
        <Button
          type="button"
          size="icon"
          className={cn(
            "rounded-full transition-all duration-300 h-10 w-10",
            !message.trim() && "opacity-50 cursor-not-allowed"
          )}
          disabled={!message.trim() || isLoading}
          onClick={handleSendMessage}
        >
          <Send className={cn(
            "h-5 w-5 transition-transform duration-300",
            message.trim() && !isLoading && "scale-110"
          )} />
        </Button>
      </div>
    </div>
  );
};

export default MessageInput;
