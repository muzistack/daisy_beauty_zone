// Daisy Beauty Zone — frontend interactions
// Add the salon's verified email before launch. No contact details are invented.
const SALON_EMAIL = ""; // e.g. bookings@yourverifieddomain.com

const menuBtn=document.querySelector(".menu-btn"),nav=document.getElementById("nav");
menuBtn.addEventListener("click",()=>{const open=nav.classList.toggle("open");menuBtn.setAttribute("aria-expanded",String(open));menuBtn.textContent=open?"×":"☰";});
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");menuBtn.setAttribute("aria-expanded","false");menuBtn.textContent="☰";}));
document.querySelectorAll("[data-service]").forEach(link=>link.addEventListener("click",()=>{document.getElementById("serviceSelect").value=link.dataset.service;}));
document.getElementById("year").textContent=new Date().getFullYear();
const dateInput=document.getElementById("dateInput");
const today=new Date();dateInput.min=`${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,"0")}-${String(today.getDate()).padStart(2,"0")}`;
document.getElementById("bookingForm").addEventListener("submit",e=>{
 e.preventDefault();const data=Object.fromEntries(new FormData(e.currentTarget).entries());
 const subject=encodeURIComponent(`Appointment enquiry — Daisy Beauty Zone — ${data.service}`);
 const body=encodeURIComponent(`Name: ${data.name}\nPhone: ${data.phone}\nService: ${data.service}\nPreferred date: ${data.date||"Flexible"}\nDetails: ${data.details||"None supplied"}`);
 const status=document.getElementById("formStatus");
 if(SALON_EMAIL){status.textContent="Opening your email app with the appointment enquiry prepared…";window.location.href=`mailto:${SALON_EMAIL}?subject=${subject}&body=${body}`;}
 else {status.textContent="Frontend demo only: no appointment has been sent. Add the salon's verified email in script.js to enable email enquiries.";let preview=document.getElementById("enquiryPreview");if(preview)preview.remove();preview=document.createElement("pre");preview.id="enquiryPreview";preview.textContent=`TO: [verified salon email needed]\nSUBJECT: ${decodeURIComponent(subject)}\n\n${decodeURIComponent(body)}`;preview.style.cssText="white-space:pre-wrap;overflow-wrap:anywhere;background:#fff4f8;border:1px solid #d86c9166;padding:12px;color:#4a2b3e;font-size:10px;margin-top:12px";e.currentTarget.appendChild(preview);}
});
