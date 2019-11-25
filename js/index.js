document.addEventListener('DOMContentLoaded',function(){
  const monsterFormContainer = document.getElementById('create-monster')
  const addMonsterForm = `<form id='create-monster-form'><input id='name' placeholder='name'><input id='age' type='number' placeholder='age'><input id='description' placeholder='description'><button id='create-button'>Create</button></form>`
  monsterFormContainer.insertAdjacentHTML('afterbegin', addMonsterForm)
  let page = 1
  fetchMonsters(page)
  upDownBtns(page)
  createMonsterForm()
})

function renderMonsters(monsters){
  monsters.forEach(monster => renderMonster(monster))
}

function renderMonster(monster){
  const monsterContainer = document.getElementById('monster-container')
  const monsterHTML = `<div><h2>${monster.name}</h2><h4>${monster.age}</h4><p>${monster.description}</p></div>`
  monsterContainer.insertAdjacentHTML('beforeend', monsterHTML)
}

function fetchMonsters(page){
  fetch(`http://localhost:3000/monsters?_limit=50&_page=${page}`)
  .then(response => response.json())
  .then(monsters => renderMonsters(monsters))
}

function createMonsterForm(){
  const submit = document.getElementById('create-monster')
  submit.addEventListener('click', function() {
    event.preventDefault
    postMonster()
  })
}

function postMonster(){
  const monsterForm = document.getElementById('create-monster-form')
  const name = monsterForm.children[0].value
  const age = monsterForm.children[1].value
  const description = monsterForm.children[2].value
  const reqObj = {
    method:"post",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      age: parseFloat(age),
      description: description
    })
  }



  fetch('http://localhost:3000/monsters', reqObj)
  .then(resp => resp.json)
  .then(monster => renderMonster(monster))
}

function upDownBtns(page) {
  const  monsterContainer = document.getElementById('monster-container')
  document.addEventListener('click', function(){
    event.preventDefault()
    monsterContainer.innerHTML = ""
    if (event.target.id === 'forward'){
      fetchMonsters(page+=1)
    }
    else if (event.target.id === 'back'){
      if (page > 1) {
       fetchMonsters(page-=1)
      }
      else {
        monsterContainer.insertAdjacentHTML('beforeend',"<p>No Monsters Live Here</p>")
      }
    }
  })
}


