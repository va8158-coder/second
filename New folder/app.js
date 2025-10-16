/* Vibrant Todo - app.js */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const taskInput = $('#taskInput');
const addBtn = $('#addBtn');
const taskList = $('#taskList');
const stats = document.querySelector('.stats');
const filters = $$('.filter');
const clearCompleted = $('#clearCompleted');

let tasks = [];
let currentFilter = 'all';

function save(){
  localStorage.setItem('vibrant-todo', JSON.stringify(tasks));
}
function load(){
  const raw = localStorage.getItem('vibrant-todo');
  tasks = raw ? JSON.parse(raw) : [];
}

function uid(){return Date.now().toString(36)+Math.random().toString(36).slice(2,8)}

function render(){
  taskList.innerHTML = '';
  const visible = tasks.filter(t => {
    if(currentFilter === 'all') return true;
    if(currentFilter === 'active') return !t.completed;
    return t.completed;
  });

  visible.forEach(t => {
    const li = document.createElement('li');
    li.className = 'task';
    li.dataset.id = t.id;

    const check = document.createElement('button');
    check.className = 'check' + (t.completed ? ' completed' : '');
    check.innerHTML = t.completed ? '✓' : '';

    const text = document.createElement('div');
    text.className = 'text';
    const label = document.createElement('div');
    label.className = 'label';
    label.textContent = t.text;
    if(t.completed) label.style.textDecoration = 'line-through';
    const meta = document.createElement('div');
    meta.className = 'meta';
    meta.textContent = new Date(t.created).toLocaleString();
    text.appendChild(label);
    text.appendChild(meta);

    const actionsWrap = document.createElement('div');
    actionsWrap.className = 'actions';

    const editBtn = document.createElement('button');
    editBtn.className = 'icon-btn';
    editBtn.innerHTML = '✎';

    const delBtn = document.createElement('button');
    delBtn.className = 'icon-btn';
    delBtn.innerHTML = '🗑';

    actionsWrap.appendChild(editBtn);
    actionsWrap.appendChild(delBtn);

    li.appendChild(check);
    li.appendChild(text);
    li.appendChild(actionsWrap);

    // events
    check.addEventListener('click', () => {
      t.completed = !t.completed; save(); render();
    });

    delBtn.addEventListener('click', () => {
      tasks = tasks.filter(x => x.id !== t.id); save(); render();
    });

    editBtn.addEventListener('click', () => {
      const input = document.createElement('input');
      input.value = t.text;
      input.className = 'editable';
      text.replaceChild(input, label);
      input.focus();
      input.setSelectionRange(input.value.length, input.value.length);

      function commit(){
        const v = input.value.trim();
        if(v) t.text = v;
        text.replaceChild(label, input);
        save(); render();
      }
      input.addEventListener('blur', commit);
      input.addEventListener('keydown', (e) => { if(e.key === 'Enter') input.blur(); if(e.key==='Escape'){ text.replaceChild(label,input); } });
    });

    taskList.appendChild(li);
  });

  stats.textContent = `${tasks.filter(t=>!t.completed).length} tasks left`;
}

function addTask(txt){
  txt = txt.trim(); if(!txt) return;
  tasks.unshift({id: uid(), text: txt, completed:false, created: Date.now()});
  save(); render();
}

addBtn.addEventListener('click', () => { addTask(taskInput.value); taskInput.value=''; taskInput.focus(); });
taskInput.addEventListener('keydown', (e) => { if(e.key === 'Enter'){ addTask(taskInput.value); taskInput.value=''; }});

filters.forEach(f => f.addEventListener('click', () => {
  filters.forEach(x=>x.classList.remove('active'));
  f.classList.add('active');
  currentFilter = f.dataset.filter;
  render();
}));

clearCompleted.addEventListener('click', ()=>{ tasks = tasks.filter(t=>!t.completed); save(); render(); });

// initial
load(); render();

// small keyboard shortcut to add sample tasks (for demo)
document.addEventListener('keydown', (e)=>{ if(e.ctrlKey && e.key==='k'){ addTask('Sample Task ' + (Math.random()*100).toFixed(0)); } });
