import React from 'react';

const Users = () => {

    const handleAddUser = (e) => {
        e.preventDefault()
        const form = e.target
        const name = form.name.value
        const email = form.email.value
        const user = { name, email }
        console.log(user)

        //create user in DB
        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log('data after creating user in the db', data)
            })

    }


    return (
        <div>
            {/* add user */}
            <form onSubmit={handleAddUser} className="fieldset rounded-box w-lg space-y-2 p-4">

                <label className="label font-medium text-lg ">Name</label>
                <input type="text" name='name' className="input w-full" placeholder="Name" />

                <label className="label font-medium text-lg ">Email</label>
                <input type="email" name='email' className="input w-full" placeholder="Email" />

                <button className="btn btn-ghost border-gray-700 text-base p-5 border-2 mt-4 w-[50%]">Add User</button>
            </form>
        </div>
    );
};

export default Users;