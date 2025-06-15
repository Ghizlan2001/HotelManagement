import { Link } from 'react-router-dom';
import './RoomTypeCard.css';

const RoomTypeCard = ({ roomType }) => {
  return (
    <div className="room-type-card">
      <div className="room-type-image">
        <img 
          src={getRoomTypeImage(roomType.room_type_name)} 
          alt={roomType.room_type_name} 
        />
      </div>
      <div className="room-type-details">
        <h3>{roomType.room_type_name}</h3>
        <p className="price">From ${roomType.base_price}/night</p>
        <p className="description">{truncateDescription(roomType.description)}</p>
        <Link to="/reservation" className="btn">Book Now</Link>
      </div>
    </div>
  );
};

// Helper function to get appropriate image based on room type
const getRoomTypeImage = (roomTypeName) => {
  const images = {
    'Single': 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=800&fit=crop',
    'Double': 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=800&fit=crop',
    'Suite': 'https://i.pinimg.com/originals/11/51/2a/11512a8491b4d8d105c2c8aa0ba76cc8.jpg',
    'Deluxe': 'https://www.maldives-bonus.com/media/cache/03/0e/030e809a442c7f5c5081119bdc7b023c.jpg',
    'Family': 'https://architizer-prod.imgix.net/media/1445885914592MiamiEdition_Page_17.jpg'
  };
  
  return images[roomTypeName] || 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60';
};

// Helper function to truncate long descriptions
const truncateDescription = (desc) => {
  if (desc.length > 100) {
    return desc.substring(0, 100) + '...';
  }
  return desc;
};

export default RoomTypeCard;