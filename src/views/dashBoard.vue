<template>
  <div>
    <div class="sidebar bg-dark text-white p-3" :class="{ active: sidebarOpen }">
      <!-- <h3 class="text-white mb-4">TaskBoss</h3> -->
      <logo-view />
      <ul class="nav flex-column">
        <li class="nav-item">
          <a
            href="#"
            class="nav-link text-white"
            :class="{ active: currentView === 'dashboard' }"
            @click="setView('dashboard')"
            >Dashboard</a
          >
        </li>
        <li class="nav-item">
          <a
            href="#"
            class="nav-link text-white"
            :class="{ active: currentView === 'pending' }"
            @click="setView('pending')"
            >Pending Tasks
            <span v-if="pendingTasks > 0" class="badge bg-danger ms-2">{{ pendingTasks }}</span></a
          >
        </li>
        <li class="nav-item">
          <a
            href="#"
            class="nav-link text-white"
            :class="{ active: currentView === 'today' }"
            @click="setView('today')"
          >
            Today's Tasks
            <span v-if="todaysTasks.length > 0" class="badge bg-danger ms-2">{{
              todaysTasks.length
            }}</span>
          </a>
        </li>
        <li class="nav-item">
          <a
            href="#"
            class="nav-link text-white"
            :class="{ active: currentView === 'history' }"
            @click="setView('history')"
            >Task History
            <span
              v-if="userTasks.filter((task) => task.status === 'completed').length > 0"
              class="badge bg-danger ms-2"
              >{{ userTasks.filter((task) => task.status === 'completed').length }}</span
            ></a
          >
        </li>
      </ul>
      <div class="real-profile">
        <div class="profile-section d-flex align-items-center gap-3">
          <div class="profile-img">{{ loggedInUser.name.charAt(0).toUpperCase() }}</div>
          <div>
            <p class="mb-0 text-white">{{ loggedInUser.name }}</p>
            <small class="">{{ loggedInUser.email }}</small>
          </div>
        </div>
        <div class="logout">
          <button-element btn-type="submit" @button-clicked="logOut" btn-text="Logout" />
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="main-content p-4">
      <button class="btn btn-dark mb-4 d-md-none" @click="toggleSidebar">
        {{ sidebarOpen ? 'Close Menu' : 'Open Menu' }}
      </button>

      <!-- Dashboard View -->
      <div v-if="currentView === 'dashboard'">
        <h1 class="display-5 fw-bold text-center mb-5">TaskBoss Dashboard</h1>

        <!-- Metrics Section -->
        <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4 mb-5">
          <div class="col">
            <div class="card metrics h-100 shadow-sm">
              <div class="card-body text-center">
                <h2 class="card-title h5 fw-bold text-muted">Pending Tasks</h2>
                <p class="card-text display-6 text-primary">{{ pendingTasks }}</p>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card metrics h-100 shadow-sm">
              <div class="card-body text-center">
                <h2 class="card-title h5 fw-bold text-muted">Completed Tasks</h2>
                <p class="card-text display-6 text-success">{{ completedTasks }}</p>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card metrics h-100 shadow-sm">
              <div class="card-body text-center">
                <h2 class="card-title h5 fw-bold text-muted">Total Tasks</h2>
                <p class="card-text display-6 custom-purple">{{ userTasks.length }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Add Task Form -->
        <div class="card shadow-sm p-4 mb-5">
          <h2 class="h5 fw-bold mb-3">Add New Task</h2>
          <form @submit.prevent="addTask" class="d-flex flex-column gap-3">
            <input
              v-model="newTask.title"
              type="text"
              placeholder="Enter task title"
              class="form-control"
            />
            <textarea
              v-model="newTask.description"
              placeholder="Enter task description"
              class="form-control"
              rows="3"
            ></textarea>
            <input v-model="newTask.dueDate" type="date" class="form-control" />
            <button type="submit" class="btn btn-primary">Add Task</button>
          </form>
        </div>
      </div>

      <!-- Pending Tasks View -->
      <div v-if="currentView === 'pending' || currentView === 'dashboard'">
        <div class="card shadow-sm p-4 mb-5">
          <h2 class="h5 fw-bold mb-3">Pending Tasks</h2>
          <p
            v-if="!userTasks.filter((task) => task.status === 'pending').length"
            class="text-muted"
          >
            No pending tasks.
          </p>
          <ul v-else class="list-group">
            <li
              v-for="task in userTasks.filter((task) => task.status === 'pending')"
              :key="task.id"
              class="list-group-item"
            >
              <div class="d-flex justify-content-between align-items-start">
                <div>
                  <p class="mb-1 fw-bold">{{ task.title }}</p>
                  <p class="mb-1 text-muted">{{ task.description || 'No description' }}</p>
                  <small class="text-muted">Added: {{ task.date }}</small>
                  <small class="text-muted d-block"
                    >Due: {{ task.dueDate || 'Not specified' }}</small
                  >
                </div>
                <div class="d-flex gap-2">
                  <button @click="completeTask(task.id)" class="btn btn-sm btn-success">
                    Complete
                  </button>
                  <button @click="deleteTask(task.id)" class="btn btn-sm btn-danger">Delete</button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>


<!-- Show only today's tasks when currentView is 'today' -->
<div v-if="currentView === 'today'">
  <div class="card shadow-sm p-4 mb-5">
    <h2 class="h5 fw-bold mb-3">Today's Tasks</h2>
    <p
      v-if="!todaysTasks.length"
      class="text-muted"
    >
      No tasks due today.
    </p>
    <ul v-else class="list-group">
      <li
        v-for="task in todaysTasks"
        :key="task.id"
        class="list-group-item"
      >
        <div class="d-flex justify-content-between align-items-start">
          <div>
            <p class="mb-1 fw-bold">{{ task.title }}</p>
            <p class="mb-1 text-muted">{{ task.description || 'No description' }}</p>
            <small class="text-muted">Added: {{ task.date }}</small>
            <small class="text-muted d-block"
              >Due: {{ task.dueDate || 'Not specified' }}</small
            >
          </div>
          <div class="d-flex gap-2">
            <button @click="completeTask(task.id)" class="btn btn-sm btn-success">
              Complete
            </button>
            <button @click="deleteTask(task.id)" class="btn btn-sm btn-danger">Delete</button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</div>

      <!-- Task History View -->
      <div v-if="currentView === 'history' || currentView === 'dashboard'">
        <div class="card shadow-sm p-4">
          <h2 class="h5 fw-bold mb-3">Task History</h2>
          <p
            v-if="!userTasks.filter((task) => task.status === 'completed').length"
            class="text-muted"
          >
            No completed tasks.
          </p>
          <ul v-else class="list-group">
            <li
              v-for="task in userTasks.filter((task) => task.status === 'completed')"
              :key="task.id"
              class="list-group-item"
            >
              <div class="d-flex justify-content-between align-items-start">
                <div>
                  <p class="mb-1 fw-bold">{{ task.title }}</p>
                  <p class="mb-1 text-muted">{{ task.description || 'No description' }}</p>
                  <small class="text-muted">Completed: {{ task.date }}</small>
                  <small class="text-muted d-block"
                    >Due: {{ task.dueDate || 'Not specified' }}</small
                  >
                </div>
                <button @click="deleteTask(task.id)" class="btn btn-sm btn-danger">Delete</button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // tasks: [
      //   { id: 1, title: "Complete project proposal", description: "Draft proposal for client", status: "pending", date: "2025-06-01", dueDate: "2025-06-05" },
      //   { id: 2, title: "Team meeting", description: "Discuss project updates", status: "completed", date: "2025-05-30", dueDate: "2025-05-30" },
      //   { id: 3, title: "Update website", description: "Revamp homepage design", status: "pending", date: "2025-06-02", dueDate: "2025-06-07" },
      //   { id: 4, title: "Client call", description: "Review project scope", status: "completed", date: "2025-05-29", dueDate: "2025-05-29" },
      // ],
      tasks: JSON.parse(localStorage.getItem('tasks')) || [],
      // loggedInUser: JSON.parse(localStorage.getItem('loggedInUser')),
      loggedInUser: JSON.parse(localStorage.getItem('loggedInUser')),
      allTasks: JSON.parse(localStorage.getItem('tasks')) || [],
      // userTasks: this.allTasks.filter((task) => task.owner === loggedInUser.name),
      newTask: {
        title: '',
        description: '',
        dueDate: '',
        owner: '',
      },
      currentView: 'dashboard',
      sidebarOpen: false,
    }
  },
  computed: {
    userTasks() {
      if (!this.loggedInUser) return []
      return this.tasks.filter((task) => task.owner === this.loggedInUser.name)
    },
    todaysTasks() {
    if (!this.loggedInUser) return [];
    const today = new Date().toISOString().split('T')[0];
    return this.userTasks.filter(task => task.dueDate === today);
  },
    pendingTasks() {
      return this.userTasks.filter((task) => task.status === 'pending').length
    },
    completedTasks() {
      return this.userTasks.filter((task) => task.status === 'completed').length
    },
  },
  methods: {
    saveTask() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks))
    },
    addTask() {
      if (!this.loggedInUser) {
        alert('You must be logged in to add a task.')
        return
      }
      if (this.newTask.title.trim()) {
        this.tasks.push({
          id: this.tasks.length + 1,
          title: this.newTask.title,
          description: this.newTask.description,
          status: 'pending',
          date: new Date().toISOString().split('T')[0],
          dueDate: this.newTask.dueDate || null,
          owner: this.loggedInUser.name, // <-- only runs if loggedInUser exists
        })
        this.saveTask()
        this.newTask = { title: '', description: '', dueDate: '', owner: this.loggedInUser.name }
        console.log(this.newTask.owner)
      }
    },
    completeTask(id) {
      this.tasks = this.tasks.map((task) =>
        task.id === id ? { ...task, status: 'completed' } : task,
      )
      this.saveTask()
    },
    deleteTask(id) {
      this.tasks = this.tasks.filter((task) => task.id !== id)
      this.saveTask()
    },
    setView(view) {
      this.currentView = view
      this.sidebarOpen = false // Close sidebar on mobile after selection
    },
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen
    },
    logOut() {
      localStorage.removeItem('loggedInUser') // Remove user from storage
      alert('logout successful')
      this.loggedInUser = null // Clear from component state
      this.$router.push({ name: 'login' }) // Redirect to login page
    },
  },
}
</script>

<style scoped>
.sidebar {
  min-height: 100vh;
  position: fixed;
  /* position: relative; */
  top: 0;
  left: 0;
  width: 250px;
  z-index: 1000;
  transition: transform 0.3s ease;
}
.active {
  border-bottom: 2px solid #fff;
  /* width: 150px; */
}
.profile-section {
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding-bottom: 1rem;
  padding-top: 1rem;
  margin-bottom: 1rem;

  width: 100%;
}
.real-profile {
  position: absolute;
  bottom: 20px;
  width: 100%;
}
.profile-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #6f42c1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: white;
}
.sidebar.hidden {
  transform: translateX(-250px);
}
.main-content {
  margin-left: 250px;
  transition: margin-left 0.3s ease;
}
@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-250px);
  }
  .sidebar.active {
    transform: translateX(0);
  }
  .main-content {
    margin-left: 0;
  }
}
.custom-purple {
  color: #6f42c1;
}
.metrics {
  transition: all 0.5s;
}
.metrics:hover {
  transform: scale(1.1);
}
</style>
