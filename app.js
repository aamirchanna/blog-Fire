import {
    auth,
    storage,
    db,
    query,
    signOut,
    getDoc,
    doc,
    where,
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
      
      for (const doc of querySnapshot.docs) {
          const event = doc.data();
          const { banner, title, createdByEmail, desc, date } = event;

          const card = `
          <div class="p-4 card card-compact bg-base-100 shadow-md w-86">
              <img src="${banner}" alt="blog" class="w-full rounded-xl h-[280px] object-cover" />
              <div class="card-body gap-5">
                  <p class="text-xs text-opacity-60">${date}</p>
                  <section>
                      <h2 class="card-title">${title}</h2>
                      <p>${desc.substring(0, 250)}...</p>
                  </section>
                  <section>
                      <div class="flex flex-col gap-4">
                          <h4 class="font-medium">Author: ${createdByEmail}</h4>
                          <div class="flex gap-3 items-center justify-start">
                              <a href="./profile/index.html">
                                  <img class="w-12 rounded-full" src="${user_img}" alt="user avatar">
                              </a>
                          </div>
                      </div>
                  </section>
                  <div class="card-actions justify-end">
                      <button class="btn btn-primary" id="${doc.id}" onclick="likeEvent(this)">
                          ${
                            auth?.currentUser &&
                            event?.likes?.includes(auth?.currentUser.uid)
                              ? "Liked.."
                              : "Like"
                          } ${event?.likes?.length ? event?.likes?.length : ""}
                      </button>
                  </div>
              </div>
          </div>
          `;

          events_cards_container.innerHTML += card;
      }
  } catch (error) {
      console.error("Error getting documents: ", error);
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


  // <img
  //             class="w-10 h-10 rounded-full"
  //             src="${banner}"
  //             alt=""
  //             id="user_img"
  //           />
  //         </a>