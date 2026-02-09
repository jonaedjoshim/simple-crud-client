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
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log('data after creating user in the db', data)
                if (data.insertedId) {
                    newUser._id = data.insertedId
                    const newUsers = [...users, newUser]
                    setUsers(newUsers)
                    alert('user added successfully')
                    form.reset()
                }
            })

    }


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
                {
                    users.map(user => <p className='border-2 border-gray-700 rounded p-4' key={user._id}>User Name : {user.name}<br />User Email : {user.email} <br/><button className='btn btn-ghost border-gray-700 text-base p-5 border-2 mt-4 w-[50%]'>Delete User</button></p>)
                }
            </div>
        </div>
    );
};

export default Users;