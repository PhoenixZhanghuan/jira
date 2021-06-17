import { useEffect } from "react";
import { useAsync } from "screens/utils/use-async";
import { cleanObject } from ".";
import { Project } from "../project-list/list";
import { useHttp } from "./http";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  const {run, ...result} = useAsync<Project[]>();
  
  useEffect(() => {
    run(client('projects', {data: cleanObject(param || {})}))
  }, [param]);

  return result;
}