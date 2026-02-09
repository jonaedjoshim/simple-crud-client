import './App.css'
import Users from './components/Users'

const userPromise = fetch('http://localhost:5000/users').then(res => res.json())

function App() {

  return (
    <div className='w-11/12 mx-auto flex flex-col items-center mt-25 gap-12'>
      <h2 className='font-bold text-3xl uppercase'>Simple Crud Operation</h2>
      <Users userPromise={userPromise} />
    </div>
  )
}

export default App
