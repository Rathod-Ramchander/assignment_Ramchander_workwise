export default function Seat({ number, isBooked, isSelected, onClick }) {
    return (
      <div
        className={`w-10 h-10 flex items-center justify-center rounded cursor-pointer ${
          isBooked ? 'bg-yellow-400 cursor-not-allowed' : isSelected ? 'bg-blue-400' : 'bg-green-400'
        }`}
        onClick={onClick}
      >
        {number}
      </div>
    );
  }
  