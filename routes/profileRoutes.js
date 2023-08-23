const express = require("express")
const router = express.Router()
const  {createProfile, deleteProfile, modifyProfile, getProfile} = require("../controllers/profile")

router.route('/').post(createProfile).delete(deleteProfile).get(getProfile)
router.route('/settings').put(modifyProfile)

module.exports = router