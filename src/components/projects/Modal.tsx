import { useState } from "react";

const init = {
  title: "",
  team: {
    name: "",
    id: "",
    color: "",
  },
};

const Modal = ({ modalHandler, submitHandler, teams }) => {
  const [formData, setFormData] = useState(init);
  const { title, team } = formData || {};
  const [error, setError] = useState(init);
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    if (name === "title") {
      setFormData({
        ...formData,
        [name]: value,
      });
    } else {
      const projectTeam = teams.find((team) => team.id == value);
      const { name, id, color } = projectTeam;
      setFormData({
        ...formData,
        team: {
          name,
          id,
          color,
        },
      });
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    submitHandler(formData);
    setFormData({ ...init });
    setError({ ...init });
  };

  const handleClose = () => {
    setFormData({ ...init });
    setError({ ...init });
    modalHandler();
  };

  return (
    <>
      <div
        id="authentication-modal"
        // tabIndex="-1"
        aria-hidden="true"
        className="bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40 overflow-y-auto overflow-x-hidden w-full"
      >
        <div className="relative p-4 w-full max-w-md h-full mx-auto my-auto pt-20">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              onClick={modalHandler}
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-toggle="authentication-modal"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span onClick={handleClose} className="sr-only">
                Close modal
              </span>
            </button>

            <div className="py-6 px-6 lg:px-8">
              <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                Team form
              </h3>
              <form className="space-y-6" onSubmit={onSubmitHandler}>
                <div>
                  <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Project title <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="title"
                    onChange={(e) => onChangeHandler(e)}
                    value={title}
                    name="title"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  ></textarea>
                </div>

                <div>
                  <label
                    htmlFor="team"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                  >
                    Chose team
                  </label>
                  <select
                    selected={team.id}
                    value={team.id}
                    onChange={(e) => onChangeHandler(e)}
                    id="team"
                    className="bg-gray-50 border focus:border-blue-500 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  >
                    <option>Select one</option>
                    {teams &&
                      teams.length > 0 &&
                      teams.map((team) => (
                        <option key={team.id} value={team.id}>
                          {team.name}
                        </option>
                      ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Submit form
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
