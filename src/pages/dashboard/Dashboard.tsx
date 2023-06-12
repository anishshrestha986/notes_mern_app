import { IconDefinition, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "../../styles/dashboard/dashboard.css";
import { useNavigate } from "react-router-dom";
import NoteCard from "../../components/Dashboard/NoteCard";
import { INoteDetail } from "../../types/interfaces/api/note.interface";
import { deleteNote, getOwnNotes } from "../../api/note";
import { useQuery, useQueryClient } from "react-query";
import { QueryKeyString } from "../../types/enums/query-key-string.enum";
import * as toast from "../../utils/toast";
import { Logger } from "../../utils/logger.util";
import Pagination from "../../components/pagination";
import SearchProduct from "../../components/Notes/SearchNote";
import FilterByDate from "../../components/Notes/FilterByDate";
import useModal from "../../hooks/useModal";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import { useCustomMutation } from "../../hooks/useCustomMutation";

interface cardProps {
  icon: IconDefinition;
  label?: string;
}
const logger = new Logger("DashboardProducts");

const Card = ({ icon, label }: cardProps) => {
  return (
    <div className="card-base">
      <div className="icon-base">
        <FontAwesomeIcon icon={icon} />
      </div>
      {label && <div className="label">{label}</div>}
    </div>
  );
};
const Dashboard = () => {
  let user = useAuth().user;
  const [notes, setNotes] = useState<INoteDetail[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalDocs, setTotalDocs] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [filterText, setFilterText] = useState("");
  const [sortByDate, setSortByDate] = useState<string>();
  const [sortType, setSortType] = useState("Descending");
  const { isShowing: showDeleteModal, toggle: toggleDeleteModal } = useModal();
  const { isShowing: showEditModal, toggle: toggleEditModal } = useModal();

  const { refetch } = useQuery(
    [QueryKeyString.NOTE_DATA, currentPage, filterText, sortByDate],
    async () => {
      return await getOwnNotes({
        page: currentPage,
        q: filterText,
        sort: sortByDate,
      }).catch((err: string) => {
        toast.error(err);
      });
    },
    {
      onSuccess: (data) => {
        if (!data) return;
        setNotes(data.docs);
        setTotalDocs(data.totalDocs);
        setTotalPages(data.totalPages);
      },
      onError: (err: any) => {
        toast.error(err?.message);
      },
    }
  );
  const queryClient = useQueryClient();

  useEffect(() => {
    refetch().catch(logger.error);
  }, [currentPage, sortByDate]);

  const { mutate: deleteNoteUser, isLoading } = useCustomMutation({
    api: deleteNote,
    success: "The note has been deleted succesfully .",
    onSuccess: () => {
      queryClient
        .invalidateQueries([QueryKeyString.NOTE_DATA])
        .catch((err) => logger.error(err));
    },
    onError: () => {
      queryClient
        .invalidateQueries([QueryKeyString.NOTE_DATA])
        .catch((err) => logger.error(err));
    },
  });
  const handleDelete = () => {
    try {
      // deleteNote();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="dashboard-main-container">
        <Modal
          isShowing={showDeleteModal}
          hide={toggleDeleteModal}
          title="Are you sure you want to delete this note?"
        >
          <Button onClick={handleDelete}>Delete</Button>
        </Modal>

        <div className="greetings">
          Welcome to<span> Noted </span>,{user?.username}!
        </div>
        <div className="pageFunctions">
          <div className="pageFunction">
            <SearchProduct
              onFilter={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFilterText(e.target.value)
              }
              filterText={filterText}
            />
          </div>
          <div className="pageFunction">
            <FilterByDate
              onOrderClick={(e) => {
                if (e.currentTarget.dataset.value === "createdAt:asc")
                  setSortType("Ascending");
                if (e.currentTarget.dataset.value === "createdAt:desc")
                  setSortType("Descending");
                setSortByDate(e.currentTarget.dataset.value);
              }}
              sortType={sortType}
            />
          </div>
        </div>
        <div className="notes">
          {notes.map((note, key) => (
            <NoteCard
              {...note}
              toggleDeleteModal={toggleDeleteModal}
              toggleEditModal={toggleEditModal}
            />
          ))}
          <Link to="/mynotes/compose">
            <Card icon={faPlus} />
          </Link>

          <div className="paginationContainer">
            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={totalDocs}
              pageSize={8}
              totalPages={totalPages}
              onPageChange={(page) => {
                setCurrentPage(page);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
