import { useEffect } from 'react';

function Toast({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`toast ${type === 'success' ? 'toast-success' : 'toast-error'}`}
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '10px 20px',
        borderRadius: '5px',
        color: '#fff',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      }}
    >
      {message}
    </div>
  );
}

export default Toast;
