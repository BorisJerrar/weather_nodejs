const weatherInnput = document.querySelector("input");
const weatherForm = document.querySelector("form");
const firstMessage = document.getElementById("message_1");
const secondMessage = document.getElementById("message_2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const search = weatherInnput.value;
  firstMessage.textContent = 'Loading...';
  secondMessage.textContent = '';
  fetch(`/weather?address=${search}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        firstMessage.textContent = data.error;;
      } else {
        firstMessage.textContent = data.location;
        secondMessage.textContent = data.forcast;
      }
    });
  });
});
