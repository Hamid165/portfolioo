// ==========================================
// PORTFOLIO DATA — Edit this file to update your portfolio content
// ==========================================

export const personalInfo = {
  name: "HAMID SABIRIN",
  title: "Full-Stack Developer",
  subtitle: "Mobile & Web Developer",
  tagline: "Crafting digital experiences with passion and precision",
  bio: `Saya adalah seorang mahasiswa jurusan Teknik Informatika di Telkom University Purwokerto, dengan bekal latar belakang pendidikan dari SMK Telkom Purwokerto. Perjalanan saya di dunia teknologi berawal dari ketertarikan mendalam pada rekayasa perangkat lunak, yang kini terus saya kembangkan melalui eksplorasi di bidang pemrograman web dan mobile.`,
  email: "hamidskj123@gmail.com",
  phone: "+62 812-xxxx-xxxx",
  location: "Indonesia",
  social: {
    github: "https://github.com/Hamid165",
    linkedin: "https://www.linkedin.com/in/hamid-sabirin-ba1965247/",
    instagram: "https://www.instagram.com/hamid_sabirin/",
    tiktok: "https://www.tiktok.com/@yucann16",
  },
};

export const stats = [
  { number: "10+", label: "Projects Completed" },
  { number: "2+", label: "Years Experience" },
  { number: "5+", label: "Technologies" },
  { number: "100%", label: "Passion" },
];

export const education = [
  {
    id: 1,
    degree: "Teknik Informatika",
    school: "TELKOM UNIVERSITY PURWOKERTO",
    year: "Sekarang",
    description: "Pemrograman Web, Basis Data, Algoritma & Struktur Data, UI/UX.",
    gpa: "",
  },
  {
    id: 2,
    degree: "Rekayasa Perangkat Lunak (RPL)",
    school: "SMK TELKOM PURWOKERTO",
    year: "2023",
    description: "Pemograman Web, Mobile App, Desktop.",
    gpa: "",
  },
];

export const experience = [
  {
    id: 1,
    title: "Magang - UI/UX Design",
    company: "PT CAZH TEKNOLOGI INOVASI",
    year: "Previous",
    description: "• Membuat dan merancang desain antarmuka pengguna (UI/UX) untuk berbagai produk digital.\n• Mengubah ide dan kebutuhan pengguna menjadi prototipe yang interaktif.",
  },
  {
    id: 2,
    title: "Web Developer dan UI/UX Designer (WFH/Remote)",
    company: "VINIX7",
    year: "Recent",
    description: "• Membuat ide untuk dijadikan sebuah website dengan studi kasus di lingkungan sendiri.\n• Membuat sebuah desain UI/UX dari ide studi kasus.\n• Mengimplementasikan ide dan UI/UX ke dalam website.",
  },
  {
    id: 3,
    title: "Magang",
    company: "CV ELDEV SOLUSINDO",
    year: "Previous",
    description: "• Mengembangkan sistem website untuk menghitung keluar-masuk barang pada perusahaan di Papua.\n• Berkolaborasi dalam tim programmer untuk merancang, mengembangkan, dan menguji fitur backend.\n• Membuat dokumentasi teknis untuk aplikasi yang dibangun.",
  }
];

export const activities = [
  {
    id: 1,
    title: "Komunikasi dan Informasi (Kominfo)",
    organization: "Himpunan Mahasiswa Informatika Purwokerto",
    year: "Juli 2025 - Des 2025",
    description: "• Melakukan planing postingan desain untuk sosial media.\n• Mengeksekusi desain dari planing.\n• Melakukan dokumentasi setiap acara kegiatan."
  },
  {
    id: 2,
    title: "Publikasi Desain dan Dokumentasi",
    organization: "Pekan Olahraga & Seni Mahasiswa 2025",
    year: "Okt 2025",
    description: "• Melakukan dokumentasi kegiatan secara langsung selama acara.\n• Mendesain poster dan logo untuk kebutuhan publikasi media sosial.\n• Berkoordinasi dengan divisi lain."
  },
  {
    id: 3,
    title: "Publikasi Desain dan Dokumentasi",
    organization: "Welcoming Party Informatics 2025",
    year: "Sep 2025",
    description: "• Melakukan dokumentasi kegiatan secara langsung.\n• Mendesain poster dan logo untuk publikasi medsos.\n• Koordinasi antar divisi untuk kelancaran acara."
  },
  {
    id: 4,
    title: "Publikasi Desain dan Dokumentasi",
    organization: "Entrepreneurship Talkshow 2025",
    year: "Apr 2025",
    description: "• Melakukan dokumentasi acara.\n• Mendesain poster dan logo publikasi.\n• Berkoordinasi untuk memastikan alur kegiatan lancar."
  }
];

export const skills = [
  {
    category: "Technical",
    icon: "💻",
    items: [
      { name: "HTML/CSS", level: 90 },
      { name: "JavaScript", level: 85 },
      { name: "PHP", level: 80 },
      { name: "Laravel", level: 80 },
      { name: "MySQL", level: 85 },
      { name: "Flutter", level: 75 },
      { name: "Firebase", level: 75 },
      { name: "Figma", level: 70 },
    ],
  },
  {
    category: "Soft Skills",
    icon: "🤝",
    items: [
      { name: "Komunikasi Tim", level: 90 },
      { name: "Manajemen Waktu", level: 85 },
      { name: "Problem Solving", level: 88 },
    ],
  },
  {
    category: "Interests",
    icon: "🌟",
    items: [
      { name: "Web Development", level: 95 },
      { name: "Desain UI", level: 85 },
      { name: "Teknologi", level: 90 },
      { name: "Dokumentasi Kreatif", level: 80 },
      { name: "Dokumentasi Kegiatan", level: 80 },
    ],
  },
];

export const projects = [
  {
    id: 1,
    title: "Sistem Informasi Panti Asuhan",
    description: "Aplikasi dan website terintegrasi untuk mengelola data panti asuhan, donasi, dan informasi kegiatan panti asuhan secara multi-platform.",
    image: "/projects/1.png",
    tags: ["Laravel", "Flutter", "MySQL"],
    github: "#",
    demo: "#",
    year: "2024",
    color: "#6c63ff",
  },
  {
    id: 2,
    title: "Lost & Found App",
    description: "Platform untuk melaporkan dan mencari barang yang hilang di lingkungan kampus atau area publik.",
    image: "/projects/2.png",
    tags: ["Laravel", "MySQL"],
    github: "#",
    demo: "#",
    year: "2024",
    color: "#00d4ff",
  },
  {
    id: 3,
    title: "E-Commerce Tanaman Hidroponik",
    description: "Platform toko online khusus untuk menjual berbagai macam tanaman hidroponik dan perlengkapannya.",
    image: "/projects/3.png",
    tags: ["Laravel", "MySQL"],
    github: "#",
    demo: "#",
    year: "2023",
    color: "#ff6b9d",
  },
  {
    id: 4,
    title: "Web Kasir Jualan (POS)",
    description: "Sistem Point of Sales berbasis web untuk membantu pencatatan transaksi penjualan secara real-time.",
    image: "/projects/4.png",
    tags: ["React"],
    github: "#",
    demo: "#",
    year: "2023",
    color: "#ffd93d",
  },
  {
    id: 5,
    title: "Note & Task Manager App",
    description: "Aplikasi mobile untuk mencatat tugas harian dan mengatur jadwal agar lebih produktif.",
    image: "/projects/5.jpg",
    tags: ["Flutter"],
    github: "#",
    demo: "#",
    year: "2022",
    color: "#ff8b3d",
  },
];

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Activities", href: "#activities" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];
