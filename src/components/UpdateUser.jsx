import React from 'react';
import { useLoaderData } from 'react-router';

const UpdateUser = () => {
    const loadedUser = useLoaderData()
    const handleEditUser = (e) => {
        e.preventDefault()
        const form = e.target
        const name = form.name.value
        const email = form.email.value
        const newUser = { name, email }
        console.log(newUser)

        // update iser info in the db
        fetch(`http://localhost:5000/users/${loadedUser._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    console.log('done update', data)
                    alert('User updated successfully!')
                }
            })
    }

    return (
        <div className='w-11/12 mx-auto flex flex-col items-center mt-25 gap-12 '>
            <form
                onSubmit={handleEditUser}
                className="fieldset border-2 border-gray-700 mb-6 rounded-box w-lg space-y-2 p-4">
                <label
                    className="label font-medium text-lg text-white">
                    Name</label>
                <input
                    type="text"
                    name='name'
                    defaultValue={loadedUser.name}
                    className="input w-full border-2 border-gray-700"
                    placeholder="Name" />

                <label
                    className="label font-medium text-lg text-white">Email</label>
                <input
                    type="email"
                    name='email'
                    defaultValue={loadedUser.email}
                    className="input w-full border-2 border-gray-700"
                    placeholder="Email" />

                <div className='grid grid-cols-3'>
                    <button
                        className="btn btn-ghost border-gray-700 text-base p-5 border-2 mt-4 w-full">
                        Update User</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateUser;