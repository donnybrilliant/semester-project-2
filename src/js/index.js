import { listings } from "./render/listings.mjs";
import { profile } from "./render/profile.mjs";
import { setLoginFormListener } from "./listeners/login.mjs";
import { setRegisterFormListener } from "./listeners/register.mjs";
import { setCreateListingListener } from "./listeners/createListing.mjs";
import { setUpdateListingListener } from "./listeners/updateListing.mjs";
import { setUpdateProfileListener } from "./listeners/updateProfile.mjs";
import { renderNav } from "./render/nav.mjs";
import { addMediaButton } from "./utils/addMediaButton.mjs";
import { setSearchListener } from "./handlers/search.mjs";

// add router
setLoginFormListener();
setRegisterFormListener();
listings();
profile();
setCreateListingListener();
setUpdateListingListener();
setUpdateProfileListener();
renderNav();
addMediaButton();
setSearchListener();
