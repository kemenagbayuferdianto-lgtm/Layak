import streamlit as st
import fitz          # PDF
import docx          # Word
import pandas as pd  # Excel & CSV
from google import genai



st.set_page_config(
    page_title="AI Assistant KUA",
    page_icon="🤖",
    layout="wide"
)

st.markdown("""
<div style="text-align:center; margin-bottom:25px;">
    <h1 style="color:#0B6E4F; margin-bottom:5px;">
        🤖 AI Assistant KUA
    </h1>
    <p style="font-size:18px; color:#666;">
        Asisten Digital Pelayanan KUA 
    </p>
</div>
""", unsafe_allow_html=True)

# ============================
# API KEY GEMINI
# ============================

client = genai.Client(
    api_key=st.secrets["GEMINI_API_KEY"]
)

MODEL = "gemini-3.1-flash-lite"

# ============================
# CHAT HISTORY
# ============================

if "messages" not in st.session_state:
    st.session_state.messages = []
if "quick_question" not in st.session_state:
    st.session_state.quick_question = None

st.write("Assalamu'alaikum 👋")

st.write("Saya bisa membantu:")

st.markdown("### 💡 Pertanyaan Populer")

col1, col2, col3, col4 = st.columns(4)

with col1:
    if st.button("💍 Syarat Nikah", use_container_width=True):
        st.session_state.messages = []     # Hapus chat lama
        st.session_state.quick_question = "Apa saja syarat pendaftaran nikah?"
        st.rerun()

with col2:
    if st.button("📅 Biaya Nikah", use_container_width=True):
        st.session_state.messages = []     # Hapus chat lama
        st.session_state["quick_question"] = "Berapa biaya nikah di KUA?"
        st.rerun()

with col3:
    if st.button("👨‍⚖️ Jadwal Penghulu", use_container_width=True):
        st.session_state.messages = []     # Hapus chat lama
        st.session_state["quick_question"] = "Bagaimana melihat jadwal penghulu?"
        st.rerun()

with col4:
    if st.button("📄 Legalisasi", use_container_width=True):
        st.session_state.messages = []     # Hapus chat lama
        st.session_state["quick_question"] = "Bagaimana legalisasi buku nikah?"
        st.rerun()


# ============================
# TAMPILKAN CHAT
# ============================

for msg in st.session_state.messages:
    with st.chat_message(msg["role"]):
        st.markdown(msg["content"])

# ============================
# INPUT CHAT
# ============================


# Ambil pertanyaan dari Quick Question
quick = st.session_state.pop("quick_question", None)
# Jika ada Quick Question gunakan itu,
# jika tidak tampilkan chat input
prompt = quick or st.chat_input("Tulis pertanyaan...")


#if prompt is None:
    #prompt = st.chat_input("Tulis pertanyaan...")

# Jika ada pertanyaan
if prompt:

    # Reset quick question agar tidak terkirim terus
    st.session_state.quick_question = None

    st.session_state.messages.append({
        "role": "user",
        "content": prompt
    })

    with st.chat_message("user"):
        st.markdown(prompt)

with st.chat_message("assistant"):

    with st.spinner("🤖 AI Assistant sedang berpikir..."):

        system_prompt = f"""
Kamu adalah AI Assistant resmi KUA Kecamatan Cadasari, Kabupaten Pandeglang.

Tugasmu adalah membantu masyarakat mengenai:
- Persyaratan nikah
- Biaya nikah
- Jadwal penghulu
- Wakaf
- Rujuk
- Legalisasi buku nikah
- Konsultasi keluarga
- Layanan KUA lainnya

Pedoman menjawab:
- Gunakan bahasa Indonesia yang sopan, ramah, dan profesional.
- Berikan jawaban yang jelas dan mudah dipahami.
- Jangan mengarang informasi.
- Jika informasi belum pasti, sarankan pengguna menghubungi petugas KUA Kecamatan Cadasari.

Pertanyaan pengguna:
{prompt}
"""

        response = client.models.generate_content(
            model=MODEL,
            contents=system_prompt
        )

        jawaban = response.text

        st.markdown(jawaban)

    st.session_state.messages.append(
        {
            "role":"assistant",
            "content":jawaban
        }
    )

# ============================
# UPLOAD FILE
# ============================
uploaded_file = st.file_uploader(
    "📂 Upload File",
    type=["pdf", "docx", "xlsx", "csv", "txt"]
)
if uploaded_file is not None:

    st.success(f"✅ File berhasil diupload: {uploaded_file.name}")

    file_type = uploaded_file.name.split(".")[-1].lower()

    isi_file = ""

    # =========================
    # PDF
    # =========================
    if file_type == "pdf":

        pdf = fitz.open(stream=uploaded_file.read(), filetype="pdf")

        for page in pdf:
            isi_file += page.get_text()

        pdf.close()

    # =========================
    # WORD
    # =========================
    elif file_type == "docx":

        doc = docx.Document(uploaded_file)

        for p in doc.paragraphs:
            isi_file += p.text + "\n"

    # =========================
    # EXCEL
    # =========================
    elif file_type == "xlsx":

        df = pd.read_excel(uploaded_file)

        st.dataframe(df)

        isi_file = df.to_string()

    # =========================
    # CSV
    # =========================
    elif file_type == "csv":

        df = pd.read_csv(uploaded_file)

        st.dataframe(df)

        isi_file = df.to_string()

    # =========================
    # TXT
    # =========================
    elif file_type == "txt":

        isi_file = uploaded_file.read().decode("utf-8")

    st.subheader("📄 Isi File")

    st.text_area(
        "",
        isi_file,
        height=300
    )
# ============================
# CLEAR CHAT
# ============================
if st.button("🗑 Hapus Percakapan"):
    st.session_state.messages = []
    st.rerun()

