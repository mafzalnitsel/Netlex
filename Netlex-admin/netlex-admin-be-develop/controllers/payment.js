// const Schedule = require('../models/schedule');
const Payment = require("../models/payment");
const html_to_pdf = require("html-pdf-node");
const salesServices = require("../services/sales-pdf-service");

exports.getActivePaymentsList = function (req, res) {
  Payment.find().exec(function (err, payment) {
    if (err) {
      return res.status(500).json({ err });
    } else {
      return res.status(200).json({ payment });
    }
  });
};
exports.show = function (req, res) {
  // console.log("req.params.id:"+ req.params.id);

  Payment.findById(req.params.id).exec(function (err, doc) {
    if (err || doc === null) {
      res.status(404).json({ error: "UserNotFound" });
    } else {
      res.json(doc);
    }
  });
};
exports.getPaymentList = function (req, res) {
  console.log("req.query",req.query)
  try {
    const query = {};
    const page = +(req.query.page || 1);
    const limit = +(req.query.limit || 10);
    const paymentMethod = req.query.paymentMethod;
    const status = req.query.status;
    const startDate = req.query.fromDate;
    const endDate = req.query.toDate;
    const agreementType = req.query.paymentAgreementType;
    const options = {
      page: page,
      limit: limit,
    };

    //Filter by AgreementType (personal or business)
    query.agreementType = { $eq: agreementType };

    //Filter by paymentMethod
    if (paymentMethod === "klarna") {
      query.paymentMethod = { $eq: paymentMethod };
    } else if (paymentMethod === "stripe") {
      query.paymentMethod = { $eq: paymentMethod };
    } else if (paymentMethod === "swish") {
      query.paymentMethod = { $eq: "Swish" };
    }

    //Filter by status
    if (status === "success") {
      query.status = { $eq: status };
    } else if (status === "failed") {
      query.status = { $eq: status };
    }
    
    //Filter by date
    if (startDate !== "" && endDate !== "") {
      // console.log("date filter")
      // query.paymentDate = { $gte: '2022-04-21', $lt: '2022-06-07' };
      query.paymentDate = { $gte: startDate, $lt: endDate };
    }
    Payment.paginate(query, options).then(function (result) {
      // console.log("result",result)
      // res.json(result);
            let Array = [];
      // console.log("result.docs", result.docs);

      if (result.docs.length > 0) {
        result.docs.forEach((element, index) => {
          // console.log("element", element);
          //Because PaymentDate field is now string so converting before split
          let PaymentDate = element.paymentDate.toISOString().split("T")[0];
          let PaymentTime = element.paymentDate.toISOString().split("T")[1];
          let hours = Number(PaymentTime.match(/^(\d+)/)[1]);
          let minutes = Number(PaymentTime.match(/:(\d+)/)[1]);
          let AM_PM = hours >= 12 ? "PM" : "AM";
          //  let fofo = PaymentDate.split('-').join('/');
          // console.log("fofo", fofo);

          PaymentTime = hours + ":" + minutes + " " + AM_PM;
          // console.log("PaymentTime", PaymentTime);
              Array.push({
                _id: element._id,
                transaction_Id: element.transaction_Id,
                gatewayResponse: element.gatewayResponse,
                userId: element.userId,
                userName: element.userName,
                amount: element.amount,
                paymentDate: element.paymentDate,
                time: PaymentTime,
                date: PaymentDate,
                paymentMethod: element.paymentMethod,
                status: element.status,
                __v: element.__v,
              });
              // if(Array && Array!== undefined){
              //   console.log("Array",Array)
              //   Array[index].key3 = "hello";
              // }
              if (index === result.docs.length - 1) {
                // console.log("newUserList1", newUserList);
                const newResult = {
                  docs: Array,
                  total: result.total,
                  limit: result.limit,
                  page: result.page,
                  pages: result.pages,
                };
                // console.log("newResult", newResult);
                res.json(newResult);
              }
        });
      } else {
        res.json(result);
      }
    });
  } catch (error) {
    res.status(404).json({ error: "Error in get payment list" + error });
  }
};

exports.generatePaymentPdf = async function (req, res) {
  // console.log("req.body.sales",req.body.sales);
  const data = req.body.payment;
  // console.log("req.params.id",req.params.id);
  // finalDoc = "<p>hello world!</p>"

  // finalDoc = data.userName + " , " + data.salesAmount + " , " + data.time;
  finalDoc = await salesServices.paymentPdfDoc(req, res);

  // finalDoc = "<p><b> User Name :</b> " + data.userName + " </p>" + "<p><b> Price :</b> " + data.salesAmount + " </p>"

  let options = { format: "A4" };
  let file = { content: finalDoc };
  const pdfBuffer = await html_to_pdf.generatePdf(file, options);
  // console.log("file", file);
  // console.log("pdfBuffer",pdfBuffer)
  // const datu = await salesServices.salePdfDoc(req,res);
  // console.log("datu", datu);

  if (!pdfBuffer) {
    return res
      .status(404)
      .json({ err: "Err", msg: "Error while generating Agreement" });
  }

  // fs.writeFileSync('some.pdf', pdfBuffer);
  return res.status(200).json(pdfBuffer);
};
