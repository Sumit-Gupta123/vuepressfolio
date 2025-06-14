<template>
  <div class="tabs-container">
    <!-- 📁 Section Tabs -->
    <div class="tabs">
      <button
        v-for="section in sectionKeys"
        :key="section"
        :class="{ active: section === currentSection }"
        @click="selectSection(section)"
      >
        {{ section }}
      </button>
    </div>

    <!-- 📝 Markdown Editor for Selected Section -->
    <Editor
      v-model="sectionContent[currentSection]"
      @update:modelValue="saveContent(currentSection)"
    />
  </div>
</template>

<script>
import Editor from './Editor.vue';

const DEFAULT_CONTENT = {
  About: '# About Me\nWrite about yourself here...',
  Projects: '# Projects\n- Project 1\n- Project 2',
  Skills: '# Skills\n- Vue.js\n- JavaScript',
  Contact: '# Contact\nEmail: your@email.com'
};

export default {
  components: { Editor },
  data() {
    return {
      currentSection: 'About',
      sectionContent: { ...DEFAULT_CONTENT }
    };
  },
  computed: {
    sectionKeys() {
      return Object.keys(this.sectionContent);
    }
  },
  created() {
    this.loadContent();
  },
  methods: {
    selectSection(section) {
      this.currentSection = section;
    },
    saveContent() {
      localStorage.setItem('vuepressfolio', JSON.stringify(this.sectionContent));
    },
    loadContent() {
      const saved = localStorage.getItem('vuepressfolio');
      if (saved) {
        this.sectionContent = JSON.parse(saved);
      }
    }
  }
};
</script>

<style scoped>
.tabs-container {
  margin-top: 1rem;
}

.tabs {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-bottom: 1rem;
}

button {
  padding: 10px 18px;
  font-size: 1rem;
  background-color: #e0e0e0;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s, color 0.3s;
}

button:hover {
  background-color: #d0d0d0;
}

button.active {
  background-color: #007BFF;
  color: white;
}
</style>
