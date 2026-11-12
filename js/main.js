const companyinput = document.getElementById('companyinput')
const addbtn = document.getElementById('addbtn')
const jobinput = document.getElementById('jobinput')
const dateinput = document.getElementById('dateinput')
const statusselect = document.getElementById('statusselect')
const message = document.getElementById('message')
const addjob = document.getElementById('addjob')
const modalcontainer = document.getElementById('modalcontainer')
const closemodal = document.getElementById('closemodal')
const displayjobs = document.getElementById('displayjobs')
const form = document.getElementById('form')
const totalcount = document.getElementById('totalcount')
const appliedcount = document.getElementById('appliedcount')
const interviewcount = document.getElementById('interviewcount')
const rejectcount = document.getElementById('rejectcount')
const offercount = document.getElementById('offercount')
const inprogresscount = document.getElementById('inprogresscount')
let applications = JSON.parse(localStorage.getItem('applications')) || []
function saveapplications() {
    localStorage.setItem('applications', JSON.stringify(applications))
}
let editingid = null
closemodal.addEventListener('click', function () {
    modalcontainer.style.display = 'none'
})

addbtn.addEventListener('click', function (event) {
    event.preventDefault()
    if (companyinput.value === '' || jobinput.value === '' || dateinput.value === '' || statusselect.value === '') {
        message.innerHTML = 'please fill all the fields'
        return;
    }
    if (editingid !== null) {
        const application = applications.find((item) => {
            return item.id === editingid
        })
        if (application) {
            application.name = companyinput.value
            application.title = jobinput.value
            application.date = dateinput.value
            application.status = statusselect.value
        }

    }
    else {

        let existingjob = applications.find((item) => {
            return companyinput.value === item.name && jobinput.value === item.title && statusselect.value === item.status
        })
        if (existingjob) {
            alert('this job application already exists')
            return;
        }

        let application = {
            id: Date.now(),
            name: companyinput.value,
            title: jobinput.value,
            date: dateinput.value,
            status: statusselect.value
        }
        applications.push(application)

    }
    saveapplications()
    displayapplications()
    totalfunc()
    modalcontainer.style.display = 'none';
    form.reset();
    editingid = null;
    message.textContent = '';
})
function displayapplications(list = applications) {
    displayjobs.innerHTML = ''
    list.forEach((item) => {
        displayjobs.innerHTML += `
        <div class='item'> 
          <div class='topofitem' > <p>Company:<strong> ${item.name}</strong></p>
        <p>Job Title:<strong> ${item.title}</strong></p>
        <p>Date of apply:<strong>${item.date}</strong></p></div>
       
   <div class='itemlastline'>   <p  class='statusbtn ${item.status}'><strong>${item.status}</strong></p>  
        <button class='editbtn' data-id='${item.id}'>edit</button>
         <button class='deletebtn' data-id='${item.id}'><i class='fas fa-trash'></i></button></div>

        </div>
        `

    })
    const deletebtns = document.querySelectorAll('.deletebtn')
    deletebtns.forEach((button) => {
        button.addEventListener('click', function () {
            const id = Number(button.dataset.id)
            applications = applications.filter((item) => {
                return item.id !== id
            })
            saveapplications()
            displayapplications()
            totalfunc()
        })
    })

}

displayjobs.addEventListener('click', function (event) {
    if (event.target.classList.contains('editbtn')) {

        const id = Number(event.target.dataset.id)

        const selectededit = applications.find((item) => {
            return item.id === id
        })
        if (!selectededit) {
            return
        }
        editingid = id

        companyinput.value = selectededit.name
        jobinput.value = selectededit.title
        dateinput.value = selectededit.date
        statusselect.value = selectededit.status

        modalcontainer.style.display = 'flex'
    }

})
addjob.addEventListener('click', function () {
    editingid = null
    form.reset()
    message.textContent = ''
    modalcontainer.style.display = 'flex'
})
function totalfunc() {

    let applied = 0
    let inprogress = 0
    let interviewed = 0
    let rejected = 0
    let offer = 0
    applications.forEach((item) => {
        if (item.status === 'applied') {
            applied++
        }

        if (item.status === 'inprogress') {
            inprogress++
        }
        if (item.status === 'interviewed') {
            interviewed++
        }
        if (item.status === 'rejected') {
            rejected++
        }
        if (item.status === 'offer') {
            offer++
        }
    })
    totalcount.innerHTML = applications.length
    appliedcount.innerHTML = applied
    inprogresscount.innerHTML = inprogress
    interviewcount.innerHTML = interviewed
    rejectcount.innerHTML = rejected
    offercount.innerHTML = offer
}
totalfunc()
displayapplications();
const appliedbtn = document.getElementById('appliedbtn')
const inprogressbtn = document.getElementById('inprogressbtn')
const interviewedbtn = document.getElementById('interviewedbtn')
const rejectedbtn = document.getElementById('rejectedbtn')
const offerbtn = document.getElementById('offerbtn')
const allbtn = document.getElementById('allbtn')

appliedbtn.addEventListener('click', function () {
    const filteredapplications = applications.filter((item) => {
        return item.status === 'applied'
    })
    displayapplications(filteredapplications)
})
inprogressbtn.addEventListener('click', function () {
    const filteredapplications = applications.filter((item) => {
        return item.status === 'inprogress'
    })
    displayapplications(filteredapplications)
})
interviewedbtn.addEventListener('click', function () {
    const filteredapplications = applications.filter((item) => {
        return item.status === 'interviewed'
    })
    displayapplications(filteredapplications)
})
rejectedbtn.addEventListener('click', function () {
    const filteredapplications = applications.filter((item) => {
        return item.status === 'rejected'
    })
    displayapplications(filteredapplications)
})
offerbtn.addEventListener('click', function () {
    const filteredapplications = applications.filter((item) => {
        return item.status === 'offer'
    })
    displayapplications(filteredapplications)
})
allbtn.addEventListener('click', function () {
    displayapplications()
})
const filteredbuttons = document.querySelectorAll('.btncontainer button')
filteredbuttons.forEach((button) => {
    button.addEventListener('click', function () {
        filteredbuttons.forEach((button) => {
            button.classList.remove('active')
        })
        button.classList.add('active')
    })
})
allbtn.classList.add('active')
const clearbtn = document.getElementById('clearbtn')
clearbtn.addEventListener('click', function () {
    applications = []
    displayapplications()
    totalfunc()
    saveapplications()
})
