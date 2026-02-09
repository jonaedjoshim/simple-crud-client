import React, { use, useState } from 'react';

const Users = ({ userPromise }) => {

    const initialUsers = use(userPromise)
    const [users, setUsers] = useState(initialUsers)

    const handleAddUser = (e) => {
        e.preventDefault()
        const form = e.target
        const name = form.name.value
        const email = form.email.value
        const user = { name, email }
        console.log(user)

        //create user in DB
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    const savedUser = { ...user, _id: data.insertedId };
                    setUsers(prev => [...prev, savedUser]);
                    alert('User added successfully');
                    form.reset();
                }
            });
    };

    const handleDeleteUser = (id) => {
        fetch(`http://localhost:5000/users/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    const remaining = users.filter(u => u._id !== id);
                    setUsers(remaining);
                    alert(`User deleted!`);
                }
            });
    };


    return (
        <div>
            {/* add user */}
            <form onSubmit={handleAddUser} className="fieldset border-2 border-gray-700 mb-6 rounded-box w-lg space-y-2 p-4">

                <label className="label font-medium text-lg text-white">Name</label>
                <input type="text" name='name' className="input w-full border-2 border-gray-700" placeholder="Name" />

                <label className="label font-medium text-lg text-white">Email</label>
                <input type="email" name='email' className="input w-full border-2 border-gray-700" placeholder="Email" />

                <button className="btn btn-ghost border-gray-700 text-base p-5 border-2 mt-4 w-[50%]">Add User</button>
            </form>

            {/* show users */}
            <div className='border-2 border-gray-700 rounded flex flex-col gap-6 p-4'>
                <h2 className='font-semibold text-2xl mx-auto border-b-2 border-dashed border-gray-700 pb-1'>
                    Total User : {users.length}
                </h2>
                {
                    users.map(user =>
                        <div
                            className='border-2 border-gray-700 rounded space-y-4 p-4'
                            key={user._id}>
                            <p>User Name : {user.name}</p>
                            <p>User Email : {user.email}</p>
                            <button
                                onClick={() => handleDeleteUser(user._id)}
                                className='btn btn-ghost border-gray-700 text-base p-5 border-2  w-[50%]'>
                                Delete User
                            </button>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Users;