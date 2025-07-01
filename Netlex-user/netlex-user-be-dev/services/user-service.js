const User = require('../controllers/user')
const fetch = require("node-fetch");
const environment = require("../env");
const UserLogin = require("../models/userLogin");


exports.createUser = async(req, res) => {
    const ssnNo = req.body.user.ssn;
    User.find({ssn: ssnNo}, (err, userData) => {

        if (userData.length === 0) {
            let {email, firstName, lastName, ssn, userName, accountType, organizationNumber} = req.body.user;
            validateSsn(ssn).then(data => {

                if (data?.errorCode === 'alreadyInProgress') {
                    return res.json('already in progress');
                }

                let user = new User({
                    firstName: firstName,
                    lastName: lastName,
                    userName: userName,
                    ssn: ssn,
                    accountType: accountType,
                    organizationNumber: organizationNumber,
                    status: "active",
                    email: email,
                });

                if (accountType === 'organization') {
                    user.role = 'admin'
                }

                user.save((err, savedUser) => {

                    if (err) {
                        return res.json(err)
                    }

                    res.status(200).json({msg: 'initiated'});
                });

            })
        } else {
            res.json('user already in');
        }

    });
}

const validateSsn = async function (ssn) {

    let data = await fetch(environment.BANK_ID_AUTH, {
        method: 'POST',
        body: JSON.stringify({
            "personalNumber": ssn,
            "endUserIp": "127.0.0.1"
        }),
        headers: {
            'content-type': 'application/json'
        },
        agent: ao
    });
    data = await data.json();
    let loginAuthData = new UserLogin();
    loginAuthData.ssn = ssn;
    loginAuthData.orderRef = data.orderRef;
    loginAuthData.autoStartToken = data.autoStartToken;
    loginAuthData.qrStartToken = data.qrStartToken;
    loginAuthData.qrStartSecret = data.qrStartSecret;
    loginAuthData.status = 'new';
    loginAuthData.createdAt;
    loginAuthData.updatedAt;
    loginAuthData.createdAt instanceof Date;
    loginAuthData.save((err, savedOrder) => {
        return data;
    });
}