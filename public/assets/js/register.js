new Vue({
  el: '#main',
  data: {
    message: '',
    username: '',
    password: '',
    verifypassword: '',
    email: '',
    fullname: '',
    page: 0
    filter: '',
    sortBy: ''
    sortDirection: 0,
    users: []
  },
  methods: {
    async login() {
      this.message = '';

      let { username, password } = this;

      let result = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json());

      if (!result.success) {
        this.message = result.message;
      } else {
        this.message = 'Login success, redirect in 3 seconds';

        setTimeout(() => {
          window.location = '/userlist.html';
        }, 3000);
      }
    },
    async register() {
      this.message = '';

      if (this.password != this.verifypassword) {
        return this.message = 'Password must match verify password!';
      }

      let { username, password, email, fullname } = this;

      if (!username || !password || !email || !fullname) {
        return this.message = 'Please fill all the fields';
      }

      let result = await fetch('/api/user/register', {
        method: 'POST',
        body: JSON.stringify({ username, password, email, fullname }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json());

      if (!result.success) {
        this.message = result.message;
      } else {
        this.message = 'Register success, redirect in 3 seconds';

        setTimeout(() => {
          window.location = '/login.html';
        }, 3000);
      }
    },
    async getUsers() {
      this.message = '';

      let users = await fetch(`/api/search/userList?page=${page}&filter=${filter}&sortBy=${sortBy}&sortDirection=${sortDirection}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json());

      this.users = users;
    }
  },
  mounted() {
    alert();
    getUsers();
  }
});