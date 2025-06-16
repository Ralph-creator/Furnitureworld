
// mobile screen

const toggleBtn=document.querySelector(".sidebar-toggle");
const closeBtn=document.querySelector(".close-btn");
const sidebar=document.querySelector(".sidebar");
const body = document.body;
toggleBtn.addEventListener("click",function(){
// sidebar.classList.contains("sidebar");
// console.log(show)
// method one
// if (sidebar.classList.contains("show-sidebar")){
//   sidebar.classList.remove("show-sidebar");
// }else{
//   sidebar.classList.add("show-sidebar");
// }
// method two
sidebar.classList.toggle("show-sidebar")
if (sidebar.classList.contains('show-sidebar')) {
body.style.overflow = 'hidden'; // Disable scrolling
} else {
body.style.overflow = 'auto'; // Enable scrolling
}
})

closeBtn.addEventListener("click",function(){
sidebar.classList.toggle("show-sidebar")
if (sidebar.classList.contains('close-btn')) {
body.style.overflow = 'hidden'; // Disable scrolling
} else {
body.style.overflow = 'auto'; // Enable scrolling
}
})