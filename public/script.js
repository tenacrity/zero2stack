const btn = document.getElementById("btn");
 const msg = document.getElementById("msg");
 btn.addEventListener("click", () => {
 msg.innerText = "JS is fun. I am loving it!";
  msg.classList.toggle("highlight");
 });
 
