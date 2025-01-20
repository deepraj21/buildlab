import axios from '@/config/axios'
import { useState } from 'react'
import { Input } from "../../ui/input"
import { Button } from "../../ui/button"
import { toast } from "sonner"
import { Eye, EyeOff, Loader } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Signin = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        try {
            const res = await axios.post('/users/login', {
                email,
                password
            })
            console.log(res.data)
            toast.success("👋🏻 Welcome back buddy!!")
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('buildlabUser', res.data.user.email)
            navigate('/')
        } catch (err: any) {
            toast.error(err.response?.data?.errors || "An error occurred during login")
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
                
                <div className="mb-4">
                    <label className="block text-gray-400 mb-2" htmlFor="email">Email</label>
                    <Input
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        required
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
                            required
                            disabled={isLoading}
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                            disabled={isLoading}
                        >
                            {showPassword ? (
                                <EyeOff className="h-5 w-5 text-[#20B8CD]/50" aria-hidden="true" />
                            ) : (
                                    <Eye className="h-5 w-5 text-[#20B8CD]" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>
            </div>
            <div className="pr-4 pl-4">
                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full"
                >
                    {isLoading ? (
                        <>
                            <Loader className="mr-2 h-4 w-4 animate-spin" />
                        </>
                    ) : (
                        'SignIn'
                    )}
                </Button>
            </div>
        </form>
    )
}

export default Signin

