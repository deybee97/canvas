const express = require("express")
const router = express.Router()
const  {createElement, deleteElement, modifyElement,changePosition, getElements} = require("../controllers/element")


router.route('/').post(createElement).delete(deleteElement).get(getElements)
router.route('/settings').put(modifyElement)
router.route('/position').put(changePosition)


module.exports = router
