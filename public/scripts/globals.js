const addFloorButton = document.getElementById("add-floor-button");
const floorList = document.getElementById("floor-list");
const addElementButton = document.getElementsByClassName("add-element-button");
const assetOptions = document.getElementById('asset-options')
const assetOptionsCancelButton = assetOptions.querySelector("#cancel-button-div > svg ")
const assetSize = document.getElementById("asset-size")
const assetDesc = document.getElementById("asset-desc")
const assetColor = document.getElementById("asset-color")
const shapePickerButton = document.getElementById("shape-button")
const shapeContainer = document.getElementsByClassName("shape-container")
const assetButton = document.getElementById("image-upload-button")
const imageInput = document.getElementById("image-input")
const imagePreview = document.getElementById("image-preview")
const saveOptionButton = document.getElementById("save-button")
const scaleCheckbox = document.getElementById("scale-checkbox")
const colorCheckbox = document.getElementById("color-checkbox")
const canvasContainer = document.getElementById('canvas-container');
const iframe = document.getElementById('canvas');
const zoomRange = document.getElementById('zoom-range');
const parentDiv = document.querySelector('.top-pane-tools');
// Select all the SVG elements within the parent div
const svgElements = parentDiv.querySelectorAll('svg');



//global variable 
const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

//we are selecting only one because we are working with only 1 floor
let floorItemButton = null


//global variable
let profile = null
window.addedElements = localStorage.getItem('addedElements') ?  [...JSON.parse(localStorage.getItem('addedElements'))]: []
let selectedFloorId = 1
let selectedElementId = null
let selectedElement
let selectedElementType = null


//error?
// let visible = false

//local storage 

let cachedProfile = localStorage.getItem('profile')? JSON.parse(localStorage.getItem('profile')) : null