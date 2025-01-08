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

const Signin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function submitHandler(e: React.FormEvent<HTMLFormElement>) {

        e.preventDefault()

        axios.post('/users/login', {
            email,
            password
        }).then((res) => {
            console.log(res.data)
            toast.success("Logged in successfully")
            localStorage.setItem('token', res.data.token)
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
                <h1 className="text-2xl mt-4 mb-4">Login to space</h1>
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
                        Login
                    </Button>
                </AlertDialogAction>
            </AlertDialogFooter>

        </form>
    )
}

export default Signin