import api from '../../utils/axios'; 
import { useToast } from 'vue-toastification';
const toast = useToast();
export default {
    namespaced: true,
  state: () => ({
    tasks: [], 
    searchQuery: '', 
    currentPage: 1,
    tasksPerPage: 5, 
  }),

  getters: {
    // Get filtered tasks based on search query
    filteredTasks(state) {
      return state.tasks.filter(task =>
        task.name.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    },
    // Get paginated tasks for the current page
    paginatedTasks(state, getters) {
      const start = (state.currentPage - 1) * state.tasksPerPage;
      const end = start + state.tasksPerPage;
      return getters.filteredTasks.slice(start, end);
    },
   
  },

  mutations: {
    setTasks(state, tasks) {
      state.tasks = tasks;
    },
    setSearchQuery(state, query) {
      state.searchQuery = query;
    },
   
    addTask(state, task) {
      state.tasks.push(task);
    },
    editTasks(state, updatedTask) {
      const index = state.tasks.findIndex(task => task.id === updatedTask.id);
      if (index !== -1) {
        state.tasks.splice(index, 1, updatedTask);
      }
    },
    deleteTasks(state, taskId) {
      const index = state.tasks.findIndex(task => task.id === taskId);
      if (index !== -1) {
        state.tasks.splice(index, 1);
      }
    },
  },

  actions: {
    // Fetch tasks from the API
    
    async fetchTasks({ commit }) {
      try {
        const response = await api.get('/tasks');
        commit('setTasks', response.data.tasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    },

    // Add a new task via API
    async addTask({ commit }, newTask) {
        try {
          const response = await api.post('/tasks', newTask);
          commit('addTask', response.data); 
          toast.success(response.data.message || 'Task added successfully!');
          return true;
        } catch (error) {
          toast.error(error.response.data.error);
          console.error('Error adding task:', error);
        }
      },
      

    // Edit a task via API
    async editTasks({ commit }, updatedTask) {
      try {
        const response = await api.put(`/tasks/${updatedTask.id}`, updatedTask); 
        toast.success(response.data.message || 'Task updated successfully!');
        commit('editTasks', response.data);
        return true;
      } catch (error) {
        toast.error(error.response.data.error);
        console.error('Error editing task:', error);
      }
    },

    // Delete a task via API
    async deleteTasks({ commit }, taskId) {
      try {
        await api.delete(`/tasks/${taskId}`); 
        commit('deleteTasks', taskId);
        toast.success('Task deleted successfully!');
      } catch (error) {
        toast.error(error.response.data.error);
        console.error('Error deleting task:', error);
      }
    },

    // Update search query for task filtering
    updateSearchQuery({ commit }, query) {
      commit('setSearchQuery', query);
    },

  },
};
