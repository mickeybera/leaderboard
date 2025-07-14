import { useState } from 'react';
import toast from 'react-hot-toast';

const UserSelector = ({ users, selectedUser, setSelectedUser, onUserAdded }) => {
  const [newUser, setNewUser] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const addUser = async () => {
    if (!newUser.trim()) return;
    try {
      await fetch("https://leaderboard-1-fufn.onrender.com/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newUser }),
      });
      toast.success("User added!");
      setNewUser('');
      onUserAdded();
    } catch (err) {
      toast.error("Failed to add user");
    }
  };

  const deleteUser = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this user?");
    if (!confirm) return;

    try {
      await fetch(`https://leaderboard-1-fufn.onrender.com${id}`, {
        method: "DELETE",
      });
      toast.success("User deleted!");
      if (selectedUser === id) setSelectedUser(null);
      onUserAdded();
    } catch (err) {
      toast.error("Failed to delete user");
    }
  };

  return (
    <div className="space-y-4 relative">
      {/* Custom dropdown */}
      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="w-full border rounded p-2 text-left bg-white hover:cursor-pointer"
        >
          {selectedUser
            ? users.find((u) => u._id === selectedUser)?.name || 'Select User'
            : 'Select User'}
        </button>

        {dropdownOpen && (
          <ul className="absolute z-10 bg-white border rounded w-full mt-1 max-h-60 overflow-y-auto shadow">
            {users.map((user) => (
              <li key={user._id} className="flex justify-between items-center px-4 py-2 hover:bg-gray-100">
                <span
                  className="cursor-pointer w-full"
                  onClick={() => {
                    setSelectedUser(user._id);
                    setDropdownOpen(false);
                  }}
                >
                  {user.name}
                </span>
                <button
                  className="text-red-500 text-xs ml-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteUser(user._id);
                  }}
                >
                  delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Add new user */}
      <div className="flex gap-2">
        <input
          type="text"
          className="border rounded p-2 w-full"
          placeholder="Add new user"
          value={newUser}
          onChange={(e) => setNewUser(e.target.value)}
        />
        <button onClick={addUser} className="bg-blue-500 text-white px-4 py-2 rounded hover:cursor-pointer">
          Add
        </button>
      </div>
    </div>
  );
};

export default UserSelector;
