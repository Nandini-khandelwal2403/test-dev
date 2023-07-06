let userProfileData = {};

function login1() {
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    const obj = { 'email': email, 'password': password };
    console.log(obj);
    axios({
        method: 'post', 
        url: location.protocol + '//' + location.host + '/api/user/login',
        data: obj
    }).then((res) => {
        console.log(res);
        userProfileData = res.data.userData;
        localStorage.setItem('selfName', res.data.userData.name);
        localStorage.setItem('selfNumber', res.data.userData.number);
        localStorage.setItem('selfEmail', res.data.userData.email);
        localStorage.setItem('selfAddress', res.data.userData.address);
        localStorage.setItem('selfAge', res.data.userData.age);
        localStorage.setItem('identity', res.data.userData.identity);
    })
}

function register1() {
    const name = document.querySelector("#name").value;
    const mobile = document.querySelector("#phoneNumber").value;
    const dob = document.querySelector("#birthdayDate").value;
    const email = document.querySelector("#email").value;
    const description = document.querySelector("#description").value;
    const address = document.querySelector("#address").value;
    const password = document.querySelector("#password").value;
    const identity = document.querySelector("#identity").value;
    const age = document.querySelector("#age").value;
    let type;

    var ele = document.getElementsByName('gender');

    for (i = 0; i < ele.length; i++) {
        if (ele[i].checked)
            type = ele[i].value;
    }

    const obj = { 'name': name, 'number': mobile, 'dob': dob, 'description': description, 'address': address, 'email': email, 'password': password, 'identity': identity, 'gender': type, 'age': age};
    console.log(obj);
    axios({
        method: 'post',
        url: location.protocol + '//' + location.host + '/api/user/register',
        data: obj
    }).then((res) => {
        console.log(res);
    })
}

function login() {
    const mobile = document.querySelector(".mobile").value;
    const password = document.querySelector(".password").value;

    const obj = { 'number': mobile, 'password': password };

    axios({
        method: 'post',
        url: location.protocol + '//' + location.host + '/api/user/login',
        data: obj
    }).then((res) => {
        console.log(res.data.userData);
        localStorage.setItem('selfName', res.data.userData.name);
        localStorage.setItem('selfNumber', res.data.userData.number);
        // if (!localStorage.selfPublicKey && !localStorage.selfPrivateKey) {
        //     const keypair = nacl.box.keyPair()
        //     const selfPublicKey = util.encodeBase64(keypair.publicKey)    //here Uint8Array gets encoded into string to handle properly in js
        //     const selfPrivateKey = util.encodeBase64(keypair.secretKey)
        //     localStorage.setItem('selfPublicKey', selfPublicKey);
        //     console.log(localStorage.selfPublicKey);
        //     localStorage.setItem('selfPrivateKey', selfPrivateKey);
        //     axios({
        //         method: 'post',
        //         url: location.protocol + '//' + location.host + '/api/user/updatekey',
        //         data: { 'publicKey': localStorage.selfPublicKey }
        //     }).then((res) => {
        //         console.log(res);
        //     })
        // }
        // window.location = '../chat'

    })
}

function log() {
    const name = document.querySelector(".name").value;
    const mobile = document.querySelector(".mobile").value;
    const password = document.querySelector(".password").value;

    const obj = { 'name': name, 'number': mobile, 'password': password };

    axios({
        method: 'post',
        url: location.protocol + '//' + location.host + '/api/user/register',
        data: obj
    }).then((res) => {
        console.log(res);
    })
}
