import { useEffect } from "react";
import { useAsync } from "utils/use-async";
import { cleanObject } from ".";
import { Project } from "../screens/project-list/list";
import { useHttp } from "./http";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  const {run, ...result} = useAsync<Project[]>();
  
  const fetchProjects = () => client('projects', {data: cleanObject(param || {})});

  useEffect(() => {
    run(fetchProjects(), {
      retry: fetchProjects
    })
    //eslint-disable-next-line
  }, [param]);

  return result;
}

export const useEditProject = () => {
   const {run, ...asyncResult} = useAsync();
   const client = useHttp();
   const mutate = (params: Partial<Project>) => {
      return run(client(`projects/${params.id}`, {
        data: params,
        method: 'PATCH'
      }))
   }

   return {
     mutate,
     ...asyncResult
   }
}

export const useAddProject = () => {
  const {run, ...asyncResult} = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<Project>) => {
     return run(client(`projects/${params.id}`, {
       data: params,
       method: 'POST'
     }))
  }

  return {
    mutate,
    ...asyncResult
  }
}