const soalList = [
  {
    pertanyaan: "Apa kepanjangan dari PIK-R?",
    pilihan: [
      "Pusat Informasi Kesehatan Remaja",
      "Pusat Informasi Konseling Remaja",
      "Pelayanan Informasi Kesehatan Remaja",
      "Pelayanan Informasi Keluarga Remaja"
    ],
    jawaban: "Pusat Informasi Konseling Remaja"
  },
  {
    pertanyaan: "Siapa sasaran utama dari PIK-R?",
    pilihan: ["Anak-anak", "Remaja", "Lansia", "Balita"],
    jawaban: "Remaja"
  },
  // Tambah 28 soal lagi supaya total 30 (contoh dummy)
];

// Generate 28 soal dummy supaya total 30
for(let i=3; i<=30; i++) {
  soalList.push({
    pertanyaan: `Soal nomor ${i}: Apa jawaban yang benar?`,
    pilihan: ["Pilihan A", "Pilihan B", "Pilihan C", "Pilihan D"],
    jawaban: "Pilihan A"
  });
}

let currentSoalIndex = 0;
let waktu = 60 * 60; // 60 menit * 60 detik
const timerEl = document.getElementById('timer');
const soalArea = document.getElementById('soal-area');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Untuk menyimpan jawaban user
let jawabanUser = new Array(soalList.length).fill(null);

function tampilkanSoal(index) {
  const soal = soalList[index];
  let pilihanHtml = '';
  for (let i=0; i < soal.pilihan.length; i++) {
    const option = soal.pilihan[i];
    const checked = jawabanUser[index] === option ? 'checked' : '';
    pilihanHtml += `
      <div class="pilihan">
        <label>
          <input type="radio" name="jawaban" value="${option}" ${checked} onchange="jawabSoal('${option}')">
          ${option}
        </label>
      </div>
    `;
  }
  soalArea.innerHTML = `
    <div class="soal-nomor">Soal ${index+1} dari ${soalList.length}</div>
    <div class="soal-text">${soal.pertanyaan}</div>
    ${pilihanHtml}
  `;

  // Update tombol navigasi
  prevBtn.disabled = (index === 0);
  nextBtn.disabled = (index === soalList.length -1);
}

function jawabSoal(pilihan) {
  jawabanUser[currentSoalIndex] = pilihan;
}

function nextSoal() {
  if(currentSoalIndex < soalList.length -1){
    currentSoalIndex++;
    tampilkanSoal(currentSoalIndex);
  }
}

function prevSoal() {
  if(currentSoalIndex > 0){
    currentSoalIndex--;
    tampilkanSoal(currentSoalIndex);
  }
}

function updateTimer() {
  const menit = Math.floor(waktu / 60);
  const detik = waktu % 60;
  timerEl.textContent = `${menit.toString().padStart(2,'0')}:${detik.toString().padStart(2,'0')}`;
  if(waktu === 0){
    clearInterval(interval);
    alert("Waktu habis! Jawaban akan dikirim otomatis.");
    submitUjian();
  }
  waktu--;
}

function submitUjian() {
  // Di sini bisa disambungkan dengan backend, Formspree, atau simpan lokal.
  // Contoh: tampilkan ringkasan jawaban saja.
  let benar = 0;
  for(let i=0; i<soalList.length; i++){
    if(jawabanUser[i] === soalList[i].jawaban) benar++;
  }
  alert(`Ujian selesai!\nJawaban benar: ${benar} dari ${soalList.length}`);
  // Kembali ke halaman login (atau halaman lain)
  window.location.href = "index.html";
}

// Start timer dan tampilkan soal pertama saat halaman dimuat
tampilkanSoal(currentSoalIndex);
const interval = setInterval(updateTimer, 1000);