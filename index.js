import { addUser, getUsers, updateUser, deleteUser } from './utils.js';

const formAdd = document.querySelector('#form-add');
const tableUsers = document.querySelector('#table-users');

formAdd.addEventListener('submit', event => {
  event.preventDefault();
  const inputName = document.querySelector('#input-name');
  addUser(inputName.value);
  inputName.value = '';
  render();
});

const render = () => {
  tableUsers.innerHTML = `
    <thead>
      <tr>
        <th>Name</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      ${getUsers()
        .map(
          user => `
            <tr>
              <td>${user.name}</td>
              <td>
                <button class="button-edit" data-id="${user.id}">Edit</button>
                <button class="button-delete" data-id="${user.id}">Delete</button>
              </td>
            </tr>
          `
        )
        .join('')}
    </tbody>
  `;

  const buttonsEdit = document.querySelectorAll('.button-edit');
  buttonsEdit.forEach(button => {
    button.addEventListener('click', event => {
      const userId = event.target.getAttribute('data-id');
      const user = getUsers().find(user => user.id === userId);
      const newName = prompt('Enter new name:', user.name);
      updateUser(userId, newName);
      render();
    });
  });

  const buttonsDelete = document.querySelectorAll('.button-delete');
  buttonsDelete.forEach(button => {
    button.addEventListener('click', event => {
      const userId = event.target.getAttribute('data-id');
      deleteUser
