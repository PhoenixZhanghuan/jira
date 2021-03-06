import styled from '@emotion/styled';
import { List, Popover, Typography, Divider, Button } from 'antd';
import React from 'react';
import { useProjects } from 'utils/project';
import { ButtonNoPadding } from "./lib";
import { useProjectModal } from "../screens/project-list/util";

export const ProjectPopover = () => {
    const {open} = useProjectModal();
    const {data: projects, isLoading} = useProjects();
    const pinnedProjects = projects?.filter(project => project.pin);

    const content = <ContentContainer>
        <Typography.Text type={"secondary"}>收藏功能</Typography.Text>
        <List>
            {
                pinnedProjects?.map(project => <List.Item>
                    <List.Item.Meta title={project.name}/>
                </List.Item>)
            }
        </List>
        <Divider />
        <ButtonNoPadding
          onClick={open}
          type={"link"}
        >
            创建项目
        </ButtonNoPadding>
    </ContentContainer>
    return <Popover placement={"bottom"} content={content}>
        <span>
            项目
        </span>
    </Popover>
}

const ContentContainer = styled.div`
    min-width: 30rem;
`
