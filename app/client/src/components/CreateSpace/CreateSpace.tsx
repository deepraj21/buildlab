import {
    AlertDialogAction,
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

const CreateSpace = () => {
    const [projectName, setProjectName] = useState<string>('')

    function createSpace(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        console.log({ projectName })

        axios.post('/projects/create', {
            name: projectName,
        })
            .then((res) => {
                console.log(res)
                toast.success(res.data.message)
            })
            .catch((error) => {
                console.log(error)
                toast.error(error.response.data.message)
            })
    }
    return (
        <>
            <AlertDialogHeader className='p-4 border-b'>
                <h1 className="text-3xl">Create your space</h1>
            </AlertDialogHeader>
            <AlertDialogDescription>
                <form
                    onSubmit={createSpace}
                >
                    <div className="pl-4 pr-4">
                        <div className="mb-4">
                            <label className="block text-gray-400 mb-2" htmlFor="email">Space Name</label>
                            <Input
                                onChange={(e) => setProjectName(e.target.value)}
                                value={projectName}
                                type="text"
                                placeholder="Enter your space name"
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
                                Create
                            </Button>
                        </AlertDialogAction>
                    </AlertDialogFooter>

                </form>
            </AlertDialogDescription>

        </>
    )
}

export default CreateSpace