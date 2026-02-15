import React, { useEffect, useState } from 'react';

export interface SnackbarMessage {
  id: string;
  message: string;
  duration?: number;
  action?: {
    label: string;
    onPress: any;
  };
}

interface SnackbarProps {
  messages: SnackbarMessage[];
  onDismiss: (id: string) => void;
}

export const SnackbarContainer: React.FC<SnackbarProps> = ({ messages, onDismiss }) => {
  return (
    <div className="pineui-snackbar-container">
      {messages.map((msg) => (
        <SnackbarItem key={msg.id} message={msg} onDismiss={onDismiss} />
      ))}
    </div>
  );
};

const SnackbarItem: React.FC<{ message: SnackbarMessage; onDismiss: (id: string) => void }> = ({
  message,
  onDismiss,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Slide in animation
    setTimeout(() => setVisible(true), 10);

    // Auto dismiss
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onDismiss(message.id), 300);
    }, message.duration || 3000);

    return () => clearTimeout(timer);
  }, [message, onDismiss]);

  return (
    <div className={`pineui-snackbar ${visible ? 'pineui-snackbar--visible' : ''}`}>
      <span className="pineui-snackbar__message">{message.message}</span>
      {message.action && (
        <button className="pineui-snackbar__action" onClick={message.action.onPress}>
          {message.action.label}
        </button>
      )}
    </div>
  );
};
