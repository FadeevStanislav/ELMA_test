const apiUsers = "https://varankin_dev.elma365.ru/api/extensions/2a38760e-083a-4dd0-aebc-78b570bfd3c7/script/users"
const apiTasks = "https://varankin_dev.elma365.ru/api/extensions/2a38760e-083a-4dd0-aebc-78b570bfd3c7/script/tasks"

const getUsers = async () => {
  const response = await fetch(apiUsers);
  if (response.ok) {
    return response.json();
  } else {
    alert("HTTP-Error: " + response.status);
  }
}

const getTasks = async () => {
  const response = await fetch(apiTasks);
  if (response.ok) {
    return response.json();
  } else {
    alert("HTTP-Error: " + response.status);
  }
}