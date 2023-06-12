import { AxiosResponse } from "axios";
import { METHODS } from "../enums/axios.enum";
import createApi from "../utils/axios";
import {
  INoteDetail,
  INoteRequest,
  INotesResponse,
} from "../types/interfaces/api/note.interface";

const noteApi = createApi("/note");

export const getNotes = async (pageParams?: {
  page?: number;
  limit?: number;
}): Promise<INotesResponse> => {
  const { data } = (await noteApi({
    method: METHODS.GET,
    url: "/",
    params: {
      limit: pageParams?.limit ? pageParams.limit : 10,
      page: pageParams?.page ? pageParams.page : 1,
    },
  })) as AxiosResponse<INotesResponse>;
  return data;
};

export const getOwnNotes = async (pageParams?: {
  page?: number;
  limit?: number;
  q?: string;
  sort?: string;
}): Promise<INotesResponse> => {
  console.log("hello");
  const { data } = (await noteApi({
    method: METHODS.GET,
    url: "/me",
    params: {
      limit: pageParams?.limit ? pageParams.limit : 8,
      page: pageParams?.page ? pageParams.page : 1,
      q: pageParams?.q ? pageParams.q : "",
      sort: pageParams?.sort ? pageParams.sort : "",
    },
  })) as AxiosResponse<INotesResponse>;
  return data;
};

export const deleteNote = async (id: string) => {
  await noteApi({
    url: `/${id}`,
    method: METHODS.DELETE,
  });
};

export const noteById = async (noteId: string): Promise<INoteDetail> => {
  const { data } = (await noteApi({
    url: `/${noteId}`,
    method: METHODS.GET,
  })) as AxiosResponse<INoteDetail>;
  return data;
};

export const createNote = async (
  formBody: INoteRequest
): Promise<INoteDetail> => {
  const { data } = (await noteApi({
    data: formBody,
    headers: {
      "Content-Type": "application/json",
    },
    url: "/",
    method: METHODS.POST,
  })) as AxiosResponse<INoteDetail>;
  return data;
};
