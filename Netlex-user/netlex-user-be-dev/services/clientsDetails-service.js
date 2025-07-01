 
const clientsDetails = require('../models/clientsDetails');
const auth = require('../controllers/auth');
const fetch = require("../helper/fetch");
 const environment = require("../env"); 

exports.getclientsDetailstoSsnto = async(req, res) => {
 // const lawyerList = await Lawyer.find({status: 'Aktiv'});
  const clients_Details= await clientsDetails.find({toSsn: req.params.toSsn})
  console.log('clients_Details'+clients_Details);
  console.log('req.params.toSsn'+req.params.toSsn);
  if (clients_Details) {
    return clients_Details;
} else {
    return [];
}
    
}



