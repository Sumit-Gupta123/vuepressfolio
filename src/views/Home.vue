<template>
  <div class="home">
    <h1>VuePressfolio</h1>

    <!-- 🔤 Cover Page Info -->
    <div class="cover-form">
      <input v-model="userName" placeholder="Your Name" />
      <input v-model="userEmail" placeholder="Your Email" />
      <textarea v-model="userDescription" placeholder="Short Description" rows="3"></textarea>
    </div>

    <!-- 📝 Markdown Tabs -->
    <SectionTabs ref="sectionTabs" />

    <!-- 🔁 Go to Preview -->
    <button @click="goToPreview">Preview Portfolio</button>
  </div>
</template>

<script>
import SectionTabs from '../components/SectionTabs.vue';

export default {
  components: { SectionTabs },
  data() {
    return {
      userName: '',
      userEmail: '',
      userDescription: ''
    };
  },
  created() {
    const saved = localStorage.getItem('coverInfo');
    if (saved) {
      const { userName, userEmail, userDescription } = JSON.parse(saved);
      this.userName = userName;
      this.userEmail = userEmail;
      this.userDescription = userDescription;
    }
  },
  methods: {
    goToPreview() {
      const markdownData = this.$refs.sectionTabs.sectionContent;
      const coverInfo = {
        userName: this.userName,
        userEmail: this.userEmail,
        userDescription: this.userDescription
      };

      // Save to localStorage
      localStorage.setItem('coverInfo', JSON.stringify(coverInfo));

      // Pass data to preview via query
      this.$router.push({
        name: 'Preview',
        query: {
          data: encodeURIComponent(JSON.stringify(markdownData)),
          cover: encodeURIComponent(JSON.stringify(coverInfo))
        }
      });
    }
  }
};
</script>

<style>
.home {
  padding: 3rem 1rem;
  max-width: 800px;
  margin: auto;
  font-family: 'Segoe UI', sans-serif;
}

h1 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #333;
}

.cover-form {
  background: #f9f9f9;
  border: 1px solid #ddd;
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

input, textarea {
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
  transition: border 0.3s;
  width: 100%;
  box-sizing: border-box;
}

input:focus, textarea:focus {
  border-color: #007BFF;
}

button {
  background-color: #007BFF;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
}

button:hover {
  background-color: #0056b3;
}
</style>


