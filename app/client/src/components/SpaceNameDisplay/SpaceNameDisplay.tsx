import { useEffect, useState } from 'react'
import axios from '@/config/axios'
import { useNavigate } from 'react-router-dom';

interface Project {
    _id: string;
    name: string;
    users: { length: number };
}

const SpaceNameDisplay = () => {
    const navigate = useNavigate()
    const [project, setProject] = useState<Project[]>([])
    useEffect(() => {
        axios.get('/projects/all').then((res) => {
            setProject(res.data.projects)

        }).catch(err => {
            console.log(err)
        })

    }, [])
  return (
    <div>
          {
              project.map((project) => (
                  <div key={project._id}
                      onClick={() => {
                          navigate(`/space/${project._id}`, {
                              state: { project }
                          })
                      }}
                    className='p-2'
                    >
                      {/* <h2
                          className='font-semibold'
                      >{project.name}</h2> */}
                      <div className="md:w-16 md:h-16 w-10 h-10 flex items-center justify-center my-auto rounded-[10px] dark:bg-zinc-900 bg-stone-100">
                          <span className="text-sm text-foreground">
                              {project.name.slice(0, 2).toUpperCase()}
                          </span>
                      </div>

                      {/* <div className="flex gap-2">
                          <p> <small> <i className="ri-user-line"></i> Collaborators</small> :</p>
                          {project.users.length}
                      </div> */}

                  </div>
              ))
          }
    </div>
  )
}

export default SpaceNameDisplay