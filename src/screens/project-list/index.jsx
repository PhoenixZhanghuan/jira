import React from "react";
import qs from 'qs';
import { useState, useEffect } from "react";
import { List } from "./list";
import { SearchPanel } from "./search_panel";
import { cleanObject, useMount, useDebounce } from "screens/utils";
const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  const [users, setUsers] = useState([]);
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debounceParam = useDebounce(param, 1000);
  const [list, setList] = useState([]);
  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debounceParam))}`).then(async (response) => {
      if (response.ok) {
        setList(await response.json());
      }
    });
  }, [debounceParam]);

  useMount(() => {
    fetch(`${apiUrl}/users`).then(async (response) => {
        if (response.ok) {
          setUsers(await response.json());
        }
      });
  })
  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </div>
  );
};
