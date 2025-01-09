import {
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogFooter,
} from "@/components/ui/alert-dialog"
import axios from '@/config/axios'
import { useState } from 'react'
import { Input } from "../../ui/input"
import { Button } from "../../ui/button"
import { toast } from "sonner"

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function submitHandler(e: React.FormEvent<HTMLFormElement>) {

        e.preventDefault()

        axios.post('/users/register', {
            email,
            password
        }).then((res) => {
            console.log(res.data)
            toast.success(res.data.message)
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('spaceUser', res.data.user)
        }).catch((err) => {
            toast.error(err.response.data.message)
            console.log(err.response.data)
        })
    }
    return (
        <form
            onSubmit={submitHandler}
        >
            <div className="pl-4 pr-4">
                <h1 className="text-2xl mt-4 mb-4">Create Account</h1>
                <div className="mb-4">
                    <label className="block text-gray-400 mb-2" htmlFor="email">Email</label>
                    <Input
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-400 mb-2" htmlFor="password">Password</label>
                    <Input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                    />
                </div>
            </div>
            <AlertDialogFooter className="border-t p-4">
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <div className="flex flex-grow"></div>
                <AlertDialogAction>
                    <Button
                        type="submit"
                    >
                        Register
                    </Button>
                </AlertDialogAction>
            </AlertDialogFooter>
        </form>
    )
}

export default Signup