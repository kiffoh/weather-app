async function newPlace(content="london") {
    const subject = content.toLowerCase();
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=f0d919f2079c4eabb02123135232212&q=${subject}`, {mode: 'cors'})
    const Data = await response.json();
    console.log(Data);
}
newPlace();
  
  const search = document.querySelector(".search");
  search.addEventListener("click", () => {
    const content = document.querySelector(".content").value;
    console.log(content);
    newPlace(content);
  })