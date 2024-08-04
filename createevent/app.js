import {
  ref,
  storage,
  uploadBytes,
  getDownloadURL,
  db,
  collection,
  addDoc,
  auth,
  doc,
} from "../utils/utils.js";

console.log(auth)

const event_form = document.getElementById("event_form");
const submit_btn = document.getElementById("submit_btn");

event_form.addEventListener("submit", function (e) {
  e.preventDefault()
  console.log(e);

  const currentUser = auth.currentUser;

  if (!currentUser) {
    console.error("No user is currently signed in");
    return;
  }

  const blogInfo = {
    banner: e.target[0].files[0],
    title: e.target[1].value,
    desc: e.target[2].value,
    date: e.target[4].value,
    createdBy: currentUser.uid,  // Corrected property access
    createdByEmail: auth.currentUser.email,
    likes: [],
  };

  submit_btn.disabled = true
  submit_btn.innerHTML = "Loading..."

  const imgRef = ref(storage, blogInfo.banner.name)
  uploadBytes(imgRef, blogInfo.banner).then(() => {

    getDownloadURL(imgRef).then((url) => {
      console.log("url agyawww", url)
      blogInfo.banner = url

      // add document to events collection
     const blogCollection = collection(db , "blogs")
     addDoc(blogCollection , blogInfo).then(()=>{

       submit_btn.disabled = false
  submit_btn.innerHTML = "Create "

      console.log("Document ADDED");
     window.location.href = "/"
     }).catch((err)=>{
      console.log("collection mistake")
     })

    }).catch((err) => {
      console.log("url nh deeraha")
    })
  }).catch("uplaodesbyteee erro")
})

