import {
    AlertDialogCancel,
    AlertDialogFooter,
} from "@/components/ui/alert-dialog"
import axios from '@/config/axios'
import { useState } from 'react'
import { Input } from "../../ui/input"
import { Button } from "../../ui/button"
import { toast } from "sonner"
import { Loader2, Eye, EyeOff } from 'lucide-react'

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        try {
            const res = await axios.post('/users/register', {
                email,
                password
            })
            console.log(res.data)
            toast.success("Account created successfully")
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('spaceUser', res.data.user.email)
        } catch (err: any) {
            toast.error(err.response?.data?.message || "An error occurred during registration")
            console.log(err.response?.data)
        } finally {
            setIsLoading(false)
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    return (
        <form onSubmit={submitHandler}>
            <div className="pl-4 pr-4">
                <h1 className="text-2xl mt-4 mb-4">Create Account</h1>
                <div className="mb-4">
                    <label className="block text-gray-400 mb-2" htmlFor="email">Email</label>
                    <Input
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        disabled={isLoading}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-400 mb-2" htmlFor="password">Password</label>
                    <div className="relative">
                        <Input
                            onChange={(e) => setPassword(e.target.value)}
                            type={showPassword ? "text" : "password"}
                            id="password"
                            placeholder="Enter your password"
                            disabled={isLoading}
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                            disabled={isLoading}
                        >
                            {showPassword ? (
                                <EyeOff className="h-5 w-5" aria-hidden="true" />
                            ) : (
                                <Eye className="h-5 w-5" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>
            </div>
            <AlertDialogFooter className="border-t p-4">
                <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
                <div className="flex flex-grow"></div>
                <Button
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Registering...
                        </>
                    ) : (
                        'Register'
                    )}
                </Button>
            </AlertDialogFooter>
        </form>
    )
}

export default Signup

