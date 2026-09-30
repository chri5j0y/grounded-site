GROUNDED PROFILES (Garden part 2, session 2)
Upload every file in this ZIP to the main site repo (growwithgrounded.com), keeping the folders,
replacing what is there. Two files are new; the rest replace existing files.

NEW
  shared/gg-profiles.js   One private profile per person, shared by every page. Encrypted on the device.
  terms.html              Terms of Use, plain language. Pending attorney review.

CHANGED
  nav.js                  Loads the profile button on every page that uses the Tools menu.
  style.css               Main menu folds into the menu button below 980px wide, so the new button fits.
  shared/gg-care.js       Adds rename and forget, so check-offs follow a person into their profile.
  privacy.html            New "Grounded profiles" section, updated Kids and teens, links to Terms.
  soul-tree/index.html    Saves checkups in Grounded profiles. Old Soul Tree profiles move in when opened.
  garden/index.html       Saves the garden in the open profile. An existing garden moves into the first
                          profile opened on that device. Planting asks for a profile.
  sprout/index.html       Each child's tree lives in a Kids profile (picture code). Trees saved before
                          profiles stay until a grown-up taps "Save [name]'s tree".
  sapling/index.html      Each student's tree lives in a Middle school profile. Students saved before
                          profiles stay until moved in. "Just try it without saving" is available.
  Every other page        Footer gains a Terms link. The main pages also load the updated style.css.

IF YOU EVER CHANGE THE TERMS OR PRIVACY POLICY
  Update the date on the page, then change TERMS_V or PRIVACY_V near the top of shared/gg-profiles.js.
  Everyone with a profile is asked to agree again before saving.
