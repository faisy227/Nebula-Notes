let noteForm = document.querySelector("#noteForm");
let notesTitle = document.querySelector("#noteTitle");
let noteDetails = document.querySelector("#noteContent");
let notesGrid = document.querySelector(".notes-grid");
// const modalOverlay = document.getElementById("modalOverlay");
// const modal = document.getElementById("addNoteModal");

console.log(noteDetails, notesTitle);
// Open modal
function openModal() {
  modalOverlay.classList.add("active");
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

// Close modal (all methods)
function closeModal() {
  modalOverlay.classList.remove("active");
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

noteForm.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

const formValidation = (e) => {
  const category = document.querySelector(".category-btn.active").dataset
    .category;
  let values = [notesTitle.value, noteDetails.value, category];

  console.log(values);
  const allFieldsFilled = values.every((value) => !!value);

  if (allFieldsFilled) {
    alert("success");
    console.log(values);
    readData();
    closeModal();
    // Reset form
    noteForm.reset();
    document.querySelector('.category-btn[data-category="work"]').click();
  } else {
    alert("Error");
  }
};

let data = [];

const readData = () => {
  const isFeatured = document.getElementById("featuredNote").checked;
  const category = document.querySelector(".category-btn.active").dataset
    .category;

  data.push({
    noteTitle: notesTitle.value,
    noteDetail: noteDetails.value,
    category: category,
    isFeatured: isFeatured,
  });

  localStorage.setItem("noteData", JSON.stringify(data));
  createNote();
};

const renderNote = (category, container) => {
  const filteredNotes =
    category === "all"
      ? data
      : data.filter((note) => note.category === category);

  let categoryNotes = filteredNotes.map((item, index) => {
    if (item.isFeatured) {
      return `
           <div class="featured-note" id="${index}">
                        <div class="note-card pinned">
                            <div class="note-card-header">
                                <div class="note-card-title">${item.noteTitle}</div>
                                <div class="note-card-actions">
                                    <div class="note-card-action" onClick="updateNote(this)">
                                          <i class="icon icon-edit"></i>       
                                    </div>
                                    <div class="note-card-action" onClick="deleteNote(this)">
                                        <i class="icon icon-trash"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="note-card-content">
                                <div class="note-card-text">
                                    ${item.noteDetail}
                                </div>
                            </div>
                            <div class="note-card-footer">
                                <div class="note-card-tag">${item.category}</div>
                            </div>
                        </div>
                    </div>`;
    } else {
      return `
          <div class="note-card" id="${index}">
                        <div class="note-card-header">
                            <div class="note-card-title">${item.noteTitle}</div>
                            <div class="note-card-actions">
                                 <div class="note-card-action" onClick="updateNote(this)">
                                    <i class="icon icon-edit"></i>
                                </div>
                                <div class="note-card-action" onClick="deleteNote(this)">
                                    <i class="icon icon-trash"></i>
                                </div>
                            </div>
                        </div>
                        <div class="note-card-content">
                            <div class="note-card-text">
                               ${item.noteDetail}
                            </div>
                        </div>
                        <div class="note-card-footer">
                            <div class="note-card-tag">${item.category}</div>
                        </div>
                    </div>`;
    }
  });
  container.innerHTML = categoryNotes.join("");
};
const createNote = () => {
  notesGrid.innerHTML = "";

  if (document.body.classList.contains("work")) {
    renderNote("work", notesGrid);
  } else if (document.body.classList.contains("idea")) {
    renderNote("ideas", notesGrid);
  } else if (document.body.classList.contains("personal")) {
    renderNote("personal", notesGrid);
  } else if (document.body.classList.contains("all")) {
    renderNote("all", notesGrid);
  }
};

const deleteNote = (e) => {
  e.parentElement.parentElement.parentElement.remove();
//   const target = e.closest(".note-card");
//   const targetId = target.dataset.id;
//   data = data.filter((note) => note.id !== targetId);
 data.splice(e.parentElement.parentElement.parentElement.id, 1);
  localStorage.setItem("noteData", JSON.stringify(data));
};

const updateNote = (e) => {
    
    openModal();
    const noteCard = e.closest(".note-card");
    notesTitle.value = noteCard.querySelector(".note-card-title").textContent.trim();
    noteDetails.value =  noteCard.querySelector(".note-card-text").textContent.trim();
    
   deleteNote(e);
    
};

(() => {
  data = JSON.parse(localStorage.getItem("noteData") || []);
  createNote();
})();
