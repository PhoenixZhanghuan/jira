import { useMemo } from "react"
import { useUrlQueryParam } from "utils/url"
import { useProject } from "../../utils/project";

export const useProjectsSearchParams = () => {
    const [param, setParam] = useUrlQueryParam(['name', 'personId'])
    return [
        useMemo(() => ({...param, personId: Number(param.personId)|| undefined}), [param]),
        setParam
    ] as const
}

export const useProjectModal = () => {
    const [{projectCreate}, setProjectModalOpen] = useUrlQueryParam([
      'projectCreate'
    ]);

    const [{editingProjectId}, setEditingProjectId] = useUrlQueryParam([
      'editingProjectId'
    ])

    const {data: editingProject, isLoading} = useProject(Number(editingProjectId))

    const open = () => setProjectModalOpen({projectCreate: true})
    const close = () => {
        setProjectModalOpen({projectCreate: undefined})
        setEditingProjectId({editingProjectId: undefined})
    }
    const startEdit = (id: number) => setEditingProjectId({editingProjectId: id})

    return {
        projectModalOpen: projectCreate === 'true' || Boolean(editingProject),
        open,
        close,
        startEdit,
        editingProject,
        isLoading
    }
}
