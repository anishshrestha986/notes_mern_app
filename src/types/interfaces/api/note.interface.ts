import ReactQuill from "react-quill";

interface IAuthorDetail {
  _id: string;
  username: string;
}
interface INoteDetail {
  _id: string;
  title: string;
  content: ReactQuill.Value;
  deleted: boolean;
  author: IAuthorDetail;
  createdAt: string;
  updatedAt: string;
}
interface INoteRequest {
  title: string;
  content: ReactQuill.Value;
}
interface INotesResponse {
  docs: INoteDetail[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

interface INoteCardFields {
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt?: string;
}
export type {
  IAuthorDetail,
  INoteDetail,
  INoteRequest,
  INotesResponse,
  INoteCardFields,
};
