class ButtonMethods {
  constructor(mainURL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/') {
    this.mainURL = mainURL;
  }

  refresh = () => {
    const refresh = document.querySelector('.refresh button');
    refresh.addEventListener('click', this.recieveData);
  }

  submit = () => {
    const form = document.forms[0];
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.querySelector('#name');
      const scoreInput = document.querySelector('#yourScore');
      const data = { user: nameInput.value, score: scoreInput.value };
      this.sendData(data);
    });
  }

  sendRequest = async (apiURL, data) => {
    const url = apiURL;
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data),
    });
    return response.json();
  }

  connect = async (gameName) => {
    const game = { name: gameName };
    const response = await this.sendRequest(this.mainURL, game);
    this.saveID(response);
  };

  saveID = (data) => {
    const dataArray = data.result.split(' ');
    dataArray.pop();
    window.localStorage.id = dataArray.pop();
  };

  sendData = async (data) => {
    if (!window.localStorage.id) {
      await this.connect('Mohamed Saleh game');
    }
    const url = `${this.mainURL}${window.localStorage.id}/scores`;
    await this.sendRequest(url, data);
  }

  recieveData = async () => {
    const p = document.querySelector('.recent-scores p');
    p.textContent = '';
    if (!window.localStorage.id) {
      p.textContent = 'you need to submit the first name and score before getting any data';
      p.style.color = 'red';
      return;
    }
    const url = `${this.mainURL}${window.localStorage.id}/scores`;
    const response = await fetch(url, { method: 'GET' });
    const rdata = await response.json();
    const ul = document.querySelector('.recent-scores ul');
    ul.innerHTML = '';
    const arr = rdata.result;
    for (let i = 0; i < arr.length; i += 1) {
      const li = document.createElement('li');
      li.textContent = `${arr[i].user}:${arr[i].score}`;
      ul.appendChild(li);
    }
    window.localStorage.result = JSON.stringify(rdata);
  }
}
export default ButtonMethods;
