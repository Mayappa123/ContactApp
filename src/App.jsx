import axios from 'axios';
import { useEffect, useState } from 'react';
import { AiFillPhone } from 'react-icons/ai';
import { BiSolidContact } from 'react-icons/bi';
import { FaUser, FaUserEdit, FaUserMinus, FaUserNinja } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const fetchUsers = async () => {
  try {
    const data = await axios.get('https://jsonplaceholder.typicode.com/users');
    return data.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

const addUser = async (newUser) => {
  try {
    const response = await axios.post(
      'https://jsonplaceholder.typicode.com/users',
      newUser
    );
    return response.data;
  } catch (error) {
    console.error('Error adding user:', error);
    return null;
  }
};

const removeUser = async (userId) => {
  try {
    await axios.delete(`https://jsonplaceholder.typicode.com/users/${userId}`);
    return userId;
  } catch (error) {
    console.error('Error removing user:', error);
    return null;
  }
};

const updateUser = async (userId, updatedUserData) => {
  try {
    const response = await axios.put(
      `https://jsonplaceholder.typicode.com/users/${userId}`,
      updatedUserData
    );
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    return null;
  }
};

const App = () => {
  // State variables
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ email: '', name: '', phone: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // State to hold the selected user for editing
  // Function to handle adding or updating a user
  const handleAddUser = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (!selectedUser) {
      // If selectedUser is null, it means it's a new user being added
      const user = await addUser(newUser);
      setIsLoading(false);
      if (user) {
        setUsers((prev) => [user, ...prev]);
        setNewUser({ email: '', name: '', phone: '' });
      }
    } else {
      // If selectedUser is not null, it means it's an existing user being updated
      const updatedUser = await updateUser(selectedUser.id, newUser);
      setIsLoading(false);
      if (updatedUser) {
        const updatedUsers = users.map((user) => {
          if (user.id === selectedUser.id) {
            return updatedUser;
          }
          return user;
        });
        setUsers(updatedUsers);
        setSelectedUser(null); // Reset selectedUser after updating
        setNewUser({ email: '', name: '', phone: '' });
      }
    }
  };
  // Function to handle updating user data when editing
  const handleUpdateUser = (user) => {
    setSelectedUser(user);
    setNewUser(user);
  };
  // Function to handle removing a user
  const handleRemoveUser = async (user) => {
    setDeleteLoading(true);
    const { id } = user;
    const removedUserId = await removeUser(id);
    if (removedUserId) {
      setDeleteLoading(false);
      setUsers(users.filter((user) => user.id !== removedUserId));
    }
  };
  // Fetch users when component mounts
  useEffect(() => {
    const getUsers = async () => {
      const data = await fetchUsers();
      setUsers(data);
    };
    getUsers();
  }, []);
  return (
    <div className='p-10 h-screen flex flex-col'>
      {/* Toast notifications for user actions */}
      {deleteLoading && (
        <div className='toast toast-top toast-end'>
          <div className='alert alert-error'>
            <span>User Deleted</span>
          </div>
        </div>
      )}
      {isLoading && (
        <div className='toast toast-top toast-end'>
          <div className='alert alert-info'>
            <span>{selectedUser ? 'User Updated' : 'User Added'}</span>
          </div>
        </div>
      )}
      {/* Header */}
      <h1 className='text-5xl font-bold mb-8 flex items-center justify-center gap-4'>
        <BiSolidContact /> <span>Contact App</span>
      </h1>
      {/* Main content */}
      <div className='flex w-full gap-4 overflow-hidden '>
        {/* User list */}
        <div className='flex flex-col gap-4 w-full overflow-y-scroll pr-3'>
          {users.length <= 0 ? (
            <p>No Users</p>
          ) : (
            users.map((user) => (
              <div
                className='stats shadow bg-neutral rounded-md flex-shrink-0 '
                key={user.id}
              >
                <div className='stat'>
                  <div className='stat-figure'>
                    <div className='join'>
                      {/* Buttons for editing and deleting user */}
                      <button
                        className='btn join-item '
                        onClick={() => handleUpdateUser(user)}
                      >
                        <FaUserEdit className='text-secondary-content' />
                      </button>
                      <button
                        className='btn join-item'
                        onClick={() => handleRemoveUser(user)}
                      >
                        <FaUserMinus className='text-error' />
                      </button>
                    </div>
                  </div>
                  {/* User details */}
                  <div className='stat-title'>{user.email}</div>
                  <div className='stat-value text-2xl flex items-center gap-2'>
                    <FaUserNinja className='text-accent' />
                    <span>{user.name}</span>
                  </div>
                  <div className='stat-desc'>{user.phone}</div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className='divider divider-horizontal'></div>
        {/* Form for adding or updating user */}
        <div className='bg-neutral w-full rounded-lg px-6 py-4'>
          <h2 className='text-3xl text-center font-bold my-6'>
            {' '}
            {selectedUser ? 'Update User' : 'Add User'}
          </h2>
          <form
            className='flex flex-col gap-4 w-2/3 m-auto'
            onSubmit={handleAddUser}
          >
            <label className='input input-bordered flex items-center gap-2'>
              <MdEmail />
              <input
                type='email'
                className='grow'
                placeholder='Email'
                required
                name='email'
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
              />
            </label>
            <label className='input input-bordered flex items-center gap-2'>
              <FaUser />
              <input
                type='text'
                className='grow'
                placeholder='Username'
                required
                name='name'
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
              />
            </label>
            <label className='input input-bordered flex items-center gap-2'>
              <AiFillPhone />
              <input
                type='tel'
                className='grow'
                placeholder='Phone'
                required
                name='phone'
                value={newUser.phone}
                onChange={(e) =>
                  setNewUser({ ...newUser, phone: e.target.value })
                }
              />
            </label>
            {isLoading ? (
              <button type='submit' className='btn btn-secondary'>
                <span className='loading loading-spinner'></span>
                {selectedUser ? 'Updating User' : 'Adding User'}
              </button>
            ) : (
              <button type='submit' className='btn btn-secondary'>
                {selectedUser ? 'Update User' : 'Add User'}
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
export default App;
