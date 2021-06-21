import React, { useState, useEffect } from "react";
import { List } from "./list";
import { SearchPanel } from "./search_panel";
import { useDebounce, useDocumentTitle } from "screens/utils";
import styled from '@emotion/styled';
import { Typography } from "antd";
import { useProjects } from "screens/utils/project";
import { useUsers } from "screens/utils/user";

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debounceParam = useDebounce(param, 200);
  const {isLoading, error, data: list} = useProjects(debounceParam);
  const {data: users} = useUsers()

  useDocumentTitle('项目列表', false)
  
  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? <Typography.Text type={"danger"}>{error.message}</Typography.Text> : null}
      <List loading={isLoading} users={users || []} dataSource={list || []} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem
`
