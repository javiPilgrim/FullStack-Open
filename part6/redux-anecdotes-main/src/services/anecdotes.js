import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getId = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const createNew = async (content, votes) => {
  const object = { content, votes };
  const response = await axios.post(baseUrl, object);
  return response.data;
};

const addVote = async (id) => {
  const chosenAnecdote = await getId(id);
  const object = {
    content: chosenAnecdote.content,
    votes: chosenAnecdote.votes + 1,
  };
  const response = await axios.put(`${baseUrl}/${id}`, object);
  return response.data;
};

export default { getAll, createNew, getId, addVote };
