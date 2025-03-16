<template>
  <div class="flex justify-end mb-6 space-x-4">
    <h2 class="text-3xl font-semibold text-gray-800">
      Hi, <span class="text-green-500">{{ display_name }}</span>
    </h2>
    <button @click="signOut" class="px-6 py-3 text-white transition duration-200 bg-red-500 rounded-lg hover:bg-red-700">
      Sign Out
    </button>
  </div>
  <div class="px-4 mx-auto py max-w-7xl sm:px-6 lg:px-8">
    <h1 class="mb-6 text-3xl font-extrabold text-gray-900">Tasks</h1>
   <!-- Search Bar -->
   <div class="mb-4">
    <input
      type="text"
      v-model="searchQuery"
      @input="updateSearchQuery"
      placeholder="Search tasks"
      class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
    <!-- Add Task Button -->
    <div class="mb-6">
      <button @click="openModal" class="px-6 py-3 text-white transition duration-200 bg-blue-500 rounded-lg hover:bg-blue-700">
        Add Task
      </button>
    </div>

    <!-- Tasks Table -->
    <div class="overflow-x-auto bg-white rounded-lg shadow-md">
      <table class="min-w-full table-auto">
        <thead class="text-gray-700 bg-blue-100">
          <tr>
            <th class="px-6 py-3 text-sm font-medium text-left">ID</th>
            <th class="px-6 py-3 text-sm font-medium text-left">Task Name</th>
            <th class="px-6 py-3 text-sm font-medium text-left">Start Date</th>
            <th class="px-6 py-3 text-sm font-medium text-left">End Date</th>
            <th class="px-6 py-3 text-sm font-medium text-left">Remarks</th>
            <th class="px-6 py-3 text-sm font-medium text-left">Status</th>
            <th class="px-6 py-3 text-sm font-medium text-left">Actions</th>
          </tr>
        </thead>
        <tbody class="text-sm text-gray-600">
          <tr v-if="paginatedTasks.length === 0">
            <td colspan="7" class="px-6 py-3 text-center text-gray-500">You have not added a Task</td>
          </tr>
          <tr v-for="(task, index) in paginatedTasks" :key="task.id" class="border-t hover:bg-gray-50">
            <td class="px-6 py-3">{{ index + 1 }}</td>
            <td class="px-6 py-3">{{ task.name }}</td>
            <td class="px-6 py-3">{{ task.start_date }}</td>
            <td class="px-6 py-3">{{ task.end_date }}</td>
            <td class="px-6 py-3">{{ task.remarks }}</td>
            <td class="px-6 py-3"
               :class="{
                        'text-green-500': task.status === 'Completed',
                        'text-red-500': task.status === 'Pending',
                        'text-yellow-500': task.status === 'In-Progress'
                      }">
              {{ task.status }}
           </td>
           <td class="px-6 py-3">
            <div class="flex items-center gap-4"> 
              <button @click="editTask(task)" class="text-blue-500 hover:text-blue-700">Edit</button>
              <button @click="deleteTask(task.id)" class="text-red-500 hover:text-red-700">Delete</button>
            </div>
          </td>
          
          </tr>
        </tbody>
        
        
      </table>
    </div>

    <!-- Modal for Add/Edit Task -->
    <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 class="mb-4 text-xl font-semibold text-gray-800">{{ editMode ? 'Edit' : 'Add' }} Task</h2>
        <form @submit.prevent="submitForm">
          <div class="mb-4">
            <label for="taskName" class="block text-sm font-medium text-gray-700">Task Name</label>
            <input type="text" v-model="taskForm.name" id="taskName" class="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div class="mb-4">
            <label for="startDate" class="block text-sm font-medium text-gray-700">Start Date</label>
            <input type="date" v-model="taskForm.start_date" id="startDate" class="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div class="mb-4">
            <label for="endDate" class="block text-sm font-medium text-gray-700">End Date</label>
            <input type="date" v-model="taskForm.end_date" id="endDate" class="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div class="mb-4">
            <label for="remarks" class="block text-sm font-medium text-gray-700">Remarks</label>
            <textarea v-model="taskForm.remarks" id="remarks" class="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" rows="4"></textarea>
          </div>
          <div class="mb-4">
            <label for="status" class="block text-sm font-medium text-gray-700">Status</label>
            <select v-model="taskForm.status" id="status" class="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="In-Progress">In Progress</option>
            </select>
          </div>
          <div class="flex justify-end space-x-4">
            <button @click="closeModal" type="button" class="text-gray-500 hover:text-gray-700">Cancel</button>
            <button type="submit" class="px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-700">{{ editMode ? 'Save Changes' : 'Add Task' }}</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  data() {
    return {
      display_name: localStorage.getItem('first_name'),
      searchQuery: '',
      isModalOpen: false,
      editMode: false,
      taskForm: {
        name: '',
        startDate: '',
        endDate: '',
        remarks: '',
        status: 'pending',
      },
    };
  },
  computed: {
    
    ...mapGetters('tasks', ['paginatedTasks']),
  },
  methods: {
    ...mapActions('tasks', ['fetchTasks', 'addTask', 'editTasks', 'deleteTasks','updateSearchQuery']),
    openModal() {
      this.isModalOpen = true;
      this.editMode = false;
      this.resetForm();
    },
    closeModal() {
      this.isModalOpen = false;
    },
    editTask(task) {

      this.editMode = true;
      this.taskForm = { ...task };  // Populate form with task data
      this.isModalOpen = true;
     
    },
    async submitForm() {
      let success = false;
        if (this.editMode) {
          success = await this.editTasks({ ...this.taskForm });
        } else {
          success = await this.addTask({ ...this.taskForm });
        }

        if (success) {
          this.closeModal(); 
          this.fetchTasks(); // Refresh task list
        }
     
        },
   

    async deleteTask(taskId) {
      await this.deleteTasks(taskId);
    },
    updateSearchQuery() {
        this.$store.dispatch('tasks/updateSearchQuery', this.searchQuery);
      },
    resetForm() {
      this.taskForm = {
        name: '',
        startDate: '',
        endDate: '',
        remarks: '',
        status: 'pending',
      };
    },
    async signOut() {
      await this.$store.dispatch('user/signOut');  // Call the signOut action from the user module
      this.$router.push('/auth/sign-in'); 
    },
  },
  
  mounted() {
  
     this.fetchTasks();
  }
};
</script>
