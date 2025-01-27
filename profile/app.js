import {
    auth,
    db,
    signOut,
    getDoc,
    doc,
    onAuthStateChanged,
    getDocs,
    collection,
    query,
    where,
    deleteDoc,
} from "../utils/utils.js";

// const logout_btn = document.getElementById("logout_btn");
// const login_link = document.getElementById("login_link");
const user_img = document.getElementById("user_img");
const events_cards_container = document.getElementById("events_cards_container");



onAuthStateChanged(auth, (user) => {
    if (user) {
                                                       // User is signed in, see docs for a list of available properties
                                                      // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        // login_link.style.display = "none";
        // user_img.style.display = "inline-block";
        getUserInfo(uid);
        getMyEvents(uid);

    } else {
        login_link.style.display = "inline-block";
        user_img.style.display = "none";
    }
});

// logout_btn.addEventListener("click", () => {
//     signOut(auth);
// });
getMyEvents()

function getUserInfo(uid) {
    const userRef = doc(db, "blogs", uid);
    getDoc(userRef).then((data) => {
        console.log("data==>", data.id);
        console.log("data==>", data.data());
        user_img.src = data.data()?.img;
    });
}

async function getMyEvents(uid) {
    if (!uid) { // Check if UID is undefined
        console.error("User ID is undefined");
        return;
    }
    
    
    try {
      const q = query(collection(db, "blogs"), where("createdBy", "==", uid));
      
      const querySnapshot = await getDocs(q);
      events_cards_container.innerHTML = "";
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
  
        const event = doc.data();
        console.log("event=>", event);

        const { banner, title,  createdByEmail, desc,  date } =
          event;
  
        const card = `<div class="bg-white shadow-md rounded-lg overflow-hidden">
          <img
            src="${banner}"
            alt="Event Image"
            class="w-full h-48 object-cover"
          />
          <div class="p-4">
            <h2 class="text-xl font-bold mb-2">${title}</h2>
            <h2 class="text-md mb-2">${desc,desc.substring(0 , 250)}</h2>
            <p class="text-gray-600 mb-2"> ${date}</p>
            <p class="text-gray-600 mb-2">Creator: ${createdByEmail}</p>
            <div class="flex justify-between items-center">
              <button
                class="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
              >
                ${
                  auth?.currentUser &&
                  event?.likes?.includes(auth?.currentUser.uid)
                    ? "Liked.."
                    : "Like"
                } ${event?.likes?.length ? event?.likes?.length : ""}
              </button>

            </div>
          </div>
        </div>`;
        // window.deleteEvent = deleteEvent;
        events_cards_container.innerHTML += card;
        console.log(event);
      });
    } catch (err) {
      alert(err);
    }
  }
  