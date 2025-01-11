import {
    AlertDialogCancel,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
} from "@/components/ui/alert-dialog"
import axios from '@/config/axios'
import { useState } from 'react'
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { toast } from "sonner"
import { Loader } from 'lucide-react'

const CreateSpace: React.FC = () => {
    const [projectName, setProjectName] = useState<string>('')
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
            <AlertDialogHeader className='p-4 border-b'>
                <h1 className="text-3xl">Create your space</h1>
            </AlertDialogHeader>
            <AlertDialogDescription>
                <form onSubmit={createSpace}>
                    <div className="pl-4 pr-4">
                        <div className="mb-4">
                            <label className="block text-gray-400 mb-2" htmlFor="spaceName">Space Name</label>
                            <Input
                                id="spaceName"
                                onChange={(e) => setProjectName(e.target.value)}
                                value={projectName}
                                type="text"
                                placeholder="Enter your space name"
                                disabled={isLoading}
                            />
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
                                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                                    Creating
                                </>
                            ) : (
                                'Create'
                            )}
                        </Button>
                    </AlertDialogFooter>
                </form>
            </AlertDialogDescription>
        </>
    )
}

export default CreateSpace

