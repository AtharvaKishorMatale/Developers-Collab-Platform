import { useState } from 'react';
import { useSelector } from "react-redux";
import ChatRoomList from './ChatRoomlist';
import ChatRoom from './chatroom';

const Chat = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [selectedRoom, setSelectedRoom] = useState(null);

  console.log('Current user:', currentUser); 
  // Handle room selection
  const handleSelectRoom = (room) => {
    console.log('Selected room:', room); // Debug log
    setSelectedRoom(room);
  };

  // Handle back to room list
  const handleBackToList = () => {
    console.log('Going back to room list'); // Debug log
    setSelectedRoom(null);
  };

//   // Show loading if no current user
//   if (!currentUser || !currentUser._id) {
//     return (
//       <div className="h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading user data...</p>
//         </div>
//       </div>
//     );
//   }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {selectedRoom ? (
        <ChatRoom 
          room={selectedRoom} 
          currentUser={currentUser} 
          onBack={handleBackToList} 
        />
      ) : (
        <ChatRoomList 
          currentUser={currentUser} 
          onSelectRoom={handleSelectRoom} 
        />
      )}
    </div>
  );
};

export default Chat;