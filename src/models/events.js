/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-cycle */
import {
  storage,
}
  from './storage';
import {
  dom,
}
  from './DOM';
import createProject from './projectCreator';
import {
  createToDoItem,
} from './toDoItemCreator';

const events = function events() {
  function createProjectProcedure() {
    const nameProject = document.getElementById('nameProject').value;
    if (nameProject !== '') {
      const ourStore = storage();
      const newProject = createProject(nameProject);
      ourStore.addProject(newProject);
      const closeModalButton = document.getElementById('closeModalButton1');
      closeModalButton.click();
      document.getElementById('projectForm').reset();
      dom().showProject();
    }
  }

  function getFormValues() {
    const titleTodo = document.getElementById('titleTodo').value;
    const descTodo = document.getElementById('descriptionTodo').value;
    const notesTodo = document.getElementById('notesTodo').value;
    const dueDateTodo = document.getElementById('dueDateTodo').value;
    const priorityTodo = document.querySelector('input[name="priority"]:checked').value;
    const todoValues = [titleTodo, descTodo, dueDateTodo, priorityTodo, notesTodo];
    return todoValues;
  }

  function createTodoProcedure() {
    const todoValues = getFormValues();
    if (!todoValues.includes('')) {
      const newTodo = createToDoItem(todoValues[0], todoValues[1], todoValues[2], todoValues[3], todoValues[4]);
      const projectId = document.getElementById('projectId').innerHTML;
      const ourStore = storage();
      ourStore.addTodo(projectId, newTodo);
      const closeModalButton = document.getElementById('closeModalButton');
      closeModalButton.click();
      document.getElementById('todoForm').reset();
      dom().showTodos(projectId);
    }
  }

  const editTodoProcedure = function editTodoProcedure() {
    const projectId = document.getElementById('projectId').innerHTML;
    const todoId = document.getElementById('todoId').innerHTML;
    const todoValues = getFormValues();
    const editedTodo = {
      title: todoValues[0],
      description: todoValues[1],
      dueDate: todoValues[2],
      priority: todoValues[3],
      notes: todoValues[4],
    };
    const ourStore = storage();
    ourStore.updateTodo(projectId, todoId, editedTodo);
    document.getElementById('todoId').innerHTML = '';
    const closeModalButton = document.getElementById('closeModalButton');
    closeModalButton.click();
    document.getElementById('todoForm').reset();
    dom().showTodos(projectId);
  };

  const createDefaultProject = function createDefaultProject() {
    const newProject = createProject('Default Project');
    const ourStore = storage();
    ourStore.addProject(newProject);
    // eslint-disable-next-line no-restricted-globals
    location.reload();
    document.getElementById('projectForm').reset();
  };


  return {
    editTodoProcedure,
    createTodoProcedure,
    createProjectProcedure,
    createDefaultProject,
  };
};

export {
  events,
};