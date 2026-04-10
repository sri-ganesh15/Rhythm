import './App.css'
import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react'
import { Button } from './components/ui/button'

function App() {
  return (
    <>
    <h1>This is my app.</h1>
      <header>
        <Show when="signed-out">
          <Button>
          <SignInButton />
          </Button>
          <Button>
          <SignUpButton />
          </Button>
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </header>
    </>
  )
}

export default App