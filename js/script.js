const toggleIconBtn = document.querySelector(".toggle_icon")
const mainNavList = document.querySelector(".main-nav-list")
const sectionHome = document.querySelector(".section-home")
const sectionHow = document.querySelector(".section-how")
const btnScrollTo = document.querySelector(".btnScrollTo")
const mainNav = document.querySelector(".main-nav")
const mainNavHeight = mainNav.getBoundingClientRect().height
const allSectionDom = document.querySelectorAll("section")
const imgs = document.querySelectorAll("img")
toggleIconBtn.addEventListener("click", (e) => {
    const icon = toggleIconBtn.querySelector("use")
    if (icon.getAttribute("xlink:href") === 'img/icons.svg#icon-cross') {
        icon.setAttribute("xlink:href", "img/icons.svg#icon-menu")
        
    }
    else {
        icon.setAttribute("xlink:href", "img/icons.svg#icon-cross")
        
    }
    
    mainNavList.classList.toggle("toggleNav")
})

let callbackHeader = (entries) => {
  const [entry] = entries
    const { isIntersecting } = entry
    if (!isIntersecting) {
        mainNav.classList.add("sticky")
    }
    else {
        mainNav.classList.remove("sticky")

    }
}
const headerObserver = new IntersectionObserver(callbackHeader, {
  root: null,
  threshold: 0,
  rootMargin: `-${mainNavHeight }px`
})
headerObserver.observe(sectionHome)

btnScrollTo.addEventListener("click", function (e) {
    // old school
    // const sectionHowCoords = sectionHow.getBoundingClientRect()
    // window.scrollTo({
    //     left: sectionHowCoords.left + window.pageXOffset,
    //     top :sectionHowCoords.top + window.pageYOffset,
    //     behavior:'smooth'
    // } )
    sectionHow.scrollIntoView({behavior:'smooth'})

})
mainNavList.addEventListener("click", (e) => {
    e.preventDefault()
    const item = e.target
    const itemId = item.getAttribute("href")
    if (!itemId) return 
    const section = document.querySelector(itemId)
  if (!section) return;
  section.scrollIntoView({ behavior: "smooth" });
    // const { top, left } = section.getBoundingClientRect()
    // const heightOffest = top + window.pageYOffset - mainNavHeight - 1
    // const sectionLeft = left + window.pageYOffset
    // window.scrollTo({
    //     left: heightOffest,
    //     top :sectionLeft,
    //     behavior:'smooth'

    // })
});
const callbackHeaderSections = (entries, observe) => {
    const [entry] = entries
    if (!entry.isIntersecting) return
    entry.target.classList.remove("section--hidden")
    observe.unobserve(entry.target)
    
}
const opSection = {
    root: null,
    threshold : 0.2,
}
const allSection = new IntersectionObserver(callbackHeaderSections, opSection)
allSectionDom.forEach((section) => {
    allSection.observe(section)
    section.classList.add("section--hidden")
})

const callbackImgLoad = (entries, observe) => {
    const [entry] = entries
    if (!entry.isIntersecting) return
    if(!entry.target.classList.contains("lazy-img")) return 
    
    entry.target.classList.remove("lazy-img")
    
       observe.unobserve(entry.target)
 
}
const opImgs = {
    root: null,
    threshold: 0,
    rootMargin: '500px'
}
const allImgs = new IntersectionObserver(callbackImgLoad, opImgs)
imgs.forEach((img) => {
    allImgs.observe(img)
})
console.log(imgs)