import {http, admin} from "../axios-config";

const getAllByIds = (ids) => {
  return http.post("/badge/badges",ids);
};


const get = id => {
  return http.get(`/badges/${id}`);
};

const approveBadge = id => {
  return http.put(`/badge/approve?id=${id}`);
};

const denyBadge = id => {
  return http.put(`/badge/decline?id=${id}`);
};

const list = () => {
  return http.get(`/badge/list`);
};


const create = (body, headers) => {
  return http.post("/badge/create", body, headers );
};

const update = (id, data) => {
  return http.put(`/badges/${id}`, data);
};

const request = data =>{
    return admin.post("/badges", data)
}
const remove = id => {
  return http.delete(`/badges/${id}`);
};

const removeAll = () => {
  return http.delete(`/badges`);
};

// const findByTitle = title => {
//   return http.get(`/badges?title=${title}`);
// };

const BadgesService = {
  getAllByIds,
  approveBadge,
  denyBadge,
  list,
  get,
  create,
  update,
  remove,
  removeAll,
  request
  // findByTitle
};

export default BadgesService;