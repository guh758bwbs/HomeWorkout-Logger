let records = JSON.parse(localStorage.getItem('workoutRecords')) || [];
function addRecord() {
  const name = document.getElementById('exercise').value;
  const reps = document.getElementById('reps').value;
  
  if (!name || !reps) {
    alert("種目名と回数を入力してください");
    return;
  }
  
  const newRecord = {
    id: Date.now(),
    date: new Date().toLocaleDateString(),
    name: name,
    reps: reps
  };
  
  records.unshift(newRecord); // 先頭に追加
  saveAndRender();
  
  // 入力欄をクリア
  document.getElementById('reps').value = "";
}

function deleteRecord(id) {
  records = records.filter(r => r.id !== id);
  saveAndRender();
}

function saveAndRender() {
  localStorage.setItem('workoutRecords', JSON.stringify(records));
  render();
}

function render() {
  const container = document.getElementById('historyContainer');
  container.innerHTML = "";
  
  // 日付ごとにグループ化
  const groups = records.reduce((acc, obj) => {
    acc[obj.date] = acc[obj.date] || [];
    acc[obj.date].push(obj);
    return acc;
  }, {});
  
  for (const date in groups) {
    const dateSection = document.createElement('div');
    dateSection.innerHTML = `<div class="date-header">${date}</div>`;
    
    groups[date].forEach(record => {
      const item = document.createElement('div');
      item.className = 'history-item';
      item.innerHTML = `
      <span>${record.name}: <strong>${record.reps}</strong></span>
      <button class="delete-btn" onclick="deleteRecord(${record.id})">削除</button>
      `;
      dateSection.appendChild(item);
    });
    container.appendChild(dateSection);
  }
}

// 初回読み込み
render();
