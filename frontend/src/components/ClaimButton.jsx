const ClaimButton = ({ onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={` hover:cursor-pointer w-full py-3 font-bold rounded ${disabled ? 'bg-gray-400' : 'bg-green-500 text-white hover:bg-green-600'}`}
    >
      🎯 Claim Random Points
    </button>
  );
};

export default ClaimButton;
