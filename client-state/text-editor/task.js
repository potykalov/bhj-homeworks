function saveEditorText(editorEl) {
  localStorage.setItem('text', editorEl.value);
}

function clearEditorText(editorEl) {
  localStorage.removeItem('text');
  editorEl.value = '';
}

function init() {
  const editorEl = document.querySelector('#editor');
  const clearButtonEl = document.querySelector('#clear');

  if (localStorage.getItem('text')) {
    editorEl.value = localStorage.getItem('text');
  }

  editorEl.addEventListener('input', () => {
    saveEditorText(editorEl);
  });

  clearButtonEl.addEventListener('click', () => {
    clearEditorText(editorEl);
  });
}

init();
