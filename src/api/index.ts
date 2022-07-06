import axios from "axios";
import { getSession } from "../utils";
import request from "../utils/request";

type IData = {
  username: string;
  password: string;
};

export const login = (data: IData) => {
  return axios({
    url: "/logined",
    method: "post",
    data: { data },
  });
};

export const students = (params?: { name: string }) => {
  return request({
    url: "/students",
    method: "get",
    headers: {
      token: getSession("token"),
    },
    params,
  });
};

export const deleteStudents = (id: number) => {
  return request({
    url: `/students/${id}`,
    method: "get",
    headers: {
      token: getSession("token"),
    },
  });
};

export const info = (params?: { name: string }) => {
  return request({
    url: `/info`,
    method: "get",
    headers: {
      token: getSession("token"),
    },
    params,
  });
};

export interface InfoData {
  id?: string;
  name: string;
  sex: string;
  age: string;
  father: string;
  mather: string;
  address: string;
  time: string;
  phone: string;
}

export const handleInfo = (method: string, data: InfoData) => {
  return request({
    url: `/info`,
    method,
    headers: {
      token: getSession("token"),
    },
    data,
  });
};

export const deleteInfo = (id: string) => {
  return request({
    url: `/info/${id}`,
    method: "delete",
    headers: {
      token: getSession("token"),
    },
  });
};

export interface Iworkinfo {
  page: number;
  size: number;
}

export const workinfo = (params?: Iworkinfo) => {
  return request({
    url: `/works`,
    method: "get",
    headers: {
      token: getSession("token"),
    },
    params,
  });
};
