
import axios from '@/config/axios'
import { useState } from 'react'
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { toast } from "sonner"
import { Loader } from 'lucide-react'
import { Textarea } from '../ui/textarea'

const CreateSpace: React.FC = () => {
    const [projectName, setProjectName] = useState<string>('')
    const [projectDescription, setProjectDesciption] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    function createSpace(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        axios.post('/projects/create', {
            name: projectName,
        })
            .then((res) => {
                console.log(res)
                toast.success("Space created successfully")
            })
            .catch((error) => {
                console.log(error)
                toast.error(error.response.data)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    return (
        <>
            <form onSubmit={createSpace}>
                <div className="">
                    <div className="mb-4">
                        <Input
                            id="spaceName"
                            onChange={(e) => setProjectName(e.target.value)}
                            value={projectName}
                            type="text"
                            placeholder="Enter your space name"
                            disabled={isLoading}
                        />
                    </div>
                    <div className="mb-4">
                        <Textarea
                            id="spaceDescription"
                            onChange={(e) => setProjectDesciption(e.target.value)}
                            value={projectDescription}
                            placeholder="Enter your space description"
                            disabled={isLoading}
                            className='min-h-[80px] max-h-[80px]'
                        />
                    </div>
                </div>
                <div className="flex flex-grow"></div>
                <Button
                    type="submit"
                    disabled={isLoading}
                    className='w-full'
                >
                    {isLoading ? (
                        <>
                            <Loader className="mr-2 h-4 w-4 animate-spin" />
                            Creating
                        </>
                    ) : (
                        'Create'
                    )}
                </Button>
            </form>
        </>
    )
}

export default CreateSpace

