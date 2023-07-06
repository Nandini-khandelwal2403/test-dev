window.onload = function () {
    // bring all activities of the user

    if (localStorage.getItem('selfName')) {
        displayProfile();
    }

    axios({
        method: 'get',
        url: location.protocol + '//' + location.host + '/api/user/activities/' + localStorage.getItem('selfNumber')
    }).then((res) => {
        console.log(res);
        const activities = res.data;
        console.log(activities);
        activities.forEach((activity) => {
            if(activity.isVerified) {
                const template = document.querySelector('template[data-template="act-verified"]');
                let clone = template.content.cloneNode(true);
                clone.querySelector('.act-name').innerHTML = activity.activity;
                clone.querySelector('.act-hours').innerHTML = activity.hours;
                clone.querySelector('.act-did').innerHTML = activity.work;
                clone.querySelector('.act-helped').innerHTML = activity.peoplehelped;
                clone.querySelector('.act-date').innerHTML = activity.date;
                document.querySelector('.containVerifiedActivity').appendChild(clone);
            }else{
                const template = document.querySelector('template[data-template="act-unverified"]');
                let clone = template.content.cloneNode(true);
                clone.querySelector('.act-name').innerHTML = activity.activity;
                clone.querySelector('.act-hours').innerHTML = activity.hours;
                clone.querySelector('.act-did').innerHTML = activity.work;
                clone.querySelector('.act-helped').innerHTML = activity.peoplehelped;
                clone.querySelector('.act-date').innerHTML = activity.date;
                document.querySelector('.containUnverifiedActivity').appendChild(clone);
            }
        })
    })
}

function activityInfo() {
    const activity = document.getElementById('activityname').value;
    const hours = document.getElementById('hoursspent').value;
    const work = document.getElementById('workdid').value;
    const peoplehelped = document.getElementById('peoplehelped').value;
    const date = document.getElementById('activitydate').value;
    const obj = { 'activity': activity, 'hours': hours, 'work': work, 'peoplehelped': peoplehelped, 'date': date, 'username': localStorage.getItem('selfName'), 'isVerified': 'false', 'usernumber': localStorage.getItem('selfNumber'), 'identity': localStorage.getItem('identity')};
    console.log(obj);
    axios({
        method: 'post',
        url: location.protocol + '//' + location.host + '/api/user/activity',
        data: obj
    }).then((res) => {
        console.log(res);
    })
}

function displayProfile() {
    console.log("displaying")
    document.querySelector(".username").innerHTML = localStorage.getItem("selfName");
    document.querySelector(".usernumber").innerHTML = localStorage.getItem("selfNumber");
    document.querySelector(".useremail").innerHTML = localStorage.getItem("selfEmail");
    document.querySelector(".useraddress").innerHTML = localStorage.getItem("selfAddress");
    document.querySelector(".userage").innerHTML = localStorage.getItem("selfAge");
    if(localStorage.getItem("identity") == "coordinator"){
        document.querySelector(".useridentity").innerHTML = "Coordinator";
    }else if(localStorage.getItem("identity") == "volunteer"){
        document.querySelector(".useridentity").innerHTML = "Volunteer";
    }else{
        document.querySelector(".useridentity").innerHTML = "Admin";
    }
    console.log("displayed")
}