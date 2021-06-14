import React, { useState, useEffect } from "react";
import qs from 'qs';
import { List } from "./list";
import { SearchPanel } from "./search_panel";
import { cleanObject, useMount, useDebounce } from "screens/utils";
import { useHttp } from "screens/utils/http";
import styled from '@emotion/styled';

export const ProjectListScreen = () => {
  const [users, setUsers] = useState([]);
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debounceParam = useDebounce(param, 200);
  const [list, setList] = useState([]);
  const client = useHttp();

  useEffect(() => {
    client('projects', {data: cleanObject(debounceParam)}).then(setList)
  }, [debounceParam]);

  useMount(() => {
    client('users').then(setUsers)
  })
  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem
`
