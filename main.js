const Http = new XMLHttpRequest()
const base_url = "https://api.github.com/repos/dsc-x/CORE-TEAMS-2019-20/contents"
const citySelector = document.getElementById("city-selector")
const collegeSelector = document.getElementById("college-selector")
const memberSelector = document.getElementById("member-selector")
const certificatePanel = document.getElementById("member-cert")
var cities
var colleges
var members
var selectedCityID
var selectedCollegeID
var selectedMemberID

// get cities from root of repo
function fetchCities() {
    fetch(base_url + "/")
    .then(data => {return data.json()})
    .then(res => {
        cities = res
        // remvove existing options
        citySelector.length = 0

        // add a placeholder option
        var newOption = document.createElement("option");
        newOption.text = "--- Select City ---"
        citySelector.add(newOption)

        // add cities to drop down menu
        for (var i=0; i<cities.length; ++i) {
            if (cities[i].name == ".gitignore" || cities[i].name == "README.md") {
                continue
            }
            var newOption = document.createElement("option");
            newOption.text = cities[i].name
            newOption.id = "city" + i.toString()
            citySelector.add(newOption)
        }
    })
    .catch(error=>console.log(error))
}

async function setCity() {
    if (citySelector.selectedIndex != 0) {
        selectedCityID = await citySelector.options[citySelector.selectedIndex].id.substring(4)
        console.log(selectedCityID)
        fetchColleges()
    }
}

// get universities or colleges from the selected city
function fetchColleges() {
    // console.log(cities[selectedCityID])
    fetch(base_url + "/" + cities[selectedCityID].path)
    .then(data => {return data.json()})
    .then(res => {
        colleges = res

        // remove existing options
        collegeSelector.length = 0

        // add placeholder option
        var newOption = document.createElement("option");
        newOption.text = "--- Select College ---"
        collegeSelector.add(newOption)

        // add cities to drop down menu
        for (var i=0; i<colleges.length; ++i) {
            var newOption = document.createElement("option");
            newOption.text = colleges[i].name
            newOption.id = "college" + i.toString()
            collegeSelector.add(newOption)
        }
    })
    .catch(error => console.log(error))
}

async function setCollege() {
    if (collegeSelector.selectedIndex != 0) {
        selectedCollegeID = await collegeSelector.options[collegeSelector.selectedIndex].id.substring(7)
        console.log(selectedCollegeID)
        fetchMembers()
    }
}

// get the list of members from the selected college
function fetchMembers() {
    fetch(base_url + "/" + colleges[selectedCollegeID].path)
    .then(data => {return data.json()})
    .then(res => {
        members = res

        // remove existing options
        memberSelector.length = 0

        // add placeholder option
        var newOption = document.createElement("option");
        newOption.text = "--- Select Member ---"
        memberSelector.add(newOption)

        // add cities to drop down menu
        for (var i=0; i<members.length; ++i) {
            var newOption = document.createElement("option");
            newOption.text = members[i].name.split(".")[0]
            newOption.id = "member" + i.toString()
            memberSelector.add(newOption)
        }
    })
    .catch(error => console.log(error))
}

async function getCertificate(params) {
    if (memberSelector.selectedIndex != 0) {
        selectedMemberID = await memberSelector.options[memberSelector.selectedIndex].id.substring(6)
        console.log(selectedMemberID)

        // change the image source to certificate url
        certificatePanel.src = members[selectedMemberID].download_url
    }
}

document.onload = fetchCities()