<template>
  <div class="preview">
    <button @click="downloadPDF">📄 Download as PDF</button>

    <div id="pdf-content">
      <!-- 📘 Cover Page -->
      <div class="cover-page">
        <h1>📘 My Portfolio</h1>
        <h2>{{ userName }}</h2>
        <p>{{ userDescription }}</p>
      </div>

      <!-- 📄 Rendered Sections -->
      <div v-for="(content, section) in parsedData" :key="section" class="section">
        <h3>{{ section }}</h3>
        <div v-html="renderMarkdown(content)" class="markdown-output"></div>
      </div>

      <!-- 📬 Footer -->
      <div class="footer">
        <p>📧 Contact: {{ userEmail }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { marked } from 'marked';
import html2pdf from 'html2pdf.js';

export default {
  data() {
    return {
      parsedData: {},
      userName: '',
      userDescription: '',
      userEmail: ''
    };
  },
  created() {
    const raw = this.$route.query.data;
    const coverRaw = this.$route.query.cover;

    this.parsedData = raw ? JSON.parse(decodeURIComponent(raw)) : {};
    const cover = coverRaw ? JSON.parse(decodeURIComponent(coverRaw)) : {};

    this.userName = cover.userName || '';
    this.userDescription = cover.userDescription || '';
    this.userEmail = cover.userEmail || '';
  },
  methods: {
    renderMarkdown(md) {
      return marked(md);
    },
    downloadPDF() {
      const element = document.getElementById('pdf-content');
      const opt = {
        margin: 0.5,
        filename: 'vuepressfolio.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
      };
      html2pdf().set(opt).from(element).save();
    }
  }
};
</script>

<style scoped>
.preview {
  padding: 2rem 1rem;
  max-width: 800px;
  margin: auto;
  font-family: 'Segoe UI', sans-serif;
  text-align: center;
}

button {
  margin-bottom: 20px;
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
}

button:hover {
  background-color: #0056b3;
}

#pdf-content {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.08);
}

.cover-page {
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #ddd;
}

.cover-page h1 {
  font-size: 2rem;
  color: #007BFF;
  margin-bottom: 0.5rem;
}

.cover-page h2 {
  font-size: 1.5rem;
  color: #333;
}

.cover-page p {
  font-size: 1rem;
  color: #666;
  margin-top: 0.5rem;
}

.section h3 {
  font-size: 1.25rem;
  color: #222;
  margin-top: 2rem;
}

.markdown-output {
  text-align: left;
  background: #f7f7f7;
  padding: 0.75rem;
  border-radius: 8px;
  margin-top: 0.5rem;
  white-space: pre-wrap;
  font-size: 1rem;
}

.footer {
  margin-top: 2rem;
  text-align: center;
  color: #555;
  font-style: italic;
  border-top: 1px dashed #ccc;
  padding-top: 1rem;
}
</style>
