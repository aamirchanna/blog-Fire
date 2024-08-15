import {
    auth,
    storage,
    db,
    signOut,
    getDoc,
    doc,
    onAuthStateChanged,
    getDocs,
    collection,
    updateDoc,
    arrayUnion,
    arrayRemove,
} from "./utils/utils.js";

const logout_btn = document.getElementById("logout_btn");
const login_link = document.getElementById("login_link");
const user_img = document.getElementById("user_img");
const myevents_btn = document.getElementById("myevents_btn");
const create_event_btn = document.getElementById("create_event_btn");

const events_cards_container = document.getElementById("events_cards_container");

getAllBlogs();

onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        login_link.style.display = "none";
        user_img.style.display = "inline-block";
        logout_btn.style.display = "inline-block";
        myevents_btn.style.display = "inline-block";
        create_event_btn.style.display = "inline-block";
        getUserInfo(uid);

    } else {
        login_link.style.display = "inline-block";
        user_img.style.display = "none";
        logout_btn.style.display = "none";
        myevents_btn.style.display = "none";
        create_event_btn.style.display = "none";
    }

    logout_btn.addEventListener("click", () => {
        signOut(auth);
    });


})
function getUserInfo(uid) {
    const userRef = doc(db, "users", uid);
    getDoc(userRef).then((data) => {
      console.log("data==>", data.id);
      console.log("data==>", data.data());
      user_img.src = data.data()?.img;
    });
  }
  
async function getAllBlogs() {
    try {
        const querySnapshot = await getDocs(collection(db, "blogs"));
        events_cards_container.innerHTML = "";
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
            const event = doc.data();

            console.log("event=>", event);
      
            const { banner, title, createdByEmail, desc,  date } =
              event;

              const card = `<div class="bg-white shadow-md rounded-lg overflow-hidden">
              <img
                src="${banner}"
                alt="Event Image"
                class="w-full h-48 object-cover"
              />
              <div class="p-4">
                <h2 class="text-xl font-bold mb-2">${title}</h2>
                <h2 class="text-sm  mb-2">${ desc,desc.substring(1 , 250)}...</h2>
                <p class="text-gray-600 mb-2">Time: ${date}}</p>
                <p class="text-gray-600 mb-2">Creator: ${createdByEmail}</p>
                <div class="flex justify-between items-center">
                  <button
                    id = ${doc.id}
                    onclick ="likeEvent(this)"
                    class="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                  >
                    ${
                      auth?.currentUser && event?.likes?.includes(auth?.currentUser.uid)
                        ? "Liked.."
                        : "Like"
                    } ${event?.likes?.length ? event?.likes?.length : ""}
                  </button>
                </div>
              </div>
            </div> `;
        
      window.likeEvent = likeEvent;
      events_cards_container.innerHTML += card;
      console.log(event);
        
        })
    } catch (err) {
        console.log(err)
    }
} 

async function likeEvent(e) {
    if (auth.currentUser) {
      e.disabled = true;
      const docRef = doc(db, "blogs", e.id);
      if (e.innerText == "Liked..") {
        updateDoc(docRef, {
          likes: arrayRemove(auth.currentUser.uid),
        })
          .then(() => {
            e.innerText = "Like";
            e.disabled = false;
          })
          .catch((err) => console.log(err));
      } else {
        updateDoc(docRef, {
          likes: arrayUnion(auth.currentUser.uid),
        })
          .then(() => {
            e.innerText = "Liked";
            e.disabled = false;
          })
          .catch((err) => console.log(err));
      }
    } else {
      window.location.href = "./auth/login/login.html";
    }
  }